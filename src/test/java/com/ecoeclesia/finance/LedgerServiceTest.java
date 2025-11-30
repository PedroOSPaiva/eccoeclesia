package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertThrows;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.time.LocalDate;

public final class LedgerServiceTest {

    private final ChartOfAccounts chart = ChartOfAccounts.defaultPlan();
    private final InMemoryLedgerRepository repository = new InMemoryLedgerRepository();
    private final LedgerService service = new LedgerService(repository, chart);

    @Test("rejects entries whose account nature mismatches the type")
    public void rejectsMismatchedAccount() {
        assertThrows(IllegalArgumentException.class, () ->
                service.recordExpense("1.1.01", new BigDecimal("10.00"), "Oferta", "REF-1", "Liturgia"));
    }

    @Test("stores incomes and expenses with metadata")
    public void storesEntries() {
        service.recordIncome("1.1.01", new BigDecimal("200.00"), "Dízimo", "OF-2024", "Geral", LocalDate.of(2024, 1, 10));
        service.recordExpense("2.1.02", new BigDecimal("75.00"), "Conta de luz", "UTIL-01", "Sede", LocalDate.of(2024, 1, 11));

        assertEquals(2, repository.findAll().size());
        assertEquals("2.1.02", repository.findAll().get(1).accountCode());
    }
}
