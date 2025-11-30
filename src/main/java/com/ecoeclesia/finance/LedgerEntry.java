package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

public record LedgerEntry(String id,
                          String accountCode,
                          String referenceCode,
                          String costCenter,
                          String description,
                          BigDecimal amount,
                          LedgerEntryType type,
                          LocalDate occurredOn) {

    public LedgerEntry {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(accountCode, "accountCode");
        Objects.requireNonNull(referenceCode, "referenceCode");
        Objects.requireNonNull(costCenter, "costCenter");
        Objects.requireNonNull(description, "description");
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(type, "type");
        Objects.requireNonNull(occurredOn, "occurredOn");
        if (amount.signum() < 0) {
            throw new IllegalArgumentException("amount must be zero or positive");
        }
    }
}
