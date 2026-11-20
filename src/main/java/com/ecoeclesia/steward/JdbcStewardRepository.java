package com.ecoeclesia.steward;

import javax.sql.DataSource;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class JdbcStewardRepository implements StewardRepository {

    private final DataSource dataSource;

    public JdbcStewardRepository(DataSource dataSource) {
        this.dataSource = Objects.requireNonNull(dataSource, "dataSource");
    }

    @Override
    public Steward save(Steward steward) {
        Objects.requireNonNull(steward, "steward");
        UUID id = toUuid(steward.id());
        UUID memberId = toUuid(steward.memberId());

        String sql = "INSERT INTO stewards (id, member_id, envelope_number, start_date, status, notes, created_at, updated_at) " +
                "VALUES (?::uuid, ?::uuid, ?, ?, ?, ?, ?, now()) " +
                "ON CONFLICT (id) DO UPDATE SET " +
                "member_id = EXCLUDED.member_id, " +
                "envelope_number = EXCLUDED.envelope_number, " +
                "start_date = EXCLUDED.start_date, " +
                "status = EXCLUDED.status, " +
                "notes = EXCLUDED.notes, " +
                "updated_at = now()";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id.toString());
            ps.setString(2, memberId.toString());
            ps.setString(3, steward.envelopeNumber());
            ps.setDate(4, Date.valueOf(steward.startDate()));
            ps.setString(5, steward.status());
            ps.setString(6, steward.notes());
            ps.setTimestamp(7, Timestamp.from(steward.createdAt() != null ? steward.createdAt() : Instant.now()));
            ps.executeUpdate();
            return steward;
        } catch (SQLException ex) {
            throw new IllegalStateException("Falha ao salvar dizimista: " + steward.id(), ex);
        }
    }

    @Override
    public Optional<Steward> findById(String id) {
        if (id == null || id.isBlank()) return Optional.empty();
        UUID uuid = toUuid(id);
        String sql = "SELECT id, member_id, envelope_number, start_date, status, notes, created_at, updated_at FROM stewards WHERE id = ?::uuid";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return Optional.of(mapRow(rs));
                return Optional.empty();
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar dizimista por id: " + id, ex);
        }
    }

    @Override
    public Optional<Steward> findByMemberId(String memberId) {
        if (memberId == null || memberId.isBlank()) return Optional.empty();
        UUID uuid = toUuid(memberId);
        String sql = "SELECT id, member_id, envelope_number, start_date, status, notes, created_at, updated_at FROM stewards WHERE member_id = ?::uuid LIMIT 1";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return Optional.of(mapRow(rs));
                return Optional.empty();
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar dizimista por memberId: " + memberId, ex);
        }
    }

    @Override
    public List<Steward> findAll() {
        String sql = "SELECT id, member_id, envelope_number, start_date, status, notes, created_at, updated_at FROM stewards ORDER BY start_date DESC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<Steward> stewards = new ArrayList<>();
            while (rs.next()) {
                stewards.add(mapRow(rs));
            }
            return stewards;
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao listar dizimistas", ex);
        }
    }

    @Override
    public void deleteById(String id) {
        if (id == null || id.isBlank()) return;
        UUID uuid = toUuid(id);
        String sql = "DELETE FROM stewards WHERE id = ?::uuid";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            ps.executeUpdate();
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao deletar dizimista por id: " + id, ex);
        }
    }

    private Steward mapRow(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String memberId = rs.getString("member_id");
        String envelopeNumber = rs.getString("envelope_number");
        Date startDate = rs.getDate("start_date");
        String status = rs.getString("status");
        String notes = rs.getString("notes");
        Timestamp createdAt = rs.getTimestamp("created_at");
        Timestamp updatedAt = rs.getTimestamp("updated_at");

        return new Steward(
                id,
                memberId,
                envelopeNumber,
                startDate != null ? startDate.toLocalDate() : LocalDate.now(),
                status,
                notes,
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
