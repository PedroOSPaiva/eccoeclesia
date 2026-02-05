package com.ecoeclesia.revenue;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public final class FileRevenueRepository implements RevenueRepository {

    private final Path storageFile;
    private final Map<String, RevenueEntity> store = new ConcurrentHashMap<>();

    public FileRevenueRepository(Path storageFile) {
        this.storageFile = storageFile;
        load();
    }

    @Override
    public synchronized RevenueEntity save(RevenueEntity entity) {
        store.put(entity.id(), entity);
        persist();
        return entity;
    }

    @Override
    public Optional<RevenueEntity> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<RevenueEntity> findAll() {
        return sorted(new ArrayList<>(store.values()));
    }

    @Override
    public List<RevenueEntity> findByPeriod(Instant start, Instant end) {
        return sorted(store.values().stream()
                .filter(entity -> !entity.receivedAt().isBefore(start) && !entity.receivedAt().isAfter(end))
                .toList());
    }

    @Override
    public synchronized void deleteById(String id) {
        store.remove(id);
        persist();
    }

    private void load() {
        if (!Files.exists(storageFile)) {
            return;
        }
        try {
            for (String line : Files.readAllLines(storageFile, StandardCharsets.UTF_8)) {
                String trimmed = line.trim();
                if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                    continue;
                }
                String[] parts = trimmed.split(",", -1);
                if (parts.length < 5) {
                    continue;
                }
                RevenueEntity entity = new RevenueEntity(
                        parts[0].trim(),
                        new BigDecimal(parts[1].trim()),
                        parts[2].trim(),
                        RevenueCategory.valueOf(parts[3].trim()),
                        Instant.parse(parts[4].trim()));
                store.put(entity.id(), entity);
            }
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to load revenues file", ex);
        }
    }

    private void persist() {
        try {
            Files.createDirectories(storageFile.getParent());
            List<String> lines = new ArrayList<>();
            lines.add("# id,amount,description,category,receivedAt");
            for (RevenueEntity entity : sorted(new ArrayList<>(store.values()))) {
                lines.add(String.join(",",
                        entity.id(),
                        entity.amount().toPlainString(),
                        entity.description(),
                        entity.category().name(),
                        entity.receivedAt().toString()));
            }
            Files.write(storageFile, lines, StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to persist revenues file", ex);
        }
    }

    private static List<RevenueEntity> sorted(List<RevenueEntity> entities) {
        entities.sort(Comparator.comparing(RevenueEntity::receivedAt).reversed());
        return entities;
    }

}
