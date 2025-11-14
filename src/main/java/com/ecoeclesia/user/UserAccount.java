package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import java.time.Instant;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

public final class UserAccount {
    private final String id;
    private final String email;
    private String hashedPassword;
    private final Set<UserRole> roles = new HashSet<>();
    private Instant updatedAt;

    public UserAccount(String email, String hashedPassword, Set<UserRole> roles) {
        this(UUID.randomUUID().toString(), email, hashedPassword, roles, Instant.now());
    }

    public UserAccount(String id, String email, String hashedPassword, Set<UserRole> roles, Instant updatedAt) {
        this.id = Objects.requireNonNull(id);
        this.email = Objects.requireNonNull(email);
        this.hashedPassword = Objects.requireNonNull(hashedPassword);
        this.roles.addAll(roles);
        this.updatedAt = Objects.requireNonNull(updatedAt);
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public Set<UserRole> getRoles() {
        return Collections.unmodifiableSet(roles);
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void updatePassword(String hashedPassword) {
        this.hashedPassword = Objects.requireNonNull(hashedPassword);
        this.updatedAt = Instant.now();
    }

    public void replaceRoles(Set<UserRole> newRoles) {
        roles.clear();
        roles.addAll(newRoles);
        this.updatedAt = Instant.now();
    }
}
