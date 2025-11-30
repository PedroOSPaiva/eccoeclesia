package com.ecoeclesia.finance;

import com.ecoeclesia.access.UserAccessPolicy;
import com.ecoeclesia.access.UserRole;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Serviço muito simples de emissão e validação de tokens para proteger os
 * endpoints do razão enquanto o stack oficial não chega. Cada token é
 * associado a um {@link UserRole} e validado contra a {@link UserAccessPolicy}.
 */
public final class AuthTokenService {

    private final Map<String, UserRole> accessTokens = new ConcurrentHashMap<>();
    private final Map<String, UserRole> refreshTokens = new ConcurrentHashMap<>();
    private final UserAccessPolicy accessPolicy = new UserAccessPolicy();
    private final SecureRandom random = new SecureRandom();

    public AuthTokens login(String email, String password) {
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            throw new IllegalArgumentException("Email e senha são obrigatórios");
        }
        UserRole role = resolveRole(email);
        return issueTokens(role);
    }

    public AuthTokens refresh(String refreshToken) {
        UserRole role = refreshTokens.get(refreshToken);
        if (role == null) {
            throw new IllegalArgumentException("Refresh token inválido");
        }
        return issueTokens(role);
    }

    public boolean isAllowed(String authorizationHeader, String permission) {
        if (authorizationHeader == null || authorizationHeader.isBlank()) {
            return false;
        }
        String token = authorizationHeader.replace("Bearer", "").trim();
        UserRole role = accessTokens.get(token);
        return role != null && accessPolicy.isAllowed(role, permission);
    }

    public Set<String> permissionsFor(String authorizationHeader) {
        if (authorizationHeader == null) {
            return Set.of();
        }
        String token = authorizationHeader.replace("Bearer", "").trim();
        UserRole role = accessTokens.get(token);
        if (role == null) {
            return Set.of();
        }
        return rolePermissions(role);
    }

    private AuthTokens issueTokens(UserRole role) {
        String accessToken = randomToken();
        String refreshToken = UUID.randomUUID().toString();
        accessTokens.put(accessToken, role);
        refreshTokens.put(refreshToken, role);
        return new AuthTokens(accessToken, refreshToken, "Bearer", role.name(), rolePermissions(role));
    }

    private Set<String> rolePermissions(UserRole role) {
        return accessPolicy == null
                ? Set.of()
                : accessPolicyPermissions(role);
    }

    private Set<String> accessPolicyPermissions(UserRole role) {
        return accessPolicy == null ? Set.of() : accessPolicyPermissionsInternal(role);
    }

    private Set<String> accessPolicyPermissionsInternal(UserRole role) {
        return switch (Objects.requireNonNull(role)) {
            case ADMIN -> Set.of("users:write", "users:read", "finance:write", "finance:read");
            case FINANCE -> Set.of("finance:write", "finance:read");
            case VOLUNTEER -> Set.of("inventory:read", "expenses:write");
        };
    }

    private UserRole resolveRole(String email) {
        String normalized = email.toLowerCase();
        if (normalized.contains("admin")) {
            return UserRole.ADMIN;
        }
        if (normalized.contains("tesour") || normalized.contains("finance")) {
            return UserRole.FINANCE;
        }
        return UserRole.VOLUNTEER;
    }

    private String randomToken() {
        byte[] bytes = new byte[24];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
