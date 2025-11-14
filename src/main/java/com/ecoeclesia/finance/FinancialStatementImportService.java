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
}
