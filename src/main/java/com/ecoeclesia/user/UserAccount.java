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
    private String email;
    private String hashedPassword;
    private String fullName;
    private String birthDate;
    private String address;
    private String photoUrl;
    private Instant passwordUpdatedAt;
    private boolean mustChangePassword;
    private final Set<UserRole> roles = new HashSet<>();
    private Instant updatedAt;

    public UserAccount(String email, String hashedPassword, Set<UserRole> roles) {
        this(UUID.randomUUID().toString(), email, hashedPassword, roles, null, null, null, null, Instant.now(), Instant.now(), true);
    }

    public UserAccount(String email, String hashedPassword, Set<UserRole> roles,
                       String fullName, String birthDate, String address, String photoUrl) {
        this(UUID.randomUUID().toString(), email, hashedPassword, roles, fullName, birthDate, address, photoUrl,
                Instant.now(), Instant.now(), true);
    }

    public UserAccount(String id, String email, String hashedPassword, Set<UserRole> roles,
                       String fullName, String birthDate, String address, String photoUrl,
                       Instant updatedAt, Instant passwordUpdatedAt, boolean mustChangePassword) {
        this.id = Objects.requireNonNull(id);
        this.email = Objects.requireNonNull(email);
        this.hashedPassword = Objects.requireNonNull(hashedPassword);
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.address = address;
        this.photoUrl = photoUrl;
        this.roles.addAll(roles);
        this.updatedAt = Objects.requireNonNull(updatedAt);
        this.passwordUpdatedAt = Objects.requireNonNull(passwordUpdatedAt);
        this.mustChangePassword = mustChangePassword;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public String getAddress() {
        return address;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public Instant getPasswordUpdatedAt() {
        return passwordUpdatedAt;
    }

    public boolean isMustChangePassword() {
        return mustChangePassword;
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
        this.passwordUpdatedAt = Instant.now();
        this.mustChangePassword = false;
    }

    public void updateProfile(String email, String fullName, String birthDate, String address, String photoUrl) {
        boolean changed = false;
        if (email != null) {
            this.email = email;
            changed = true;
        }
        if (fullName != null) {
            this.fullName = fullName;
            changed = true;
        }
        if (birthDate != null) {
            this.birthDate = birthDate;
            changed = true;
        }
        if (address != null) {
            this.address = address;
            changed = true;
        }
        if (photoUrl != null) {
            this.photoUrl = photoUrl;
            changed = true;
        }
        if (changed) {
            this.updatedAt = Instant.now();
        }
    }

    public void updateProfile(String email, String fullName, String birthDate, String address, String photoUrl) {
        boolean changed = false;
        if (email != null) {
            this.email = email;
            changed = true;
        }
        if (fullName != null) {
            this.fullName = fullName;
            changed = true;
        }
        if (birthDate != null) {
            this.birthDate = birthDate;
            changed = true;
        }
        if (address != null) {
            this.address = address;
            changed = true;
        }
        if (photoUrl != null) {
            this.photoUrl = photoUrl;
            changed = true;
        }
        if (changed) {
            this.updatedAt = Instant.now();
        }
    }

    public void replaceRoles(Set<UserRole> newRoles) {
        roles.clear();
        roles.addAll(newRoles);
        this.updatedAt = Instant.now();
    }

    public void requirePasswordChange() {
        this.mustChangePassword = true;
        this.updatedAt = Instant.now();
    }
}
