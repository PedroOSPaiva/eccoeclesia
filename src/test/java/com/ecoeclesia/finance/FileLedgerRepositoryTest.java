package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;

public final class FileLedgerRepositoryTest {

    @Test("persists entries across instances")
    public void persistsEntries() throws Exception {
        Path temp = Files.createTempFile("ledger", ".txt");
        FileLedgerRepository repository = new FileLedgerRepository(temp);
        LedgerService service = new LedgerService(repository, ChartOfAccounts.defaultPlan());
        service.recordIncome("1.1.02", new BigDecimal("250.00"), "Doação online", "DOA-01", "Digital", LocalDate.of(2024, 3, 1));

        FileLedgerRepository reloaded = new FileLedgerRepository(temp);
        assertEquals(1, reloaded.findAll().size());
        assertTrue(reloaded.findAll().get(0).description().contains("Doação"));
    }
}
