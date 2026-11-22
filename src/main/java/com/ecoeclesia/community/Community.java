package com.ecoeclesia.community;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

public record Community(String id, String name, String code, boolean isMainParish, Instant createdAt, Instant updatedAt) {
    public Community {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(name, "name");
        Objects.requireNonNull(code, "code");
    }

    public Community(String id, String name, String code, boolean isMainParish) {
        this(id, name, code, isMainParish, Instant.now(), Instant.now());
    }

    public static Community create(String name, String code, boolean isMainParish) {
        return new Community(UUID.randomUUID().toString(), name, code, isMainParish, Instant.now(), Instant.now());
    }
}
