package com.ecoeclesia.revenue;

import java.math.BigDecimal;
import java.util.Objects;

public record RevenueRequest(BigDecimal amount, String description, String category) {
    public RevenueRequest {
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(description, "description");
    }
}
