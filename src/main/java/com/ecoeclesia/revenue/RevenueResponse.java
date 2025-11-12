package com.ecoeclesia.revenue;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record RevenueResponse(
        UUID id,
        BigDecimal amount,
        String description,
        RevenueCategory category,
        Instant createdAt
) {
    public static RevenueResponse fromEntity(RevenueEntity entity) {
        return new RevenueResponse(
                entity.getId(),
                entity.getAmount(),
                entity.getDescription(),
                entity.getCategory(),
                entity.getCreatedAt()
        );
    }
}
