package com.ecoeclesia.birthday;

import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

/**
 * Immutable representation of a community member with a known birth date.
 */
public record BirthdayPerson(String id, String name, LocalDate birthDate, String ministry, String contact) {

    public BirthdayPerson {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(name, "name");
        Objects.requireNonNull(birthDate, "birthDate");
    }

    public static BirthdayPerson create(String name, LocalDate birthDate, String ministry, String contact) {
        return new BirthdayPerson(UUID.randomUUID().toString(), name, birthDate, ministry, contact);
    }
}
