package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Objects;
import java.util.UUID;

public record ReceivableEntry(String id, String description, BigDecimal amount, LocalDate dueDate,
                              ReceivableStatus status, OffsetDateTime createdAt) {

    public ReceivableEntry {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(description, "description");
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(dueDate, "dueDate");
        Objects.requireNonNull(status, "status");
        Objects.requireNonNull(createdAt, "createdAt");
    }

    public static ReceivableEntry open(String description, BigDecimal amount, LocalDate dueDate) {
        return new ReceivableEntry(UUID.randomUUID().toString(), description, amount, dueDate,
                ReceivableStatus.OPEN, OffsetDateTime.now());
    }

    public ReceivableEntry withStatus(ReceivableStatus newStatus) {
        return new ReceivableEntry(id, description, amount, dueDate, newStatus, createdAt);
    }
}
