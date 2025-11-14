package com.ecoeclesia.revenue;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

public final class RevenueEntity {
    private final String id;
    private BigDecimal amount;
    private String description;
    private RevenueCategory category;
    private Instant receivedAt;

    public RevenueEntity(BigDecimal amount, String description, RevenueCategory category) {
        this(UUID.randomUUID().toString(), amount, description, category, Instant.now());
    }

    public RevenueEntity(String id, BigDecimal amount, String description, RevenueCategory category, Instant receivedAt) {
        this.id = Objects.requireNonNull(id);
        this.amount = Objects.requireNonNull(amount);
        this.description = Objects.requireNonNull(description);
        this.category = Objects.requireNonNull(category);
        this.receivedAt = Objects.requireNonNull(receivedAt);
    }

    public String getId() {
        return id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = Objects.requireNonNull(amount);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = Objects.requireNonNull(description);
    }

    public RevenueCategory getCategory() {
        return category;
    }

    public void setCategory(RevenueCategory category) {
        this.category = Objects.requireNonNull(category);
    }

    public Instant getReceivedAt() {
        return receivedAt;
    }

    public void setReceivedAt(Instant receivedAt) {
        this.receivedAt = Objects.requireNonNull(receivedAt);
    }
}
