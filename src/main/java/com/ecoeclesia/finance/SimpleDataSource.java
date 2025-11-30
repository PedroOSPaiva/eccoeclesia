package com.ecoeclesia.finance;

import javax.sql.DataSource;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Objects;
import java.util.logging.Logger;

/**
 * Minimal {@link DataSource} powered by {@link DriverManager}, avoiding
 * external dependencies while allowing a real Postgres URL when disponível.
 */
final class SimpleDataSource implements DataSource {

    private final String url;
    private final String user;
    private final String password;

    SimpleDataSource(String url, String user, String password) {
        this.url = Objects.requireNonNull(url);
        this.user = user;
        this.password = password;
    }

    @Override
    public Connection getConnection() throws SQLException {
        if (user == null) {
            return DriverManager.getConnection(url);
        }
        return DriverManager.getConnection(url, user, password);
    }

    @Override
    public Connection getConnection(String username, String password) throws SQLException {
        return DriverManager.getConnection(url, username, password);
    }

    @Override
    public PrintWriter getLogWriter() {
        return new PrintWriter(System.out);
    }

    @Override
    public void setLogWriter(PrintWriter out) {
        // ignored
    }

    @Override
    public void setLoginTimeout(int seconds) {
        // ignored
    }

    @Override
    public int getLoginTimeout() {
        return 0;
    }

    @Override
    public Logger getParentLogger() {
        return Logger.getGlobal();
    }

    @Override
    public <T> T unwrap(Class<T> iface) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isWrapperFor(Class<?> iface) {
        return false;
    }
}
