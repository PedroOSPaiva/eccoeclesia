package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Objects;
import java.util.UUID;

public record PayableEntry(String id, String description, BigDecimal amount, LocalDate dueDate,
                           PayableStatus status, OffsetDateTime createdAt) {

    public PayableEntry {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(description, "description");
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(dueDate, "dueDate");
        Objects.requireNonNull(status, "status");
        Objects.requireNonNull(createdAt, "createdAt");
    }

    public static PayableEntry open(String description, BigDecimal amount, LocalDate dueDate) {
        return new PayableEntry(UUID.randomUUID().toString(), description, amount, dueDate,
                PayableStatus.OPEN, OffsetDateTime.now());
    }

    public PayableEntry withStatus(PayableStatus newStatus) {
        return new PayableEntry(id, description, amount, dueDate, newStatus, createdAt);
    }
}
