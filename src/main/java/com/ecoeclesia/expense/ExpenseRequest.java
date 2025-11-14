package com.ecoeclesia.expense;

import java.math.BigDecimal;
import java.util.Objects;

public record ExpenseRequest(BigDecimal amount, String description, String category) {
    public ExpenseRequest {
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(description, "description");
    }
}
