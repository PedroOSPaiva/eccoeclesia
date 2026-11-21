package com.ecoeclesia.revenue;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

public record RevenueEntity(String id, String communityId, BigDecimal amount, String description, RevenueCategory category, Instant receivedAt, String memberId) {

    public RevenueEntity(BigDecimal amount, String description, RevenueCategory category) {
        this(UUID.randomUUID().toString(), null, amount, description, category, Instant.now(), null);
    }

    public RevenueEntity(String id, BigDecimal amount, String description, RevenueCategory category, Instant receivedAt) {
        this(id, null, amount, description, category, receivedAt, null);
    }

    public RevenueEntity(String id, String communityId, BigDecimal amount, String description, RevenueCategory category, Instant receivedAt) {
        this(id, communityId, amount, description, category, receivedAt, null);
    }

    public RevenueEntity {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(description, "description");
        Objects.requireNonNull(category, "category");
        Objects.requireNonNull(receivedAt, "receivedAt");
    }
}
