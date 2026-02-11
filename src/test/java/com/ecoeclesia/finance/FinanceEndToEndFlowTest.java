package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertNotNull;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;

public final class FinanceEndToEndFlowTest {

    private final Clock fixedClock = Clock.fixed(Instant.parse("2024-03-31T12:00:00Z"), ZoneOffset.UTC);
    private final ChartOfAccounts chart = ChartOfAccounts.defaultPlan();

    @Test("imports ledger csv and exports consolidated reports")
    public void importsAndExportsReports() {
        InMemoryLedgerRepository repository = new InMemoryLedgerRepository();
        LedgerService ledgerService = new LedgerService(repository, chart, fixedClock);
        FinancialStatementImportService importer = new FinancialStatementImportService();

        String csv = "2024-03-01,Oferta dominical,INCOME,500.00,1.1.01,OF-2024-03-01,Comunidade\n" +
                "2024-03-05,Doacao externa,INCOME,250.00,1.1.02,EXT-77,Projetos\n" +
                "2024-03-08,Compra de velas,EXPENSE,120.50,2.1.05,LIT-09,Liturgia";

        int imported = importer.importLedgerCsv(csv, ledgerService);
        assertEquals(3, imported);

        FinancialReportGenerator generator = new FinancialReportGenerator(repository, chart);
        FinancialReport report = generator.generate(LocalDate.of(2024, 3, 1), LocalDate.of(2024, 3, 31), new BigDecimal("100.00"));

        assertEquals(new BigDecimal("750.00"), report.totalIncome());
        assertEquals(new BigDecimal("120.50"), report.totalExpenses());
        assertEquals(new BigDecimal("729.50"), report.closingBalance());
        assertEquals(2, report.incomeLines().size());
        assertEquals(1, report.expenseLines().size());

        FinancialReportFormatter formatter = new FinancialReportFormatter();
        String textReport = formatter.render(report);
        assertTrue(textReport.contains("Receitas"));
        assertTrue(textReport.contains("Despesas"));
        assertTrue(textReport.contains("OF-2024-03-01"));

        FinancialReportSpreadsheetExporter spreadsheetExporter = new FinancialReportSpreadsheetExporter();
        String csvReport = spreadsheetExporter.toCsv(report);
        assertTrue(csvReport.contains("1.1.01"));
        assertTrue(csvReport.contains("2.1.05"));

        FinancialReportPdfExporter pdfExporter = new FinancialReportPdfExporter();
        byte[] pdf = pdfExporter.render(report);
        assertNotNull(pdf);
        assertTrue(pdf.length > 200, "Expected PDF-like content to be generated");
    }

    @Test("manages payables, receivables and cashflow snapshot")
    public void managesPayablesReceivablesAndCashflow() {
        PayableService payableService = new PayableService(new InMemoryPayableRepository());
        ReceivableService receivableService = new ReceivableService(new InMemoryReceivableRepository());

        PayableEntry payable = payableService.create("Energia elétrica", new BigDecimal("180.00"),
                LocalDate.of(2024, 4, 10), "Manutenção", "MONTHLY", java.util.List.of("boleto.pdf"), "finance@parish.org");
        ReceivableEntry receivable = receivableService.create("Dízimos", new BigDecimal("600.00"),
                LocalDate.of(2024, 4, 5), "Ofertas", "Dízimo", "Projeto Social", "finance@parish.org");

        PayableEntry approved = payableService.updateStatus(payable.id(), PayableStatus.APPROVED, "tesouraria@parish.org");
        ReceivableEntry received = receivableService.updateStatus(receivable.id(), ReceivableStatus.RECEIVED, "tesouraria@parish.org");

        CashflowService cashflowService = new CashflowService(payableService, receivableService);
        CashflowSnapshot snapshot = cashflowService.snapshot(LocalDate.of(2024, 4, 1), LocalDate.of(2024, 4, 30),
                null, null, "Manutenção");

        assertEquals("tesouraria@parish.org", approved.updatedBy());
        assertEquals("tesouraria@parish.org", received.updatedBy());
        assertEquals(new BigDecimal("180.00"), snapshot.totalPayables());
        assertEquals(new BigDecimal("600.00"), snapshot.totalReceivables());
        assertEquals(new BigDecimal("420.00"), snapshot.netBalance());
    }
}
