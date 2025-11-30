package com.ecoeclesia.finance;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Implementação em memória do gateway JDBC, usada para testar o repositório
 * SQL sem depender de um driver real.
 */
final class InMemoryLedgerGateway implements LedgerGateway {

    private final List<LedgerEntry> entries = new ArrayList<>();

    @Override
    public void initialize() {
        // nothing to do
    }

    @Override
    public void upsert(LedgerEntry entry) {
        Objects.requireNonNull(entry);
        entries.removeIf(e -> e.id().equals(entry.id()));
        entries.add(entry);
    }

    @Override
    public List<LedgerEntry> findAll() {
        return Collections.unmodifiableList(entries);
    }

    @Override
    public List<LedgerEntry> findByPeriod(LocalDate start, LocalDate end) {
        return entries.stream()
                .filter(entry -> !entry.occurredOn().isBefore(start) && !entry.occurredOn().isAfter(end))
                .collect(Collectors.toList());
    }
}
