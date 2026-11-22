package com.ecoeclesia.revenue;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

/**
 * Repositório JDBC conectado ao PostgreSQL (tabela 'revenues').
 */
public class JdbcRevenueRepository implements RevenueRepository {

    private final DataSource dataSource;

    public JdbcRevenueRepository(DataSource dataSource) {
        this.dataSource = Objects.requireNonNull(dataSource, "dataSource");
    }

    @Override
    public RevenueEntity save(RevenueEntity entity) {
        Objects.requireNonNull(entity, "entity");
        UUID id = toUuid(entity.id());
        UUID communityId = toUuid(entity.communityId());
        UUID memberId = toUuid(entity.memberId());

        String sql = "INSERT INTO revenues (id, community_id, member_id, amount, description, category, created_at, updated_at) " +
                "VALUES (?::uuid, ?::uuid, ?::uuid, ?, ?, ?, ?, now()) " +
                "ON CONFLICT (id) DO UPDATE SET " +
                "community_id = EXCLUDED.community_id, " +
                "member_id = EXCLUDED.member_id, " +
                "amount = EXCLUDED.amount, " +
                "description = EXCLUDED.description, " +
                "category = EXCLUDED.category, " +
                "updated_at = now()";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id.toString());
            ps.setString(2, communityId != null ? communityId.toString() : null);
            ps.setString(3, memberId != null ? memberId.toString() : null);
            ps.setBigDecimal(4, entity.amount());
            ps.setString(5, entity.description());
            ps.setString(6, entity.category().name());
            ps.setTimestamp(7, Timestamp.from(entity.receivedAt()));
            ps.executeUpdate();
            return entity;
        } catch (SQLException ex) {
            throw new IllegalStateException("Falha ao salvar receita: " + entity.id(), ex);
        }
    }

    @Override
    public Optional<RevenueEntity> findById(String id) {
        if (id == null || id.isBlank()) {
            return Optional.empty();
        }
        UUID uuid = toUuid(id);
        String sql = "SELECT id, community_id, member_id, amount, description, category, created_at FROM revenues WHERE id = ?::uuid";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
                return Optional.empty();
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar receita por id: " + id, ex);
        }
    }

    @Override
    public List<RevenueEntity> findAll() {
        String sql = "SELECT id, community_id, member_id, amount, description, category, created_at FROM revenues ORDER BY created_at DESC, id";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<RevenueEntity> revenues = new ArrayList<>();
            while (rs.next()) {
                revenues.add(mapRow(rs));
            }
            return revenues;
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao listar receitas do banco", ex);
        }
    }

    @Override
    public List<RevenueEntity> findByPeriod(Instant start, Instant end) {
        StringBuilder sql = new StringBuilder("SELECT id, community_id, member_id, amount, description, category, created_at FROM revenues");
        List<Object> params = new ArrayList<>();

        if (start != null && end != null) {
            sql.append(" WHERE created_at >= ? AND created_at <= ?");
            params.add(Timestamp.from(start));
            params.add(Timestamp.from(end));
        } else if (start != null) {
            sql.append(" WHERE created_at >= ?");
            params.add(Timestamp.from(start));
        } else if (end != null) {
            sql.append(" WHERE created_at <= ?");
            params.add(Timestamp.from(end));
        }
        sql.append(" ORDER BY created_at DESC, id");

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql.toString())) {
            for (int i = 0; i < params.size(); i++) {
                ps.setObject(i + 1, params.get(i));
            }
            try (ResultSet rs = ps.executeQuery()) {
                List<RevenueEntity> revenues = new ArrayList<>();
                while (rs.next()) {
                    revenues.add(mapRow(rs));
                }
                return revenues;
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao filtrar receitas por período", ex);
        }
    }

    @Override
    public void deleteById(String id) {
        if (id == null || id.isBlank()) {
            return;
        }
        UUID uuid = toUuid(id);
        String sql = "DELETE FROM revenues WHERE id = ?::uuid";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            ps.executeUpdate();
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao excluir receita por id: " + id, ex);
        }
    }

    private RevenueEntity mapRow(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String communityId = rs.getString("community_id");
        String memberId = rs.getString("member_id");
        BigDecimal amount = rs.getBigDecimal("amount");
        String description = rs.getString("description");
        String categoryStr = rs.getString("category");
        Timestamp createdAt = rs.getTimestamp("created_at");

        RevenueCategory category = parseCategory(categoryStr);
        Instant instant = createdAt != null ? createdAt.toInstant() : Instant.now();
        return new RevenueEntity(id, communityId, amount, description, category, instant, memberId);
    }

    private RevenueCategory parseCategory(String value) {
        if (value == null || value.isBlank()) {
            return RevenueCategory.OTHER;
        }
        try {
            return RevenueCategory.valueOf(value.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            return RevenueCategory.OTHER;
        }
    }

    private UUID toUuid(String id) {
        if (id == null || id.isBlank()) return null;
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException ex) {
            return UUID.nameUUIDFromBytes(id.getBytes(StandardCharsets.UTF_8));
        }
    }
}
