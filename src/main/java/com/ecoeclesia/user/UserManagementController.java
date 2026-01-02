package com.ecoeclesia.user;

import com.ecoeclesia.access.UserAccessPolicy;
import com.ecoeclesia.access.UserRole;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ecoeclesia.user.PasswordHasher.hash;

public final class UserManagementController {

    private final Map<String, UserAccount> accounts = new HashMap<>();
    private final UserAccessPolicy accessPolicy = new UserAccessPolicy();

    public UserAccountResponse createUser(CreateUserRequest request) {
        Objects.requireNonNull(request, "request");
        if (accounts.values().stream().anyMatch(user -> user.getEmail().equalsIgnoreCase(request.email()))) {
            throw new IllegalArgumentException("Email already registered");
        }
        UserAccount account = new UserAccount(
                request.email(),
                hash(request.password()),
                Set.copyOf(request.roles()),
                request.fullName(),
                request.birthDate(),
                request.address(),
                request.photoUrl());
        accounts.put(account.getId(), account);
        return UserAccountResponse.from(account, permissionsFor(account.getRoles()));
    }

    public List<UserAccountResponse> listUsers() {
        return accounts.values().stream()
                .map(account -> UserAccountResponse.from(account, permissionsFor(account.getRoles())))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public UserAccountResponse updatePassword(String id, UpdateUserPasswordRequest request) {
        UserAccount account = requireAccount(id);
        account.updatePassword(hash(request.password()));
        return UserAccountResponse.from(account, permissionsFor(account.getRoles()));
    }

    public UserAccountResponse updateRoles(String id, UpdateUserRolesRequest request) {
        UserAccount account = requireAccount(id);
        account.replaceRoles(Set.copyOf(request.roles()));
        return UserAccountResponse.from(account, permissionsFor(account.getRoles()));
    }

    public UserAccountResponse updateProfile(String id, UpdateUserProfileRequest request) {
        Objects.requireNonNull(request, "request");
        UserAccount account = requireAccount(id);
        String nextEmail = normalize(request.email());
        if (nextEmail != null && accounts.values().stream()
                .anyMatch(user -> !user.getId().equals(id) && user.getEmail().equalsIgnoreCase(nextEmail))) {
            throw new IllegalArgumentException("Email already registered");
        }
        account.updateProfile(
                nextEmail,
                normalize(request.fullName()),
                normalize(request.birthDate()),
                normalize(request.address()),
                normalize(request.photoUrl()));
        return UserAccountResponse.from(account, permissionsFor(account.getRoles()));
    }

    public UserAccount findAccountByEmail(String email) {
        return accounts.values().stream()
                .filter(user -> user.getEmail().equalsIgnoreCase(email))
                .findFirst()
                .orElse(null);
    }

    public boolean credentialsMatch(String email, String rawPassword) {
        UserAccount account = findAccountByEmail(email);
        if (account == null) {
            return false;
        }
        return PasswordHasher.matches(rawPassword, account.getHashedPassword());
    }

    private UserAccount requireAccount(String id) {
        UserAccount account = accounts.get(id);
        if (account == null) {
            throw new IllegalArgumentException("User not found: " + id);
        }
        return account;
    }

    private static String hash(String value) {
        return PasswordHasher.hash(value);
    }

    private Set<String> permissionsFor(Set<UserRole> roles) {
        return roles.stream()
                .flatMap(role -> accessPolicy.permissionsFor(role).stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    private static String normalize(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isBlank() ? null : trimmed;
    }
}
