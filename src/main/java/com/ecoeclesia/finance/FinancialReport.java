package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public record FinancialReport(LocalDate start,
                              LocalDate end,
                              BigDecimal previousBalance,
                              BigDecimal totalIncome,
                              BigDecimal totalExpenses,
                              BigDecimal closingBalance,
                              List<FinancialReportLine> incomeLines,
                              List<FinancialReportLine> expenseLines,
                              List<ReportSignature> signatures,
                              List<LedgerEntry> entries) {
    public FinancialReport {
        Objects.requireNonNull(start, "start");
        Objects.requireNonNull(end, "end");
        Objects.requireNonNull(previousBalance, "previousBalance");
        Objects.requireNonNull(totalIncome, "totalIncome");
        Objects.requireNonNull(totalExpenses, "totalExpenses");
        Objects.requireNonNull(closingBalance, "closingBalance");
        Objects.requireNonNull(incomeLines, "incomeLines");
        Objects.requireNonNull(expenseLines, "expenseLines");
        Objects.requireNonNull(signatures, "signatures");
        Objects.requireNonNull(entries, "entries");
    }
}
