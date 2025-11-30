package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertThrows;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.time.LocalDate;

public final class FinancialStatementImportServiceTest {

    private final FinancialStatementImportService service = new FinancialStatementImportService();

    @Test("computes totals for valid csv input")
    public void computesTotals() {
        String csv = "2024-01-01,Oferta especial,INCOME,200.00\n" +
                "2024-01-02,Compra de cadeiras,EXPENSE,150.00";
        StatementImportResult result = service.importCsv(csv);
        assertEquals(2, result.totalLines());
        assertEquals("50.00", result.balance().toPlainString());
    }

    @Test("rejects malformed lines")
    public void rejectsMalformedLines() {
        String csv = "2024-01-01,Entrada incompleta,INCOME";
        assertThrows(IllegalArgumentException.class, () -> service.importCsv(csv));
    }

    @Test("imports extended ledger csv with account codes")
    public void importsLedgerCsv() {
        InMemoryLedgerRepository repository = new InMemoryLedgerRepository();
        LedgerService ledgerService = new LedgerService(repository, ChartOfAccounts.defaultPlan(), java.time.Clock.systemUTC());

        String csv = "2024-03-01,Oferta de campanha,INCOME,500.00,1.1.01,OF-003,Comunicacao\n" +
                "2024-03-05,Compra de velas,EXPENSE,120.00,2.1.05,LIT-01,Liturgia";
        int imported = service.importLedgerCsv(csv, ledgerService);

        assertEquals(2, imported);
        assertEquals(new BigDecimal("500.00"), repository.findByPeriod(LocalDate.of(2024, 3, 1), LocalDate.of(2024, 3, 31))
                .get(0).amount());
    }
}
