package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ecoeclesia.user.PasswordHasher.hash;

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
}
