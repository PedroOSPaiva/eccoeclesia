package com.ecoeclesia.finance;

import com.ecoeclesia.access.UserRole;
import com.ecoeclesia.user.CreateUserRequest;
import com.ecoeclesia.user.UpdateUserPasswordRequest;
import com.ecoeclesia.user.UpdateUserProfileRequest;
import com.ecoeclesia.user.UpdateUserRolesRequest;
import com.ecoeclesia.user.UserAccountResponse;
import com.ecoeclesia.user.UserManagementController;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

final class UsersHandler implements HttpHandler {

    private final AuthTokenService authTokenService;
    private final UserManagementController users;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;

    UsersHandler(AuthTokenService authTokenService, UserManagementController users,
                 FinanceHttpResponseWriter responseWriter, FinanceHttpJson json) {
        this.authTokenService = authTokenService;
        this.users = users;
        this.responseWriter = responseWriter;
        this.json = json;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String path = exchange.getRequestURI().getPath();
        if (path == null || !path.startsWith("/api/users")) {
            responseWriter.writeJson(exchange, 404, "{\"error\":\"Not found\"}");
            return;
        }
        if ("/api/users".equals(path)) {
            handleCollection(exchange);
            return;
        }
        handleItem(exchange, path);
    }

    private void handleCollection(HttpExchange exchange) throws IOException {
        if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            if (!isAllowed(exchange, "users:read")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            List<UserAccountResponse> usersResponse = users.listUsers();
            responseWriter.writeJson(exchange, 200, json.users(usersResponse));
            return;
        }
        if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            if (!isAllowed(exchange, "users:write")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Map<String, String> values = FinanceSimpleJsonParser.parse(body);
            try {
                List<UserRole> roles = parseRoles(values.get("roles"));
                UserAccountResponse created = users.createUser(new CreateUserRequest(
                        values.get("email"),
                        values.get("password"),
                        roles,
                        values.get("fullName"),
                        values.get("birthDate"),
                        values.get("address"),
                        values.get("photoUrl")));
                responseWriter.writeJson(exchange, 201, json.user(created));
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }
        responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
    }

    private void handleItem(HttpExchange exchange, String path) throws IOException {
        String[] parts = path.substring("/api/users/".length()).split("/");
        if (parts.length < 2) {
            responseWriter.writeJson(exchange, 404, "{\"error\":\"Not found\"}");
            return;
        }
        String userId = parts[0];
        String action = parts[1];
        if (!"PUT".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        if (!isAllowed(exchange, "users:write")) {
            responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
            return;
        }
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, String> values = FinanceSimpleJsonParser.parse(body);
        try {
            UserAccountResponse updated = switch (action) {
                case "roles" -> users.updateRoles(userId, new UpdateUserRolesRequest(parseRoles(values.get("roles"))));
                case "password" -> users.updatePassword(userId, new UpdateUserPasswordRequest(values.get("password")));
                case "profile" -> users.updateProfile(userId, new UpdateUserProfileRequest(
                        values.get("email"),
                        values.get("fullName"),
                        values.get("birthDate"),
                        values.get("address"),
                        values.get("photoUrl")));
                default -> null;
            };
            if (updated == null) {
                responseWriter.writeJson(exchange, 404, "{\"error\":\"Not found\"}");
                return;
            }
            responseWriter.writeJson(exchange, 200, json.user(updated));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }

    private List<UserRole> parseRoles(String raw) {
        if (raw == null || raw.isBlank()) {
            return List.of(UserRole.VOLUNTEER);
        }
        String cleaned = raw.trim();
        if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
            cleaned = cleaned.substring(1, cleaned.length() - 1);
        }
        if (cleaned.isBlank()) {
            return List.of(UserRole.VOLUNTEER);
        }
        return Arrays.stream(cleaned.split(","))
                .map(String::trim)
                .map(this::stripQuotes)
                .filter(value -> !value.isBlank())
                .map(value -> UserRole.valueOf(value.toUpperCase(Locale.ROOT)))
                .collect(Collectors.toList());
    }

    private String stripQuotes(String value) {
        String trimmed = value.trim();
        if (trimmed.startsWith("\"") && trimmed.endsWith("\"") && trimmed.length() > 1) {
            return trimmed.substring(1, trimmed.length() - 1);
        }
        return trimmed;
    }
}
