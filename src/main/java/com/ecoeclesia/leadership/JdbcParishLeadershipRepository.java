package com.ecoeclesia.leadership;

import javax.sql.DataSource;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class JdbcParishLeadershipRepository implements ParishLeadershipRepository {

    private final DataSource dataSource;

    public JdbcParishLeadershipRepository(DataSource dataSource) {
        this.dataSource = Objects.requireNonNull(dataSource, "dataSource");
    }

    @Override
    public List<ParishLeader> findAll() {
        String sql = "SELECT id, name, role, active, display_order, created_at, updated_at FROM parish_leadership ORDER BY display_order ASC, name ASC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<ParishLeader> list = new ArrayList<>();
            while (rs.next()) {
                list.add(mapRow(rs));
            }
            return list;
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao listar liderança paroquial", ex);
        }
    }

    @Override
    public List<ParishLeader> findAllActive() {
        String sql = "SELECT id, name, role, active, display_order, created_at, updated_at FROM parish_leadership WHERE active = true ORDER BY display_order ASC, name ASC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<ParishLeader> list = new ArrayList<>();
            while (rs.next()) {
                list.add(mapRow(rs));
            }
            return list;
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao listar líderes paroquiais ativos", ex);
        }
    }

    @Override
    public Optional<ParishLeader> findById(String id) {
        if (id == null || id.isBlank()) return Optional.empty();
        UUID uuid = toUuid(id);
        String sql = "SELECT id, name, role, active, display_order, created_at, updated_at FROM parish_leadership WHERE id = ?::uuid";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return Optional.of(mapRow(rs));
                return Optional.empty();
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar líder por id: " + id, ex);
        }
    }

    @Override
    public ParishLeader save(ParishLeader leader) {
        Objects.requireNonNull(leader, "leader");
        UUID id = leader.id() != null && !leader.id().isBlank() ? toUuid(leader.id()) : UUID.randomUUID();

        String sql = "INSERT INTO parish_leadership (id, name, role, active, display_order, created_at, updated_at) " +
                "VALUES (?::uuid, ?, ?, ?, ?, ?, now()) " +
                "ON CONFLICT (id) DO UPDATE SET " +
                "name = EXCLUDED.name, " +
                "role = EXCLUDED.role, " +
                "active = EXCLUDED.active, " +
                "display_order = EXCLUDED.display_order, " +
                "updated_at = now()";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id.toString());
            ps.setString(2, leader.name());
            ps.setString(3, leader.role());
            ps.setBoolean(4, leader.active());
            ps.setInt(5, leader.displayOrder());
            ps.setTimestamp(6, Timestamp.from(leader.createdAt() != null ? leader.createdAt() : Instant.now()));
            ps.executeUpdate();
            return new ParishLeader(id.toString(), leader.name(), leader.role(), leader.active(), leader.displayOrder(), leader.createdAt(), Instant.now());
        } catch (SQLException ex) {
            throw new IllegalStateException("Falha ao salvar líder paroquial: " + leader.name(), ex);
        }
    }

    @Override
    public void deleteById(String id) {
        if (id == null || id.isBlank()) return;
        UUID uuid = toUuid(id);
        String sql = "DELETE FROM parish_leadership WHERE id = ?::uuid";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            ps.executeUpdate();
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao remover líder: " + id, ex);
        }
    }

    private ParishLeader mapRow(ResultSet rs) throws SQLException {
        return new ParishLeader(
                rs.getString("id"),
                rs.getString("name"),
                rs.getString("role"),
                rs.getBoolean("active"),
                rs.getInt("display_order"),
                rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toInstant() : Instant.now(),
                rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at").toInstant() : Instant.now()
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
