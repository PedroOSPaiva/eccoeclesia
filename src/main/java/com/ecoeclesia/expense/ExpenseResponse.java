package com.ecoeclesia.expense;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record ExpenseResponse(
    UUID id,
    BigDecimal amount,
    String description,
    ExpenseCategory category,
    Instant createdAt
) {
    public static ExpenseResponse fromEntity(ExpenseEntity entity) {
        return new ExpenseResponse(
            entity.getId(),
            entity.getAmount(),
            entity.getDescription(),
            entity.getCategory(),
            entity.getCreatedAt()
        );
    }
}
