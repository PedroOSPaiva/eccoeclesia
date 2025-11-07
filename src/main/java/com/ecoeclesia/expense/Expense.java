package com.ecoeclesia.expense;

import java.math.BigDecimal;
import java.util.Objects;

/**
 * Simple representation of an expense with immutable properties.
 */
public class Expense {

    private final BigDecimal amount;
    private final String description;
    private final ExpenseCategory category;

    public Expense(BigDecimal amount, String description, ExpenseCategory category) {
        this.amount = Objects.requireNonNull(amount, "amount must not be null");
        this.description = Objects.requireNonNullElse(description, "");
        this.category = Objects.requireNonNull(category, "category must not be null");
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public ExpenseCategory getCategory() {
        return category;
    }
}
