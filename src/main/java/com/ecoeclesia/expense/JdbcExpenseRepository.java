package com.ecoeclesia.expense;

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
 * Repositório JDBC conectado ao PostgreSQL (tabela 'expenses').
 */
public class JdbcExpenseRepository implements ExpenseRepository {

    private final DataSource dataSource;

    public JdbcExpenseRepository(DataSource dataSource) {
        this.dataSource = Objects.requireNonNull(dataSource, "dataSource");
    }

    @Override
    public ExpenseDocument save(ExpenseDocument document) {
        Objects.requireNonNull(document, "document");
        UUID id = toUuid(document.getId());
        UUID communityId = toUuid(document.getCommunityId());

        String sql = "INSERT INTO expenses (id, community_id, amount, description, category, created_at, updated_at) " +
                "VALUES (?::uuid, ?::uuid, ?, ?, ?, ?, now()) " +
                "ON CONFLICT (id) DO UPDATE SET " +
                "community_id = EXCLUDED.community_id, " +
                "amount = EXCLUDED.amount, " +
                "description = EXCLUDED.description, " +
                "category = EXCLUDED.category, " +
                "updated_at = now()";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id.toString());
            ps.setString(2, communityId != null ? communityId.toString() : null);
            ps.setBigDecimal(3, document.getAmount());
            ps.setString(4, document.getDescription());
            ps.setString(5, document.getCategory().name());
            ps.setTimestamp(6, Timestamp.from(document.getCreatedAt()));
            ps.executeUpdate();
            return document;
        } catch (SQLException ex) {
            throw new IllegalStateException("Falha ao salvar despesa: " + document.getId(), ex);
        }
    }

    @Override
    public Optional<ExpenseDocument> findById(String id) {
        if (id == null || id.isBlank()) {
            return Optional.empty();
        }
        UUID uuid = toUuid(id);
        String sql = "SELECT id, community_id, amount, description, category, created_at FROM expenses WHERE id = ?::uuid";

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
            throw new IllegalStateException("Erro ao buscar despesa por id: " + id, ex);
        }
    }

    @Override
    public List<ExpenseDocument> findAll() {
        String sql = "SELECT id, community_id, amount, description, category, created_at FROM expenses ORDER BY created_at DESC, id";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<ExpenseDocument> expenses = new ArrayList<>();
            while (rs.next()) {
                expenses.add(mapRow(rs));
            }
            return expenses;
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao listar despesas do banco", ex);
        }
    }

    @Override
    public void deleteById(String id) {
        if (id == null || id.isBlank()) {
            return;
        }
        UUID uuid = toUuid(id);
        String sql = "DELETE FROM expenses WHERE id = ?::uuid";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            ps.executeUpdate();
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao excluir despesa por id: " + id, ex);
        }
    }

    private ExpenseDocument mapRow(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String communityId = rs.getString("community_id");
        BigDecimal amount = rs.getBigDecimal("amount");
        String description = rs.getString("description");
        String categoryStr = rs.getString("category");
        Timestamp createdAt = rs.getTimestamp("created_at");

        ExpenseCategory category = parseCategory(categoryStr);
        Instant instant = createdAt != null ? createdAt.toInstant() : Instant.now();
        return new ExpenseDocument(id, communityId, amount, description, category, instant);
    }

    private ExpenseCategory parseCategory(String value) {
        if (value == null || value.isBlank()) {
            return ExpenseCategory.OTHER;
        }
        try {
            return ExpenseCategory.valueOf(value.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            return ExpenseCategory.OTHER;
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
