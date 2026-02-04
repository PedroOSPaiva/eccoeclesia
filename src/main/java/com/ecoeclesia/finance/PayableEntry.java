package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public record PayableEntry(String id, String description, BigDecimal amount, LocalDate dueDate,
                           String costCenter, String recurrence, List<String> attachments,
                           PayableStatus status, OffsetDateTime createdAt, String createdBy,
                           OffsetDateTime updatedAt, String updatedBy) {

    public PayableEntry {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(description, "description");
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(dueDate, "dueDate");
        Objects.requireNonNull(attachments, "attachments");
        Objects.requireNonNull(status, "status");
        Objects.requireNonNull(createdAt, "createdAt");
    }

    public static PayableEntry open(String description, BigDecimal amount, LocalDate dueDate,
                                    String costCenter, String recurrence, List<String> attachments,
                                    String createdBy) {
        OffsetDateTime now = OffsetDateTime.now();
        return new PayableEntry(UUID.randomUUID().toString(), description, amount, dueDate,
                costCenter, recurrence, attachments, PayableStatus.OPEN, now, createdBy, now, createdBy);
    }

    public PayableEntry withStatus(PayableStatus newStatus, String updatedBy) {
        return new PayableEntry(id, description, amount, dueDate, costCenter, recurrence, attachments,
                newStatus, createdAt, createdBy, OffsetDateTime.now(), updatedBy);
    }
}
