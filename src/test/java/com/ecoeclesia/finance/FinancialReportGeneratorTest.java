package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.time.LocalDate;

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
}
