package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public final class UserManagementController {

    private final Map<String, UserAccount> accounts = new HashMap<>();

    public UserAccountResponse createUser(CreateUserRequest request) {
        Objects.requireNonNull(request, "request");
        if (accounts.values().stream().anyMatch(user -> user.getEmail().equalsIgnoreCase(request.email()))) {
            throw new IllegalArgumentException("Email already registered");
        }
        UserAccount account = new UserAccount(request.email(), hash(request.password()), Set.copyOf(request.roles()));
        accounts.put(account.getId(), account);
        return UserAccountResponse.from(account);
    }

    public List<UserAccountResponse> listUsers() {
        return accounts.values().stream().map(UserAccountResponse::from).collect(Collectors.toCollection(ArrayList::new));
    }

    public UserAccountResponse updatePassword(String id, UpdateUserPasswordRequest request) {
        UserAccount account = requireAccount(id);
        account.updatePassword(hash(request.password()));
        return UserAccountResponse.from(account);
    }

    public UserAccountResponse updateRoles(String id, UpdateUserRolesRequest request) {
        UserAccount account = requireAccount(id);
        account.replaceRoles(Set.copyOf(request.roles()));
        return UserAccountResponse.from(account);
    }

    private UserAccount requireAccount(String id) {
        UserAccount account = accounts.get(id);
        if (account == null) {
            throw new IllegalArgumentException("User not found: " + id);
        }
        return account;
    }

    private static String hash(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashed = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }
}
