package com.ecoeclesia.revenue;

import java.math.BigDecimal;
import java.time.Instant;

public record RevenueResponse(
        String id,
        BigDecimal amount,
        String description,
        RevenueCategory category,
        Instant createdAt
) {

    public static RevenueResponse fromDocument(RevenueDocument document) {
        return new RevenueResponse(
                document.getId(),
                document.getAmount(),
                document.getDescription(),
                document.getCategory(),
                document.getCreatedAt()
        );
    }
}
