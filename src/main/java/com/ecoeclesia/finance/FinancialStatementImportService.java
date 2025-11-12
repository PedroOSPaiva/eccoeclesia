package com.ecoeclesia.finance;

import com.ecoeclesia.expense.ExpenseService;
import com.ecoeclesia.revenue.RevenueService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

@Service
public class FinancialStatementImportService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FinancialStatementImportService.class);
    private static final List<DateTimeFormatter> DATE_FORMATS = List.of(
            DateTimeFormatter.ISO_LOCAL_DATE,
            DateTimeFormatter.ofPattern("dd/MM/yyyy"),
            DateTimeFormatter.ofPattern("dd-MM-yyyy")
    );

    private final ExpenseService expenseService;
    private final RevenueService revenueService;

    public FinancialStatementImportService(ExpenseService expenseService, RevenueService revenueService) {
        this.expenseService = expenseService;
        this.revenueService = revenueService;
    }

    public StatementImportResult importCsv(InputStream inputStream) throws IOException {
        Objects.requireNonNull(inputStream, "inputStream must not be null");
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            String headerLine = reader.readLine();
            if (headerLine == null) {
                return new StatementImportResult(0, 0, 0, List.of("Arquivo vazio"));
            }
            String delimiter = headerLine.contains(";") ? ";" : ",";
            Map<String, Integer> headerIndexes = parseHeader(headerLine, delimiter);
            int expenses = 0;
            int revenues = 0;
            int skipped = 0;
            List<String> errors = new ArrayList<>();
            String line;
            int lineNumber = 1;
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                if (line.isBlank()) {
                    continue;
                }
                try {
                    TransactionRow row = parseRow(line, delimiter, headerIndexes);
                    switch (row.type()) {
                        case EXPENSE -> {
                            expenseService.registerExpense(row.amount(), row.description(), row.category(), row.occurredAt());
                            expenses++;
                        }
                        case REVENUE -> {
                            revenueService.registerRevenue(row.amount(), row.description(), row.category(), row.occurredAt());
                            revenues++;
                        }
                    }
                } catch (IllegalArgumentException ex) {
                    skipped++;
                    String message = "Linha " + lineNumber + ": " + ex.getMessage();
                    errors.add(message);
                    LOGGER.debug("Skipping statement line {}: {}", lineNumber, ex.getMessage());
                }
            }
            return new StatementImportResult(expenses, revenues, skipped, errors);
        }
    }

    private Map<String, Integer> parseHeader(String headerLine, String delimiter) {
        String[] columns = headerLine.split(delimiter);
        Map<String, Integer> headerIndexes = new HashMap<>();
        for (int i = 0; i < columns.length; i++) {
            headerIndexes.put(columns[i].trim().toLowerCase(Locale.ROOT), i);
        }
        if (!headerIndexes.containsKey("type") && !headerIndexes.containsKey("tipo")) {
            LOGGER.warn("Statement header missing 'type' column; falling back to amount sign");
        }
        requireColumn(headerIndexes, "amount", "valor");
        requireColumn(headerIndexes, "description", "descricao", "descrição");
        return headerIndexes;
    }

    private void requireColumn(Map<String, Integer> headers, String... candidates) {
        for (String candidate : candidates) {
            if (headers.containsKey(candidate)) {
                return;
            }
        }
        throw new IllegalArgumentException("Cabeçalho não possui a coluna obrigatória: " + String.join("/", candidates));
    }

    private TransactionRow parseRow(String line, String delimiter, Map<String, Integer> headers) {
        String[] parts = line.split(delimiter, -1);
        String description = getValue(parts, headers, "description", "descricao", "descrição");
        if (description == null || description.isBlank()) {
            throw new IllegalArgumentException("Descrição vazia");
        }
        BigDecimal amount = parseAmount(getRequiredValue(parts, headers, "amount", "valor"));
        if (amount.signum() == 0) {
            throw new IllegalArgumentException("Valor zero não é permitido");
        }
        String typeValue = getValue(parts, headers, "type", "tipo");
        TransactionType type = determineType(typeValue, amount);
        BigDecimal normalizedAmount = amount.abs();
        String category = getValue(parts, headers, "category", "categoria");
        Instant occurredAt = parseDate(getValue(parts, headers, "date", "data"));
        return new TransactionRow(type, normalizedAmount, description.trim(), category, occurredAt);
    }

    private TransactionType determineType(String typeValue, BigDecimal amount) {
        if (typeValue != null && !typeValue.isBlank()) {
            String normalized = typeValue.trim().toUpperCase(Locale.ROOT);
            return switch (normalized) {
                case "EXPENSE", "DESPESA", "DEBIT" -> TransactionType.EXPENSE;
                case "REVENUE", "RECEITA", "CREDIT" -> TransactionType.REVENUE;
                default -> throw new IllegalArgumentException("Tipo de transação desconhecido: " + typeValue);
            };
        }
        return amount.signum() < 0 ? TransactionType.EXPENSE : TransactionType.REVENUE;
    }

    private BigDecimal parseAmount(String value) {
        String cleaned = value.replace("R$", "").replace(" ", "");
        cleaned = cleaned.replaceAll("[.](?=.*[,])", "");
        cleaned = cleaned.replace(",", ".");
        try {
            return new BigDecimal(cleaned);
        } catch (NumberFormatException ex) {
            throw new IllegalArgumentException("Valor inválido: " + value);
        }
    }

    private Instant parseDate(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        String trimmed = value.trim();
        for (DateTimeFormatter formatter : DATE_FORMATS) {
            try {
                LocalDate date = LocalDate.parse(trimmed, formatter);
                return date.atStartOfDay().toInstant(java.time.ZoneOffset.UTC);
            } catch (DateTimeParseException ignored) {
            }
        }
        throw new IllegalArgumentException("Data inválida: " + value);
    }

    private String getValue(String[] parts, Map<String, Integer> headers, String... candidates) {
        for (String candidate : candidates) {
            Integer index = headers.get(candidate);
            if (index != null && index < parts.length) {
                return parts[index];
            }
        }
        return null;
    }

    private String getRequiredValue(String[] parts, Map<String, Integer> headers, String... candidates) {
        String value = getValue(parts, headers, candidates);
        if (value == null) {
            throw new IllegalArgumentException("Coluna obrigatória ausente: " + String.join("/", candidates));
        }
        return value;
    }

    private record TransactionRow(TransactionType type, BigDecimal amount, String description,
                                   String category, Instant occurredAt) {
    }

    private enum TransactionType {
        EXPENSE,
        REVENUE
    }
}
