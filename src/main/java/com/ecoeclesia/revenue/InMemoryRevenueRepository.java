package com.ecoeclesia.revenue;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public final class InMemoryRevenueRepository implements RevenueRepository {

    private final Map<String, RevenueEntity> store = new ConcurrentHashMap<>();

    @Override
    public RevenueEntity save(RevenueEntity entity) {
        store.put(entity.getId(), entity);
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
                .filter(entity -> !entity.getReceivedAt().isBefore(start) && !entity.getReceivedAt().isAfter(end))
                .collect(Collectors.toList()));
    }

    private static List<RevenueEntity> sorted(List<RevenueEntity> entities) {
        entities.sort(Comparator.comparing(RevenueEntity::getReceivedAt).reversed());
        return entities;
    }
}
