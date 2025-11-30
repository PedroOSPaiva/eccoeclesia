package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Simple CSV parser used in the tests. The accepted format is
 * {@code date,description,type,amount} where type is either {@code INCOME} or
 * {@code EXPENSE}. The parser ignores blank lines and lines starting with a
 * hash so that people can comment their statements.
 */
public final class FinancialStatementImportService {

    public StatementImportResult importCsv(String csvContent) {
        List<String> lines = csvContent.lines()
                .map(String::trim)
                .filter(line -> !line.isEmpty() && !line.startsWith("#"))
                .collect(Collectors.toList());

        BigDecimal totalIncome = BigDecimal.ZERO;
        BigDecimal totalExpenses = BigDecimal.ZERO;

        for (String line : lines) {
            String[] parts = line.split(",");
            if (parts.length != 4) {
                throw new IllegalArgumentException("Invalid CSV line: " + line);
            }
            BigDecimal amount = new BigDecimal(parts[3].trim());
            if (parts[2].equalsIgnoreCase("INCOME")) {
                totalIncome = totalIncome.add(amount);
            } else if (parts[2].equalsIgnoreCase("EXPENSE")) {
                totalExpenses = totalExpenses.add(amount);
            } else {
                throw new IllegalArgumentException("Unknown entry type: " + parts[2]);
            }
        }

        return new StatementImportResult(lines.size(), totalIncome, totalExpenses);
    }

    /**
     * Imports an extended CSV format into the ledger service, enforcing account codes and cost centers.
     * Format: {@code date,description,type,amount,accountCode,reference,costCenter}
     */
    public int importLedgerCsv(String csvContent, LedgerService ledgerService) {
        List<String> lines = csvContent.lines()
                .map(String::trim)
                .filter(line -> !line.isEmpty() && !line.startsWith("#"))
                .collect(Collectors.toList());

        for (String line : lines) {
            String[] parts = line.split(",");
            if (parts.length != 7) {
                throw new IllegalArgumentException("Invalid ledger CSV line: " + line);
            }
            String date = parts[0].trim();
            String description = parts[1].trim();
            String type = parts[2].trim();
            String amount = parts[3].trim();
            String accountCode = parts[4].trim();
            String reference = parts[5].trim();
            String costCenter = parts[6].trim();

            java.time.LocalDate occurredOn = java.time.LocalDate.parse(date);
            java.math.BigDecimal value = new java.math.BigDecimal(amount);
            if ("INCOME".equalsIgnoreCase(type)) {
                ledgerService.recordIncome(accountCode, value, description, reference, costCenter, occurredOn);
            } else if ("EXPENSE".equalsIgnoreCase(type)) {
                ledgerService.recordExpense(accountCode, value, description, reference, costCenter, occurredOn);
            } else {
                throw new IllegalArgumentException("Unknown entry type: " + type);
            }
        }
        return lines.size();
    }
}
