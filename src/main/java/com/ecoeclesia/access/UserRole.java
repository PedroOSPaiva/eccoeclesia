package com.ecoeclesia.access;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum UserRole {
    ADMIN,
    FINANCE,
    VOLUNTEER;

    @JsonCreator
    public static UserRole fromString(String value) {
        if (value == null || value.isBlank()) {
            return VOLUNTEER;
        }
        String upper = value.trim().toUpperCase();
        return switch (upper) {
            case "ADMIN" -> ADMIN;
            case "FINANCE", "TREASURER" -> FINANCE;
            case "VOLUNTEER", "PASTORAL" -> VOLUNTEER;
            default -> valueOf(upper);
        };
    }
}
