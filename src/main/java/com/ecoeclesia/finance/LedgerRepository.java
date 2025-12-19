package com.ecoeclesia.finance;

import java.time.LocalDate;
import java.util.List;

public interface LedgerRepository {
    LedgerEntry save(LedgerEntry entry);

    List<LedgerEntry> findByPeriod(LocalDate start, LocalDate end);

    List<LedgerEntry> findAll();
}
