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
import java.util.Optional;
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

    private static final long PASSWORD_MAX_AGE_DAYS = 120;
    private final Map<String, UserAccount> accessTokens = new ConcurrentHashMap<>();
    private final Map<String, UserAccount> refreshTokens = new ConcurrentHashMap<>();
    private final UserAccessPolicy accessPolicy = new UserAccessPolicy();
    private final UserManagementController users;
    private final SecureRandom random = new SecureRandom();

    public AuthTokenService() {
        this(new UserManagementController(), loadSeedUsersFromEnv());
    }

    public AuthTokenService(UserManagementController users) {
        this(users, loadSeedUsersFromEnv());
    }

    public AuthTokenService(UserManagementController users, List<CreateUserRequest> seedUsers) {
        this.users = Objects.requireNonNull(users);
        seedDefaultAccounts(seedUsers);
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
        PasswordStatus passwordStatus = passwordStatus(account);
        return new AuthTokens(accessToken, refreshToken, "Bearer", primaryRole, aggregatePermissions(account.getRoles()),
                passwordStatus.mustChangePassword(), passwordStatus.daysUntilExpiry(), passwordStatus.expiresAt());
    }

    private Set<String> aggregatePermissions(Set<UserRole> roles) {
        return roles.stream()
                .flatMap(role -> accessPolicy.permissionsFor(role).stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    private void seedDefaultAccounts(List<CreateUserRequest> seedUsers) {
        if (!users.listUsers().isEmpty()) {
            return;
        }
        if (seedUsers == null || seedUsers.isEmpty()) {
            return;
        }
        seedUsers.forEach(users::createUser);
    }

    private String randomToken() {
        byte[] bytes = new byte[24];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private static List<CreateUserRequest> loadSeedUsersFromEnv() {
        String raw = Optional.ofNullable(System.getenv("ECOECCLESIA_SEED_USERS")).orElse("").trim();
        if (raw.isBlank()) {
            return List.of();
        }
        return List.of(raw.split(";")).stream()
                .map(String::trim)
                .filter(entry -> !entry.isBlank())
                .map(AuthTokenService::parseSeedUser)
                .collect(Collectors.toList());
    }

    private static CreateUserRequest parseSeedUser(String entry) {
        String[] parts = entry.split("\\|");
        if (parts.length < 3) {
            throw new IllegalArgumentException("Seed users devem seguir o formato email|senha|ROLE[,ROLE]");
        }
        String email = parts[0].trim();
        String password = parts[1].trim();
        if (email.isBlank() || password.isBlank()) {
            throw new IllegalArgumentException("Seed users requerem email e senha não vazios");
        }
        List<UserRole> roles = List.of(parts[2].split(",")).stream()
                .map(String::trim)
                .filter(role -> !role.isBlank())
                .map(role -> UserRole.valueOf(role.toUpperCase()))
                .collect(Collectors.toList());
        if (roles.isEmpty()) {
            throw new IllegalArgumentException("Seed users requerem ao menos um role válido");
        }
        return new CreateUserRequest(email, password, roles, null, null, null, null);
    }

    public UserAccount accountFor(String authorizationHeader) {
        if (authorizationHeader == null || authorizationHeader.isBlank()) {
            return null;
        }
        String token = authorizationHeader.replace("Bearer", "").trim();
        return accessTokens.get(token);
    }

    public void changePassword(String authorizationHeader, String newPassword) {
        if (newPassword == null || newPassword.isBlank()) {
            throw new IllegalArgumentException("Senha é obrigatória");
        }
        UserAccount account = accountFor(authorizationHeader);
        if (account == null) {
            throw new IllegalArgumentException("Token inválido");
        }
        users.updatePassword(account.getId(), new com.ecoeclesia.user.UpdateUserPasswordRequest(newPassword));
    }

    private PasswordStatus passwordStatus(UserAccount account) {
        boolean mustChange = account.isMustChangePassword();
        java.time.Instant updatedAt = account.getPasswordUpdatedAt();
        java.time.LocalDate updatedDate = updatedAt.atZone(java.time.ZoneId.systemDefault()).toLocalDate();
        java.time.LocalDate expiresAt = updatedDate.plusDays(PASSWORD_MAX_AGE_DAYS);
        long daysUntilExpiry = java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.now(), expiresAt);
        if (daysUntilExpiry <= 0) {
            mustChange = true;
            daysUntilExpiry = 0;
        }
        return new PasswordStatus(mustChange, daysUntilExpiry, expiresAt.toString());
    }

    private record PasswordStatus(boolean mustChangePassword, long daysUntilExpiry, String expiresAt) {
    }
}
