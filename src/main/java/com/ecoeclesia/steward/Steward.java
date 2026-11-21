package com.ecoeclesia.steward;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

public record Steward(String id, String memberId, String envelopeNumber, LocalDate startDate,
                      String status, String notes, Instant createdAt, Instant updatedAt) {
    public Steward {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(memberId, "memberId");
        if (startDate == null) {
            startDate = LocalDate.now();
        }
        if (status == null || status.isBlank()) {
            status = "ACTIVE";
        }
    }

    public static Steward create(String memberId, String envelopeNumber, LocalDate startDate, String notes) {
        return new Steward(UUID.randomUUID().toString(), memberId, envelopeNumber, startDate, "ACTIVE", notes, Instant.now(), Instant.now());
    }
}
