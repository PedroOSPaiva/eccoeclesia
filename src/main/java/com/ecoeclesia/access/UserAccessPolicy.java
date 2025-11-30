package com.ecoeclesia.access;

import java.util.EnumMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

/**
 * Encapsulates the authorization matrix used by the finance team. Actions are
 * represented as plain strings to avoid coupling to any specific HTTP layer.
 */
public final class UserAccessPolicy {

    private final Map<UserRole, Set<String>> permissions = new EnumMap<>(UserRole.class);

    public UserAccessPolicy() {
        permissions.put(UserRole.ADMIN, Set.of("users:write", "users:read", "finance:write", "finance:read"));
        permissions.put(UserRole.FINANCE, Set.of("finance:write", "finance:read"));
        permissions.put(UserRole.VOLUNTEER, Set.of("inventory:read", "expenses:write"));
    }

    public boolean isAllowed(UserRole role, String action) {
        Objects.requireNonNull(role, "role");
        Objects.requireNonNull(action, "action");
        return permissions.getOrDefault(role, Set.of()).contains(action);
    }

    public Set<String> permissionsFor(UserRole role) {
        Objects.requireNonNull(role, "role");
        return permissions.getOrDefault(role, Set.of());
    }
}
