package com.ecoeclesia.leadership;

import java.time.Instant;
import java.util.Objects;

public record ParishLeader(
        String id,
        String name,
        String role,
        boolean active,
        int displayOrder,
        Instant createdAt,
        Instant updatedAt
) {
    public ParishLeader {
        Objects.requireNonNull(name, "name");
        Objects.requireNonNull(role, "role");
    }

    public ParishLeader(String id, String name, String role, boolean active, int displayOrder) {
        this(id, name, role, active, displayOrder, Instant.now(), Instant.now());
    }
}
