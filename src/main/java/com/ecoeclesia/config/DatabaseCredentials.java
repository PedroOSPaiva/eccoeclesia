package com.ecoeclesia.config;

/**
 * Small immutable container describing how the application should connect to a
 * database. The resolver only fills the username/password fields when the
 * connection string contains them explicitly; otherwise the values are left as
 * {@code null} so that the caller can fall back to environment variables.
 */
public record DatabaseCredentials(String jdbcUrl, String username, String password) {
}
