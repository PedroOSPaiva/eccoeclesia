package com.ecoeclesia.finance;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Implementação JDBC do gateway de lançamentos. Espera uma tabela
 * <code>ledger_entries</code> compatível com o DDL em infra/sql/ledger-postgres.sql.
 */
final class JdbcLedgerGateway implements LedgerGateway {

    private final DataSource dataSource;

    JdbcLedgerGateway(DataSource dataSource) {
        this.dataSource = Objects.requireNonNull(dataSource);
    }

    @Override
    public void initialize() {
        try (Connection connection = dataSource.getConnection();
             Statement stmt = connection.createStatement()) {
            stmt.execute(
                    "CREATE TABLE IF NOT EXISTS ledger_entries (" +
                            "id VARCHAR(64) PRIMARY KEY, " +
                            "account_code VARCHAR(32) NOT NULL, " +
                            "reference_code VARCHAR(64), " +
                            "cost_center VARCHAR(64), " +
                            "description TEXT NOT NULL, " +
                            "amount NUMERIC(19,2) NOT NULL, " +
                            "type VARCHAR(16) NOT NULL, " +
                            "occurred_on DATE NOT NULL, " +
                            "created_at TIMESTAMPTZ NOT NULL DEFAULT now(), " +
                            "updated_at TIMESTAMPTZ NOT NULL DEFAULT now())");
            stmt.execute("CREATE INDEX IF NOT EXISTS idx_ledger_entries_date ON ledger_entries (occurred_on)");
            stmt.execute("CREATE INDEX IF NOT EXISTS idx_ledger_entries_account ON ledger_entries (account_code)");
        } catch (SQLException ex) {
            throw new IllegalStateException("Failed to initialize ledger table", ex);
        }
    }

    @Override
    public void upsert(LedgerEntry entry) {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement stmt = connection.prepareStatement(
                     "INSERT INTO ledger_entries (id, account_code, reference_code, cost_center, description, amount, type, occurred_on, created_at, updated_at) " +
                             "VALUES (?,?,?,?,?,?,?, ?, now(), now()) " +
                             "ON CONFLICT (id) DO UPDATE SET account_code = excluded.account_code, " +
                             "reference_code = excluded.reference_code, cost_center = excluded.cost_center, " +
                             "description = excluded.description, amount = excluded.amount, type = excluded.type, " +
                             "occurred_on = excluded.occurred_on, updated_at = excluded.updated_at")) {
            stmt.setString(1, entry.id());
            stmt.setString(2, entry.accountCode());
            stmt.setString(3, entry.referenceCode());
            stmt.setString(4, entry.costCenter());
            stmt.setString(5, entry.description());
            stmt.setBigDecimal(6, entry.amount());
            stmt.setString(7, entry.type().name());
            stmt.setDate(8, Date.valueOf(entry.occurredOn()));
            stmt.executeUpdate();
        } catch (SQLException ex) {
            throw new IllegalStateException("Failed to persist ledger entry", ex);
        }
    }

    @Override
    public List<LedgerEntry> findAll() {
        return executeQuery("SELECT * FROM ledger_entries ORDER BY occurred_on, id", null, null);
    }

    @Override
    public List<LedgerEntry> findByPeriod(LocalDate start, LocalDate end) {
        return executeQuery(
                "SELECT * FROM ledger_entries WHERE occurred_on >= ? AND occurred_on <= ? ORDER BY occurred_on, id",
                start, end);
    }

    private List<LedgerEntry> executeQuery(String sql, LocalDate start, LocalDate end) {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            if (start != null && end != null) {
                stmt.setDate(1, Date.valueOf(start));
                stmt.setDate(2, Date.valueOf(end));
            }
            List<LedgerEntry> results = new ArrayList<>();
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    results.add(map(rs));
                }
            }
            return results;
        } catch (SQLException ex) {
            throw new IllegalStateException("Failed to query ledger entries", ex);
        }
    }

    private LedgerEntry map(ResultSet rs) throws SQLException {
        return new LedgerEntry(
                rs.getString("id"),
                rs.getString("account_code"),
                rs.getString("reference_code"),
                rs.getString("cost_center"),
                rs.getString("description"),
                rs.getBigDecimal("amount"),
                LedgerEntryType.valueOf(rs.getString("type")),
                rs.getDate("occurred_on").toLocalDate()
        );
    }
}
