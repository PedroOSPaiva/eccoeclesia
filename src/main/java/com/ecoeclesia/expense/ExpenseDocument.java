package com.ecoeclesia.expense;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

@Document(collection = "expenses")
public class ExpenseDocument {

    @Id
    private String id;
    private BigDecimal amount;
    private String description;
    private ExpenseCategory category;
    private Instant createdAt;

    public ExpenseDocument() {
        // Default constructor for persistence frameworks
    }

    public ExpenseDocument(String id, BigDecimal amount, String description, ExpenseCategory category, Instant createdAt) {
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

    public ExpenseCategory getCategory() {
        return category;
    }

    public void setCategory(ExpenseCategory category) {
        this.category = category;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
