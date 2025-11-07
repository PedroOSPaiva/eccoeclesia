package com.ecoeclesia.revenue;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

@Document(collection = "revenues")
public class RevenueDocument {

    @Id
    private String id;
    private BigDecimal amount;
    private String description;
    private RevenueCategory category;
    private Instant createdAt;

    public RevenueDocument() {
        // Default constructor for persistence frameworks
    }

    public RevenueDocument(String id, BigDecimal amount, String description, RevenueCategory category, Instant createdAt) {
        this.id = id;
        this.amount = Objects.requireNonNull(amount, "amount must not be null");
        this.description = Objects.requireNonNullElse(description, "");
        this.category = Objects.requireNonNull(category, "category must not be null");
        this.createdAt = Objects.requireNonNull(createdAt, "createdAt must not be null");
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RevenueCategory getCategory() {
        return category;
    }

    public void setCategory(RevenueCategory category) {
        this.category = category;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
