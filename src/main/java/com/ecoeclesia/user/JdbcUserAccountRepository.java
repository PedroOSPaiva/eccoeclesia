package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;

import javax.sql.DataSource;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.util.*;

/**
 * Repositório JDBC conectado ao PostgreSQL (tabelas 'users' e 'user_roles').
 */
public class JdbcUserAccountRepository implements UserAccountRepository {

    private final DataSource dataSource;

    public JdbcUserAccountRepository(DataSource dataSource) {
        this.dataSource = Objects.requireNonNull(dataSource, "dataSource");
    }

    @Override
    public UserAccount save(UserAccount account) {
        Objects.requireNonNull(account, "account");
        UUID userUuid = toUuid(account.getId());

        String upsertUserSql = "INSERT INTO users (id, email, password) " +
                "VALUES (?::uuid, ?, ?) " +
                "ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, password = EXCLUDED.password";

        String deleteRolesSql = "DELETE FROM user_roles WHERE user_id = ?::uuid";
        String insertRoleSql = "INSERT INTO user_roles (user_id, role) " +
                "VALUES (?::uuid, ?) ON CONFLICT (user_id, role) DO NOTHING";

        try (Connection conn = dataSource.getConnection()) {
            boolean autoCommit = conn.getAutoCommit();
            conn.setAutoCommit(false);
            try {
                try (PreparedStatement ps = conn.prepareStatement(upsertUserSql)) {
                    ps.setString(1, userUuid.toString());
                    ps.setString(2, account.getEmail());
                    ps.setString(3, account.getHashedPassword());
                    ps.executeUpdate();
                }

                try (PreparedStatement ps = conn.prepareStatement(deleteRolesSql)) {
                    ps.setString(1, userUuid.toString());
                    ps.executeUpdate();
                }

                if (!account.getRoles().isEmpty()) {
                    try (PreparedStatement ps = conn.prepareStatement(insertRoleSql)) {
                        for (UserRole role : account.getRoles()) {
                            ps.setString(1, userUuid.toString());
                            ps.setString(2, role.name());
                            ps.addBatch();
                        }
                        ps.executeBatch();
                    }
                }

                conn.commit();
                return account;
            } catch (SQLException ex) {
                conn.rollback();
                throw new IllegalStateException("Falha ao salvar usuário: " + account.getEmail(), ex);
            } finally {
                conn.setAutoCommit(autoCommit);
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro de conexão ao salvar usuário", ex);
        }
    }

    @Override
    public Optional<UserAccount> findById(String id) {
        if (id == null || id.isBlank()) {
            return Optional.empty();
        }
        UUID userUuid = toUuid(id);
        String sql = "SELECT u.id, u.email, u.password, r.role " +
                "FROM users u " +
                "LEFT JOIN user_roles r ON u.id = r.user_id " +
                "WHERE u.id = ?::uuid";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, userUuid.toString());
            try (ResultSet rs = ps.executeQuery()) {
                return mapSingleUser(rs);
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar usuário por id: " + id, ex);
        }
    }

    @Override
    public Optional<UserAccount> findByEmail(String email) {
        if (email == null || email.isBlank()) {
            return Optional.empty();
        }
        String sql = "SELECT u.id, u.email, u.password, r.role " +
                "FROM users u " +
                "LEFT JOIN user_roles r ON u.id = r.user_id " +
                "WHERE LOWER(u.email) = LOWER(?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email.trim());
            try (ResultSet rs = ps.executeQuery()) {
                return mapSingleUser(rs);
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar usuário por email: " + email, ex);
        }
    }

    @Override
    public List<UserAccount> findAll() {
        String sql = "SELECT u.id, u.email, u.password, r.role " +
                "FROM users u " +
                "LEFT JOIN user_roles r ON u.id = r.user_id " +
                "ORDER BY u.email";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            Map<String, UserBuilder> builders = new LinkedHashMap<>();
            while (rs.next()) {
                String id = rs.getString("id");
                String email = rs.getString("email");
                String password = rs.getString("password");
                String roleStr = rs.getString("role");

                UserBuilder builder = builders.computeIfAbsent(id, k -> new UserBuilder(id, email, password));
                if (roleStr != null && !roleStr.isBlank()) {
                    try {
                        builder.roles.add(UserRole.valueOf(roleStr.trim().toUpperCase(Locale.ROOT)));
                    } catch (IllegalArgumentException ignored) {
                    }
                }
            }

            List<UserAccount> result = new ArrayList<>();
            for (UserBuilder b : builders.values()) {
                result.add(b.build());
            }
            return result;
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao listar usuários do banco", ex);
        }
    }

    @Override
    public void deleteById(String id) {
        if (id == null || id.isBlank()) {
            return;
        }
        UUID userUuid = toUuid(id);
        String sql = "DELETE FROM users WHERE id = ?::uuid";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, userUuid.toString());
            ps.executeUpdate();
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao remover usuário por id: " + id, ex);
        }
    }

    @Override
    public boolean existsByEmail(String email) {
        if (email == null || email.isBlank()) {
            return false;
        }
        String sql = "SELECT 1 FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email.trim());
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao verificar existência de email: " + email, ex);
        }
    }

    private Optional<UserAccount> mapSingleUser(ResultSet rs) throws SQLException {
        String id = null;
        String email = null;
        String password = null;
        Set<UserRole> roles = new HashSet<>();

        while (rs.next()) {
            if (id == null) {
                id = rs.getString("id");
                email = rs.getString("email");
                password = rs.getString("password");
            }
            String roleStr = rs.getString("role");
            if (roleStr != null && !roleStr.isBlank()) {
                try {
                    roles.add(UserRole.valueOf(roleStr.trim().toUpperCase(Locale.ROOT)));
                } catch (IllegalArgumentException ignored) {
                }
            }
        }

        if (id == null) {
            return Optional.empty();
        }

        return Optional.of(new UserAccount(
                id,
                email,
                password,
                roles,
                email, // Nome padrão inicial para evitar null
                null,
                null,
                null,
                Instant.now(),
                Instant.now(),
                false // Usuários persistidos no banco não são obrigados a trocar senha imediatamente
        ));
    }

    private UUID toUuid(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException ex) {
            return UUID.nameUUIDFromBytes(id.getBytes(StandardCharsets.UTF_8));
        }
    }

    private static class UserBuilder {
        final String id;
        final String email;
        final String password;
        final Set<UserRole> roles = new HashSet<>();

        UserBuilder(String id, String email, String password) {
            this.id = id;
            this.email = email;
            this.password = password;
        }

        UserAccount build() {
            return new UserAccount(
                    id,
                    email,
                    password,
                    roles,
                    email,
                    null,
                    null,
                    null,
                    Instant.now(),
                    Instant.now(),
                    false
            );
        }
    }
}

