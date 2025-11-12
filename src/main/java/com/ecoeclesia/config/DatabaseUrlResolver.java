package com.ecoeclesia.config;

import java.net.URI;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;

/**
 * Utility that adapts Postgres connection URLs exposed by hosting providers (for example Railway).
 * Those providers frequently export URLs in the form "postgres://user:password@host:port/db?param=value".
 * Spring expects JDBC URLs, so we normalize the string and expose parsed credentials when they are embedded
 * in the URI.
 */
final class DatabaseUrlResolver {

    private DatabaseUrlResolver() {
        // utility class
    }

    static Optional<JdbcCredentials> resolve(String rawUrl) {
        if (rawUrl == null || rawUrl.isBlank()) {
            return Optional.empty();
        }

        final String normalized = rawUrl.trim();
        if (normalized.toLowerCase(Locale.ROOT).startsWith("jdbc:")) {
            return Optional.of(new JdbcCredentials(normalized, null, null));
        }

        if (!normalized.toLowerCase(Locale.ROOT).startsWith("postgres://")
                && !normalized.toLowerCase(Locale.ROOT).startsWith("postgresql://")) {
            return Optional.empty();
        }

        URI uri = URI.create(normalized);
        String host = Objects.requireNonNull(uri.getHost(), "DATABASE_URL must contain a host");
        int port = uri.getPort() == -1 ? 5432 : uri.getPort();

        String path = Objects.requireNonNull(uri.getPath(), "DATABASE_URL must contain a database name");
        if (path.isBlank() || "/".equals(path)) {
            throw new IllegalArgumentException("DATABASE_URL must include a database name");
        }
        String database = path.startsWith("/") ? path.substring(1) : path;

        StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://")
                .append(host)
                .append(":")
                .append(port)
                .append("/")
                .append(database);
        String query = uri.getQuery();
        if (query != null && !query.isBlank()) {
            jdbcUrl.append("?").append(query);
        }

        String userInfo = uri.getUserInfo();
        String username = null;
        String password = null;
        if (userInfo != null && !userInfo.isBlank()) {
            String[] parts = userInfo.split(":", 2);
            username = parts[0];
            if (parts.length > 1) {
                password = parts[1];
            }
        }

        return Optional.of(new JdbcCredentials(jdbcUrl.toString(), username, password));
    }

    record JdbcCredentials(String jdbcUrl, String username, String password) {
    }
}
