package com.ecoeclesia.finance;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public final class FileLedgerRepository implements LedgerRepository {

    private final Path storage;
    private final List<LedgerEntry> entries = new ArrayList<>();

    public FileLedgerRepository(Path storage) {
        this.storage = Objects.requireNonNull(storage);
        loadExisting();
    }

    @Override
    public LedgerEntry save(LedgerEntry entry) {
        Objects.requireNonNull(entry, "entry");
        entries.removeIf(existing -> existing.id().equals(entry.id()));
        entries.add(entry);
        appendToFile(entry);
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

    private void loadExisting() {
        if (!Files.exists(storage)) {
            return;
        }
        try {
            List<String> lines = Files.readAllLines(storage, StandardCharsets.UTF_8);
            for (String line : lines) {
                if (line.isBlank()) {
                    continue;
                }
                LedgerEntry entry = decode(line);
                entries.add(entry);
            }
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to read ledger storage", ex);
        }
    }

    private void appendToFile(LedgerEntry entry) {
        try {
            Path parent = storage.getParent();
            if (parent != null) {
                Files.createDirectories(parent);
            }
            Files.writeString(storage, encode(entry) + System.lineSeparator(), StandardCharsets.UTF_8,
                    Files.exists(storage) ? java.nio.file.StandardOpenOption.APPEND : java.nio.file.StandardOpenOption.CREATE);
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to persist ledger entry", ex);
        }
    }

    private String encode(LedgerEntry entry) {
        return String.join("|",
                entry.id(),
                entry.occurredOn().toString(),
                entry.type().name(),
                base64(entry.accountCode()),
                base64(entry.referenceCode()),
                base64(entry.costCenter()),
                base64(entry.description()),
                entry.amount().toPlainString());
    }

    private LedgerEntry decode(String line) {
        String[] parts = line.split("\\|");
        if (parts.length != 8) {
            throw new IllegalStateException("Invalid ledger line: " + line);
        }
        return new LedgerEntry(
                parts[0],
                fromBase64(parts[3]),
                fromBase64(parts[4]),
                fromBase64(parts[5]),
                fromBase64(parts[6]),
                new java.math.BigDecimal(parts[7]),
                LedgerEntryType.valueOf(parts[2]),
                LocalDate.parse(parts[1])
        );
    }

    private String base64(String value) {
        return Base64.getEncoder().encodeToString(value.getBytes(StandardCharsets.UTF_8));
    }

    private String fromBase64(String value) {
        return new String(Base64.getDecoder().decode(value), StandardCharsets.UTF_8);
    }
}
