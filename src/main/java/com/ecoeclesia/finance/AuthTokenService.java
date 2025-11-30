package com.ecoeclesia.finance;

import com.ecoeclesia.access.UserAccessPolicy;
import com.ecoeclesia.access.UserRole;
import com.ecoeclesia.user.CreateUserRequest;
import com.ecoeclesia.user.PasswordHasher;
import com.ecoeclesia.user.UserAccount;
import com.ecoeclesia.user.UserManagementController;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Serviço de emissão e validação de tokens que reaproveita o mesmo modelo de
 * usuários/roles do módulo de gestão de contas, evitando heurísticas e
 * garantindo que permissões reflitam exatamente o {@link UserAccessPolicy}.
 */
public final class AuthTokenService {

    private final Map<String, UserAccount> accessTokens = new ConcurrentHashMap<>();
    private final Map<String, UserAccount> refreshTokens = new ConcurrentHashMap<>();
    private final UserAccessPolicy accessPolicy = new UserAccessPolicy();
    private final UserManagementController users;
    private final SecureRandom random = new SecureRandom();

    public AuthTokenService() {
        this(new UserManagementController());
    }

    public AuthTokenService(UserManagementController users) {
        this.users = Objects.requireNonNull(users);
        seedDefaultAccounts();
    }

    public AuthTokens login(String email, String password) {
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            throw new IllegalArgumentException("Email e senha são obrigatórios");
        }
        UserAccount account = users.findAccountByEmail(email);
        if (account == null || !PasswordHasher.matches(password, account.getHashedPassword())) {
            throw new IllegalArgumentException("Credenciais inválidas");
        }
        return issueTokens(account);
    }

    public AuthTokens refresh(String refreshToken) {
        UserAccount account = refreshTokens.get(refreshToken);
        if (account == null) {
            throw new IllegalArgumentException("Refresh token inválido");
        }
        return issueTokens(account);
    }

    public boolean isAllowed(String authorizationHeader, String permission) {
        if (authorizationHeader == null || authorizationHeader.isBlank()) {
            return false;
        }
        String token = authorizationHeader.replace("Bearer", "").trim();
        UserAccount account = accessTokens.get(token);
        if (account == null) {
            return false;
        }
        return account.getRoles().stream().anyMatch(role -> accessPolicy.isAllowed(role, permission));
    }

    public Set<String> permissionsFor(String authorizationHeader) {
        if (authorizationHeader == null) {
            return Set.of();
        }
        String token = authorizationHeader.replace("Bearer", "").trim();
        UserAccount account = accessTokens.get(token);
        if (account == null) {
            return Set.of();
        }
        return aggregatePermissions(account.getRoles());
    }

    private AuthTokens issueTokens(UserAccount account) {
        String accessToken = randomToken();
        String refreshToken = UUID.randomUUID().toString();
        accessTokens.put(accessToken, account);
        refreshTokens.put(refreshToken, account);
        String primaryRole = account.getRoles().stream().findFirst().map(Enum::name).orElse(UserRole.VOLUNTEER.name());
        return new AuthTokens(accessToken, refreshToken, "Bearer", primaryRole, aggregatePermissions(account.getRoles()));
    }

    private Set<String> aggregatePermissions(Set<UserRole> roles) {
        return roles.stream()
                .flatMap(role -> accessPolicy.permissionsFor(role).stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    private void seedDefaultAccounts() {
        if (!users.listUsers().isEmpty()) {
            return;
        }
        users.createUser(new CreateUserRequest("admin@ecoeclesia.test", "admin123", List.of(UserRole.ADMIN)));
        users.createUser(new CreateUserRequest("tesouraria@ecoeclesia.test", "finance123", List.of(UserRole.FINANCE)));
        users.createUser(new CreateUserRequest("voluntario@ecoeclesia.test", "servir123", List.of(UserRole.VOLUNTEER)));
    }

    private String randomToken() {
        byte[] bytes = new byte[24];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
