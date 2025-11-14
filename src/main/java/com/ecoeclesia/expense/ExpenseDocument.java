package com.ecoeclesia.expense;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

/**
 * Internal persistence representation. Even though the current implementation
 * relies on an in-memory repository, we keep the richer model so that porting
 * the service to a database later does not require changing the public API.
 */
public final class ExpenseDocument {
    private final String id;
    private BigDecimal amount;
    private String description;
    private ExpenseCategory category;
    private final Instant createdAt;

    public ExpenseDocument(BigDecimal amount, String description, ExpenseCategory category) {
        this(UUID.randomUUID().toString(), amount, description, category, Instant.now());
    }

    public ExpenseDocument(String id, BigDecimal amount, String description, ExpenseCategory category, Instant createdAt) {
        this.id = Objects.requireNonNull(id);
        this.amount = Objects.requireNonNull(amount);
        this.description = Objects.requireNonNull(description);
        this.category = Objects.requireNonNull(category);
        this.createdAt = Objects.requireNonNull(createdAt);
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

    public ExpenseCategory getCategory() {
        return category;
    }

    public void setCategory(ExpenseCategory category) {
        this.category = Objects.requireNonNull(category);
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
