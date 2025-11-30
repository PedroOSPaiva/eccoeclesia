package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.Clock;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

public final class LedgerService {

    private final LedgerRepository repository;
    private final ChartOfAccounts chart;
    private final Clock clock;

    public LedgerService(LedgerRepository repository, ChartOfAccounts chart) {
        this(repository, chart, Clock.systemDefaultZone());
    }

    public LedgerService(LedgerRepository repository, ChartOfAccounts chart, Clock clock) {
        this.repository = Objects.requireNonNull(repository);
        this.chart = Objects.requireNonNull(chart);
        this.clock = Objects.requireNonNull(clock);
    }

    public LedgerEntry recordIncome(String accountCode, BigDecimal amount, String description, String referenceCode, String costCenter) {
        return recordIncome(accountCode, amount, description, referenceCode, costCenter, LocalDate.now(clock));
    }

    public LedgerEntry recordIncome(String accountCode, BigDecimal amount, String description, String referenceCode, String costCenter, LocalDate occurredOn) {
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(description, "description");
        chart.assertMatches(accountCode, AccountNature.INCOME);
        LedgerEntry entry = new LedgerEntry(UUID.randomUUID().toString(), accountCode, sanitize(referenceCode), sanitize(costCenter), description,
                amount, LedgerEntryType.INCOME, occurredOn);
        return repository.save(entry);
    }

    public LedgerEntry recordExpense(String accountCode, BigDecimal amount, String description, String referenceCode, String costCenter) {
        return recordExpense(accountCode, amount, description, referenceCode, costCenter, LocalDate.now(clock));
    }

    public LedgerEntry recordExpense(String accountCode, BigDecimal amount, String description, String referenceCode, String costCenter, LocalDate occurredOn) {
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(description, "description");
        chart.assertMatches(accountCode, AccountNature.EXPENSE);
        LedgerEntry entry = new LedgerEntry(UUID.randomUUID().toString(), accountCode, sanitize(referenceCode), sanitize(costCenter), description,
                amount, LedgerEntryType.EXPENSE, occurredOn);
        return repository.save(entry);
    }

    private String sanitize(String value) {
        if (value == null || value.isBlank()) {
            return "N/A";
        }
        return value.trim();
    }

    public java.util.List<LedgerEntry> listAll() {
        return repository.findAll();
    }

    public java.util.List<LedgerEntry> findByPeriod(LocalDate start, LocalDate end) {
        return repository.findByPeriod(start, end);
    }
}
