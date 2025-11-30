package com.ecoeclesia.revenue;

import java.math.BigDecimal;
import java.time.Instant;

public record RevenueResponse(String id, BigDecimal amount, String description, RevenueCategory category, Instant receivedAt) {
    public static RevenueResponse from(RevenueEntity entity) {
        return new RevenueResponse(entity.id(), entity.amount(), entity.description(),
                entity.category(), entity.receivedAt());
    }
}
