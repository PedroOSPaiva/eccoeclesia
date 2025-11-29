package com.ecoeclesia.finance;

import java.time.LocalDate;
import java.util.List;

/**
 * Abstrai o armazenamento do razão para permitir implementações JDBC reais
 * (Postgres) e fakes em memória utilizadas nos testes.
 */
interface LedgerGateway {
    void initialize();

    void upsert(LedgerEntry entry);

    List<LedgerEntry> findAll();

    List<LedgerEntry> findByPeriod(LocalDate start, LocalDate end);
}
