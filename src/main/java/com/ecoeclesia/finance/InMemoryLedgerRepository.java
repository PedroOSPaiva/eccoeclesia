package com.ecoeclesia.finance;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public final class InMemoryLedgerRepository implements LedgerRepository {

    private final List<LedgerEntry> entries = new ArrayList<>();

    @Override
    public LedgerEntry save(LedgerEntry entry) {
        Objects.requireNonNull(entry, "entry");
        entries.removeIf(existing -> existing.id().equals(entry.id()));
        entries.add(entry);
        return entry;
    }

    @Override
    public List<LedgerEntry> findByPeriod(LocalDate start, LocalDate end) {
        return entries.stream()
                .filter(entry -> !entry.occurredOn().isBefore(start) && !entry.occurredOn().isAfter(end))
                .sorted((a, b) -> a.occurredOn().compareTo(b.occurredOn()))
                .collect(Collectors.toList());
    }

    @Override
    public List<LedgerEntry> findAll() {
        return Collections.unmodifiableList(entries);
    }
}
