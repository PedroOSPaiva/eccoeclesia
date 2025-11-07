package com.ecoeclesia.expense;

import java.math.BigDecimal;
import java.time.Instant;

public record ExpenseResponse(
    String id,
    BigDecimal amount,
    String description,
    ExpenseCategory category,
    Instant createdAt
) {
    public static ExpenseResponse fromDocument(ExpenseDocument document) {
        return new ExpenseResponse(
            document.getId(),
            document.getAmount(),
            document.getDescription(),
            document.getCategory(),
            document.getCreatedAt()
        );
    }
}
