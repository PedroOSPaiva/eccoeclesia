package com.ecoeclesia.finance;

import java.math.BigDecimal;

public record StatementImportResult(int totalLines, BigDecimal totalIncome, BigDecimal totalExpenses) {
    public BigDecimal balance() {
        return totalIncome.subtract(totalExpenses);
    }
}
