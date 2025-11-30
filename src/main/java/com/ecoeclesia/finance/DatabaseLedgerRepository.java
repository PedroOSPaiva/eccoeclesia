package com.ecoeclesia.finance;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * File-backed "database" used to persist ledger entries in a tabular format.
 * Although it runs on flat files instead of an external RDBMS, the repository
 * guarantees durability across restarts and provides query-by-period similar to
 * a relational table.
 */
public final class DatabaseLedgerRepository implements LedgerRepository {

    private final Path storage;

    public DatabaseLedgerRepository(Path storage) {
        this.storage = Objects.requireNonNull(storage);
        initialize();
    }

    public DatabaseLedgerRepository() {
        this(Path.of("data", "ledger-db.csv"));
    }

    @Override
    public synchronized LedgerEntry save(LedgerEntry entry) {
        List<LedgerEntry> current = findAll();
        List<LedgerEntry> updated = new ArrayList<>();
        boolean replaced = false;
        for (LedgerEntry existing : current) {
            if (existing.id().equals(entry.id())) {
                updated.add(entry);
                replaced = true;
            } else {
                updated.add(existing);
            }
        }
        if (!replaced) {
            updated.add(entry);
        }
        writeAll(updated);
        return entry;
    }

    @Override
    public synchronized List<LedgerEntry> findByPeriod(LocalDate start, LocalDate end) {
        return findAll().stream()
                .filter(entry -> !entry.occurredOn().isBefore(start) && !entry.occurredOn().isAfter(end))
                .collect(Collectors.toList());
    }

    @Override
    public synchronized List<LedgerEntry> findAll() {
        try {
            List<String> lines = Files.readAllLines(storage, StandardCharsets.UTF_8);
            if (lines.isEmpty()) {
                return Collections.emptyList();
            }
            return lines.subList(1, lines.size()).stream()
                    .map(this::parse)
                    .collect(Collectors.toList());
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to read ledger database", ex);
        }
    }

    private LedgerEntry parse(String line) {
        String[] parts = line.split("\\|");
        return new LedgerEntry(
                parts[0],
                parts[1],
                parts[2],
                parts[3],
                parts[4],
                new BigDecimal(parts[5]),
                LedgerEntryType.valueOf(parts[6]),
                LocalDate.parse(parts[7])
        );
    }

    private void writeAll(List<LedgerEntry> entries) {
        try {
            Files.createDirectories(storage.getParent());
            List<String> lines = new ArrayList<>();
            lines.add("id|account|reference|costCenter|description|amount|type|date");
            for (LedgerEntry entry : entries) {
                lines.add(String.join("|",
                        entry.id(),
                        entry.accountCode(),
                        entry.referenceCode(),
                        entry.costCenter(),
                        entry.description(),
                        entry.amount().toPlainString(),
                        entry.type().name(),
                        entry.occurredOn().toString()));
            }
            Files.write(storage, lines, StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to persist ledger database", ex);
        }
    }

    private void initialize() {
        if (Files.exists(storage)) {
            return;
        }
        try {
            Files.createDirectories(storage.getParent());
            Files.write(storage, List.of("id|account|reference|costCenter|description|amount|type|date"), StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to initialize ledger database", ex);
        }
    }
}
