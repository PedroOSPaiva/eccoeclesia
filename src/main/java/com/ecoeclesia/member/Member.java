package com.ecoeclesia.member;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

public record Member(String id, String communityId, String name, LocalDate birthDate,
                     String phone, String email, String ministry, String status,
                     Instant createdAt, Instant updatedAt) {
    public Member {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(communityId, "communityId");
        Objects.requireNonNull(name, "name");
        if (status == null || status.isBlank()) {
            status = "ACTIVE";
        }
    }

    public static Member create(String communityId, String name, LocalDate birthDate, String phone, String email, String ministry) {
        return new Member(UUID.randomUUID().toString(), communityId, name, birthDate, phone, email, ministry, "ACTIVE", Instant.now(), Instant.now());
    }
}
