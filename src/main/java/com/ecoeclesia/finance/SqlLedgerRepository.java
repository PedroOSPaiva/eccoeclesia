package com.ecoeclesia.finance;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

/**
 * Repositório JDBC apoiado por um {@link LedgerGateway}. Em produção ele usa
 * a implementação {@link JdbcLedgerGateway}, enquanto nos testes empregamos
 * {@link InMemoryLedgerGateway} para simular o banco.
 */
public final class SqlLedgerRepository implements LedgerRepository {

    private final LedgerGateway gateway;

    public SqlLedgerRepository(LedgerGateway gateway) {
        this.gateway = Objects.requireNonNull(gateway);
        gateway.initialize();
    }

    @Override
    public LedgerEntry save(LedgerEntry entry) {
        gateway.upsert(entry);
        return entry;
    }

    @Override
    public List<LedgerEntry> findByPeriod(LocalDate start, LocalDate end) {
        return gateway.findByPeriod(start, end);
    }

    @Override
    public List<LedgerEntry> findAll() {
        return gateway.findAll();
    }
}
