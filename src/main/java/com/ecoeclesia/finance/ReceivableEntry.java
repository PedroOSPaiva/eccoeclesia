package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Objects;
import java.util.UUID;

public record ReceivableEntry(String id, String description, BigDecimal amount, LocalDate dueDate,
                              String origin, String category, String project,
                              ReceivableStatus status, OffsetDateTime createdAt, String createdBy,
                              OffsetDateTime updatedAt, String updatedBy) {

    public ReceivableEntry {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(description, "description");
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(dueDate, "dueDate");
        Objects.requireNonNull(status, "status");
        Objects.requireNonNull(createdAt, "createdAt");
    }

    public static ReceivableEntry open(String description, BigDecimal amount, LocalDate dueDate,
                                       String origin, String category, String project, String createdBy) {
        OffsetDateTime now = OffsetDateTime.now();
        return new ReceivableEntry(UUID.randomUUID().toString(), description, amount, dueDate,
                origin, category, project, ReceivableStatus.OPEN, now, createdBy, now, createdBy);
    }

    public ReceivableEntry withStatus(ReceivableStatus newStatus, String updatedBy) {
        return new ReceivableEntry(id, description, amount, dueDate, origin, category, project,
                newStatus, createdAt, createdBy, OffsetDateTime.now(), updatedBy);
    }
}
