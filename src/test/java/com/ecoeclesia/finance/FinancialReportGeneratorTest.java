package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;

import com.ecoeclesia.community.Community;
import com.ecoeclesia.community.CommunityRepository;
import com.ecoeclesia.leadership.ParishLeader;
import com.ecoeclesia.leadership.ParishLeadershipRepository;
import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public final class FinancialReportGeneratorTest {

    private final ChartOfAccounts chart = ChartOfAccounts.defaultPlan();
    private final InMemoryLedgerRepository repository = new InMemoryLedgerRepository();
    private final LedgerService service = new LedgerService(repository, chart, java.time.Clock.systemUTC());
    private final FinancialReportGenerator generator = new FinancialReportGenerator(repository, chart);

    @Test("consolidates totals and references per account")
    public void consolidatesLines() {
        service.recordIncome("1.1.01", new BigDecimal("300.00"), "Dízimo janeiro", "DIZ-01", "Geral", LocalDate.of(2024, 1, 5));
        service.recordIncome("1.1.03", new BigDecimal("150.00"), "Rifa do retiro", "EVT-11", "Retiros", LocalDate.of(2024, 1, 6));
        service.recordExpense("2.1.02", new BigDecimal("80.00"), "Conta de água", "AGUA-01", "Sede", LocalDate.of(2024, 1, 8));
        service.recordExpense("2.1.02", new BigDecimal("90.00"), "Conta de luz", "LUZ-01", "Sede", LocalDate.of(2024, 1, 20));

        FinancialReport report = generator.generate(LocalDate.of(2024, 1, 1), LocalDate.of(2024, 1, 31), new BigDecimal("1000.00"));

        assertEquals(new BigDecimal("450.00"), report.totalIncome());
        assertEquals(new BigDecimal("170.00"), report.totalExpenses());
        assertEquals(new BigDecimal("1280.00"), report.closingBalance());
        assertEquals(1, report.expenseLines().size());
        assertEquals(2, report.incomeLines().size());
    }

    @Test("formats a printable statement")
    public void formatsPrintableStatement() {
        service.recordIncome("1.1.04", new BigDecimal("500.00"), "Feira paroquial", "BAZAR-01", "Pastoral Social", LocalDate.of(2024, 2, 2));
        FinancialReport report = generator.generate(LocalDate.of(2024, 2, 1), LocalDate.of(2024, 2, 29), BigDecimal.ZERO);
        FinancialReportFormatter formatter = new FinancialReportFormatter();
        String output = formatter.render(report);

        assertEquals(true, output.contains("Receitas"));
        assertEquals(true, output.contains("Assinaturas"));
        assertEquals(true, output.contains("1.1.04"));
    }

    @Test("generates pdf and has 3 independent signatures without duplicates")
    public void generatesPdfAndSignatures() {
        service.recordIncome("1.1.01", new BigDecimal("50.00"), "Dízimo", "REC-01", "Geral", LocalDate.of(2024, 3, 1));
        FinancialReport report = generator.generate(LocalDate.of(2024, 3, 1), LocalDate.of(2024, 3, 31), BigDecimal.ZERO, "Maria Helena (Tesoureira)");

        assertEquals(3, report.signatures().size());
        assertEquals("Pároco", report.signatures().get(0).role());
        assertEquals("Tesoureiro(a) Paroquial", report.signatures().get(1).role());
        assertEquals("Maria Helena (Tesoureira)", report.signatures().get(1).name());
        assertEquals("Vigário Paroquial", report.signatures().get(2).role());

        FinancialReportPdfExporter pdfExporter = new FinancialReportPdfExporter(chart);
        byte[] pdf = pdfExporter.render(report);
        assertEquals(true, pdf.length > 500);

        String pdfString = new String(pdf, java.nio.charset.StandardCharsets.ISO_8859_1);
        assertEquals(true, pdfString.startsWith("%PDF-1.4"));
        assertEquals(true, pdfString.contains("/WinAnsiEncoding"));
        assertEquals(true, pdfString.contains("xref"));
        assertEquals(true, pdfString.contains("%%EOF"));

        FinancialReportFormatter formatter = new FinancialReportFormatter(chart);
        String text = formatter.render(report);
        assertEquals(true, text.contains("1.1.01 - Dízimos Paroquiais"));
        assertEquals(true, text.contains("1.1.01 Dízimos Paroquiais"));
        assertEquals(true, text.contains("Matriz"));
    }

    @Test("uses treasurer name from parish leadership when present")
    public void usesTreasurerFromParishLeadership() {
        ParishLeadershipRepository leadershipRepo = new ParishLeadershipRepository() {
            @Override
            public List<ParishLeader> findAll() { return findAllActive(); }
            @Override
            public List<ParishLeader> findAllActive() {
                return List.of(
                        new ParishLeader("1", "Pe. João", "Pároco", true, 1),
                        new ParishLeader("2", "Carlos Alberto", "Tesoureiro", true, 2),
                        new ParishLeader("3", "Pe. Antônio", "Vigário Paroquial", true, 3)
                );
            }
            @Override public Optional<ParishLeader> findById(String id) { return Optional.empty(); }
            @Override public ParishLeader save(ParishLeader leader) { return leader; }
            @Override public void deleteById(String id) {}
        };

        FinancialReportGenerator gen = new FinancialReportGenerator(repository, chart, leadershipRepo, null);
        FinancialReport report = gen.generate(LocalDate.of(2024, 4, 1), LocalDate.of(2024, 4, 30), BigDecimal.ZERO);

        assertEquals("Carlos Alberto", report.signatures().get(1).name());
        FinancialReportPdfExporter pdfExporter = new FinancialReportPdfExporter(chart);
        byte[] pdf = pdfExporter.render(report);
        assertEquals(true, pdf.length > 500);

        String pdfString = new String(pdf, java.nio.charset.StandardCharsets.ISO_8859_1);
        assertEquals(true, pdfString.startsWith("%PDF-1.4"));
        assertEquals(true, pdfString.contains("/WinAnsiEncoding"));
        assertEquals(true, pdfString.contains("xref"));
        assertEquals(true, pdfString.contains("%%EOF"));
    }

    @Test("uses community name in signature when treasurer is absent in leadership")
    public void usesCommunityNameWhenTreasurerAbsent() {
        CommunityRepository commRepo = new CommunityRepository() {
            @Override public Community save(Community c) { return c; }
            @Override public Optional<Community> findById(String id) {
                if ("sjb-id".equals(id)) return Optional.of(new Community("sjb-id", "São João Bosco", "SJB", false));
                return Optional.empty();
            }
            @Override public Optional<Community> findByCode(String code) {
                if ("SJB".equalsIgnoreCase(code)) return Optional.of(new Community("sjb-id", "São João Bosco", "SJB", false));
                return Optional.empty();
            }
            @Override public Optional<Community> findMainParish() { return Optional.empty(); }
            @Override public List<Community> findAll() { return List.of(new Community("sjb-id", "São João Bosco", "SJB", false)); }
        };

        FinancialReportGenerator gen = new FinancialReportGenerator(repository, chart, null, commRepo);
        FinancialReport report = gen.generate(LocalDate.of(2024, 4, 1), LocalDate.of(2024, 4, 30), BigDecimal.ZERO, null, "sjb-id");

        assertEquals("Tesoureiro(a) - São João Bosco", report.signatures().get(1).name());

        // And verifies that PDF renders correctly
        FinancialReportPdfExporter pdfExporter = new FinancialReportPdfExporter(chart);
        byte[] pdf = pdfExporter.render(report);
        assertEquals(true, pdf.length > 500);

        String pdfString = new String(pdf, java.nio.charset.StandardCharsets.ISO_8859_1);
        assertEquals(true, pdfString.startsWith("%PDF-1.4"));
        assertEquals(true, pdfString.contains("/WinAnsiEncoding"));
        assertEquals(true, pdfString.contains("xref"));
        assertEquals(true, pdfString.contains("%%EOF"));
    }

    @Test("uses generic parish treasurer when community is ALL or consolidated and ignores Admin")
    public void usesParishTreasurerWhenConsolidated() {
        FinancialReportGenerator gen = new FinancialReportGenerator(repository, chart, null, null);
        FinancialReport report = gen.generate(LocalDate.of(2024, 4, 1), LocalDate.of(2024, 4, 30), BigDecimal.ZERO, "Admin", "ALL");

        // "Admin" is rejected and replaced by "Tesoureiro(a) Paroquial"
        assertEquals("Tesoureiro(a) Paroquial", report.signatures().get(1).name());
    }
}
