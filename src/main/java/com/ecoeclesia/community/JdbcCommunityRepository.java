package com.ecoeclesia.community;

import javax.sql.DataSource;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class JdbcCommunityRepository implements CommunityRepository {

    private final DataSource dataSource;

    public JdbcCommunityRepository(DataSource dataSource) {
        this.dataSource = Objects.requireNonNull(dataSource, "dataSource");
    }

    @Override
    public Community save(Community community) {
        Objects.requireNonNull(community, "community");
        UUID id = toUuid(community.id());

        String sql = "INSERT INTO communities (id, name, code, is_main_parish, created_at, updated_at) " +
                "VALUES (?::uuid, ?, ?, ?, ?, now()) " +
                "ON CONFLICT (id) DO UPDATE SET " +
                "name = EXCLUDED.name, " +
                "code = EXCLUDED.code, " +
                "is_main_parish = EXCLUDED.is_main_parish, " +
                "updated_at = now()";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id.toString());
            ps.setString(2, community.name());
            ps.setString(3, community.code());
            ps.setBoolean(4, community.isMainParish());
            ps.setTimestamp(5, Timestamp.from(community.createdAt() != null ? community.createdAt() : Instant.now()));
            ps.executeUpdate();
            return community;
        } catch (SQLException ex) {
            throw new IllegalStateException("Falha ao salvar comunidade: " + community.id(), ex);
        }
    }

    @Override
    public Optional<Community> findById(String id) {
        if (id == null || id.isBlank()) return Optional.empty();
        UUID uuid = toUuid(id);
        String sql = "SELECT id, name, code, is_main_parish, created_at, updated_at FROM communities WHERE id = ?::uuid";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return Optional.of(mapRow(rs));
                return Optional.empty();
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar comunidade por id: " + id, ex);
        }
    }

    @Override
    public Optional<Community> findByCode(String code) {
        if (code == null || code.isBlank()) return Optional.empty();
        String sql = "SELECT id, name, code, is_main_parish, created_at, updated_at FROM communities WHERE UPPER(code) = UPPER(?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, code.trim());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return Optional.of(mapRow(rs));
                return Optional.empty();
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar comunidade por código: " + code, ex);
        }
    }

    @Override
    public Optional<Community> findMainParish() {
        String sql = "SELECT id, name, code, is_main_parish, created_at, updated_at FROM communities WHERE is_main_parish = true LIMIT 1";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) return Optional.of(mapRow(rs));
            return Optional.empty();
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar comunidade Matriz", ex);
        }
    }

    @Override
    public List<Community> findAll() {
        String sql = "SELECT id, name, code, is_main_parish, created_at, updated_at FROM communities ORDER BY is_main_parish DESC, name ASC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<Community> communities = new ArrayList<>();
            while (rs.next()) {
                communities.add(mapRow(rs));
            }
            return communities;
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao listar comunidades", ex);
        }
    }

    private Community mapRow(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String name = rs.getString("name");
        String code = rs.getString("code");
        boolean isMainParish = rs.getBoolean("is_main_parish");
        Timestamp createdAt = rs.getTimestamp("created_at");
        Timestamp updatedAt = rs.getTimestamp("updated_at");

        return new Community(
                id,
                name,
                code,
                isMainParish,
                createdAt != null ? createdAt.toInstant() : Instant.now(),
                updatedAt != null ? updatedAt.toInstant() : Instant.now()
        );
    }

    private UUID toUuid(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException ex) {
            return UUID.nameUUIDFromBytes(id.getBytes(StandardCharsets.UTF_8));
        }
    }
}
