package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import com.ecoeclesia.testing.Test;

public final class DatabaseLedgerRepositoryTest {

    @Test
    public void storesAndReadsEntries() throws Exception {
        LedgerRepository repository = new DatabaseLedgerRepository(java.nio.file.Files.createTempDirectory("ledger-db").resolve("test.csv"));
        LedgerService service = new LedgerService(repository, ChartOfAccounts.defaultPlan());

        service.recordIncome("1.1.01", new BigDecimal("100.00"), "Oferta", "REF1", "ADM", LocalDate.of(2024, 5, 1));
        service.recordExpense("2.1.01", new BigDecimal("40.00"), "Compra", "REF2", "ADM", LocalDate.of(2024, 5, 2));

        List<LedgerEntry> all = repository.findAll();
        if (all.size() != 2) {
            throw new AssertionError("Expected 2 entries, found " + all.size());
        }
    }
}
