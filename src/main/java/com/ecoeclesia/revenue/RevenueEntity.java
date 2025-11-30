package com.ecoeclesia.revenue;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

public record RevenueEntity(String id, BigDecimal amount, String description, RevenueCategory category, Instant receivedAt) {

    public RevenueEntity(BigDecimal amount, String description, RevenueCategory category) {
        this(UUID.randomUUID().toString(), amount, description, category, Instant.now());
    }

    public RevenueEntity {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(description, "description");
        Objects.requireNonNull(category, "category");
        Objects.requireNonNull(receivedAt, "receivedAt");
    }
}
