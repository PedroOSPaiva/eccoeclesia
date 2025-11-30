package com.ecoeclesia.finance;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public final class SqlLedgerRepositoryTest {

    private final LedgerGateway gateway = new InMemoryLedgerGateway();
    private final LedgerRepository repository = new SqlLedgerRepository(gateway);
    private final LedgerService service = new LedgerService(repository, ChartOfAccounts.defaultPlan());

    @Test("persists and filters entries through the gateway abstraction")
    public void persistsAndFilters() {
        service.recordIncome("1.1.01", new BigDecimal("120.00"), "Oferta especial", "REF-A", "ADM", LocalDate.of(2025, 1, 5));
        service.recordExpense("2.1.01", new BigDecimal("20.00"), "Material limpeza", "REF-B", "ADM", LocalDate.of(2025, 1, 10));

        List<LedgerEntry> january = repository.findByPeriod(LocalDate.of(2025, 1, 1), LocalDate.of(2025, 1, 31));
        if (january.size() != 2) {
            throw new AssertionError("Expected 2 entries in January, found " + january.size());
        }
    }
}
