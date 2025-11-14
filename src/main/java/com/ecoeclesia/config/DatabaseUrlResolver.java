package com.ecoeclesia.config;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Locale;
import java.util.Optional;

/**
 * Utility responsible for converting Postgres style connection strings (the
 * format used by hosting providers) into the standard JDBC representation that
 * {@code java.sql.DriverManager} expects.
 */
public final class DatabaseUrlResolver {

    private DatabaseUrlResolver() {
    }

    public static Optional<DatabaseCredentials> resolve(String rawUrl) {
        if (rawUrl == null || rawUrl.isBlank()) {
            return Optional.empty();
        }

        if (rawUrl.startsWith("jdbc:")) {
            return Optional.of(new DatabaseCredentials(rawUrl, null, null));
        }

        String normalized = rawUrl.trim().toLowerCase(Locale.ROOT);
        if (!normalized.startsWith("postgres") && !normalized.startsWith("postgresql")) {
            return Optional.empty();
        }

        try {
            URI uri = new URI(rawUrl);
            String path = uri.getPath();
            if (path == null || path.length() <= 1) {
                throw new IllegalArgumentException("Connection string must include the database name");
            }
            String database = path.substring(1);
            int port = uri.getPort() > 0 ? uri.getPort() : 5432;
            String query = uri.getQuery();
            StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://")
                    .append(uri.getHost())
                    .append(":" + port)
                    .append("/" + database);
            if (query != null && !query.isBlank()) {
                jdbcUrl.append("?" + query);
            }

            String userInfo = uri.getUserInfo();
            String username = null;
            String password = null;
            if (userInfo != null) {
                int separator = userInfo.indexOf(':');
                if (separator < 0) {
                    username = userInfo;
                } else {
                    username = userInfo.substring(0, separator);
                    password = userInfo.substring(separator + 1);
                }
            }
            return Optional.of(new DatabaseCredentials(jdbcUrl.toString(), username, password));
        } catch (URISyntaxException ex) {
            throw new IllegalArgumentException("Invalid database url: " + rawUrl, ex);
        }
    }
}
