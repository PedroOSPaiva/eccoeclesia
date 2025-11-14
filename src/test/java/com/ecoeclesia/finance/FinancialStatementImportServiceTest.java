package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertThrows;

import com.ecoeclesia.testing.Test;

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
}
