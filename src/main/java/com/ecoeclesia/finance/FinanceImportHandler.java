package com.ecoeclesia.finance;

import com.ecoeclesia.expense.ExpenseService;
import com.ecoeclesia.revenue.RevenueService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;

final class FinanceImportHandler implements HttpHandler {

    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final ExpenseService expenseService;
    private final RevenueService revenueService;
    private final FinanceHttpJson json;

    FinanceImportHandler(AuthTokenService authTokenService, FinanceHttpResponseWriter responseWriter,
                         ExpenseService expenseService, RevenueService revenueService, FinanceHttpJson json) {
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.expenseService = expenseService;
        this.revenueService = revenueService;
        this.json = json;

    FinanceImportHandler(AuthTokenService authTokenService, FinanceHttpResponseWriter responseWriter) {
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 204, "");
            return;
        }
        if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        if (!isAllowed(exchange, "expenses:manage")) {
            responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
            return;
        }
        try {
            String csv = extractCsv(exchange);
            StatementImportSummary summary = importCsv(csv);
            responseWriter.writeJson(exchange, 200, summary.toJson(json));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
        exchange.getRequestBody().readAllBytes();
        responseWriter.writeJson(exchange, 200,
                "{\"expensesImported\":0,\"revenuesImported\":0,\"skipped\":0,\"errors\":[]}");
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }

    private String extractCsv(HttpExchange exchange) throws IOException {
        String contentType = exchange.getRequestHeaders().getFirst("Content-Type");
        if (contentType == null || !contentType.contains("multipart/form-data")) {
            return new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        }
        String boundary = contentType.split("boundary=")[1];
        byte[] body = exchange.getRequestBody().readAllBytes();
        String payload = new String(body, StandardCharsets.UTF_8);
        String[] parts = payload.split("--" + boundary);
        for (String part : parts) {
            if (part.contains("name=\"file\"")) {
                int index = part.indexOf("\r\n\r\n");
                if (index >= 0) {
                    String content = part.substring(index + 4);
                    return content.replaceAll("\r\n$", "");
                }
            }
        }
        throw new IllegalArgumentException("Arquivo CSV não encontrado no formulário.");
    }

    private StatementImportSummary importCsv(String csv) {
        if (csv == null || csv.isBlank()) {
            throw new IllegalArgumentException("Conteúdo do CSV está vazio.");
        }
        List<String> errors = new ArrayList<>();
        int expensesImported = 0;
        int revenuesImported = 0;
        int skipped = 0;
        for (String line : csv.lines()) {
            String trimmed = line.trim();
            if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                continue;
            }
            String[] parts = trimmed.split(",");
            try {
                if (parts.length < 4) {
                    throw new IllegalArgumentException("Linha inválida: " + trimmed);
                }
                String description = parts[1].trim();
                String type = parts[2].trim();
                BigDecimal amount = new BigDecimal(parts[3].trim());
                if ("INCOME".equalsIgnoreCase(type)) {
                    revenueService.registerRevenue(amount, description);
                    revenuesImported += 1;
                } else if ("EXPENSE".equalsIgnoreCase(type)) {
                    expenseService.registerExpense(amount, description);
                    expensesImported += 1;
                } else {
                    throw new IllegalArgumentException("Tipo inválido: " + type);
                }
            } catch (Exception ex) {
                skipped += 1;
                errors.add(ex.getMessage());
            }
        }
        return new StatementImportSummary(expensesImported, revenuesImported, skipped, errors);
    }

    private record StatementImportSummary(int expensesImported, int revenuesImported, int skipped, List<String> errors) {
        String toJson(FinanceHttpJson json) {
            String errorList = errors.stream()
                    .map(value -> "\"" + json.escape(value) + "\"")
                    .collect(java.util.stream.Collectors.joining(","));
            return new StringBuilder("{")
                    .append("\"expensesImported\":").append(expensesImported).append(",")
                    .append("\"revenuesImported\":").append(revenuesImported).append(",")
                    .append("\"skipped\":").append(skipped).append(",")
                    .append("\"errors\":[").append(errorList).append("]")
                    .append("}")
                    .toString();
        }
    }
}
