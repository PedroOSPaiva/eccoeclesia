package com.ecoeclesia.finance;

import com.ecoeclesia.expense.ExpenseDocument;
import com.ecoeclesia.expense.ExpenseService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.Map;

final class ExpensesHandler implements HttpHandler {

    private final ExpenseService expenseService;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;

    ExpensesHandler(ExpenseService expenseService, AuthTokenService authTokenService,
                    FinanceHttpResponseWriter responseWriter, FinanceHttpJson json) {
        this.expenseService = expenseService;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        if ("OPTIONS".equalsIgnoreCase(method)) {
            responseWriter.writeJson(exchange, 204, "");
            return;
        }
        if ("GET".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "expenses:read")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            responseWriter.writeJson(exchange, 200, json.expenses(expenseService.listExpenses()));
            return;
        }
        if ("POST".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "expenses:write")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Map<String, String> values = FinanceSimpleJsonParser.parse(body);
            try {
                ExpenseDocument created = createExpense(values);
                responseWriter.writeJson(exchange, 201, json.expense(created));
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }
        if ("PUT".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "expenses:write")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            String id = extractId(exchange);
            if (id == null) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"Invalid path\"}");
                return;
            }
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Map<String, String> values = FinanceSimpleJsonParser.parse(body);
            try {
                BigDecimal amount = parseAmount(values.get("amount"));
                String description = parseDescription(values.get("description"));
                String category = emptyToNull(values.get("category"));
                ExpenseDocument updated = expenseService.updateExpense(id, amount, description, category);
                responseWriter.writeJson(exchange, 200, json.expense(updated));
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }
        if ("DELETE".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "expenses:write")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            String id = extractId(exchange);
            if (id == null) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"Invalid path\"}");
                return;
            }
            try {
                expenseService.deleteExpense(id);
                responseWriter.writeJson(exchange, 204, "");
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }
        responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }

    private ExpenseDocument createExpense(Map<String, String> values) {
        BigDecimal amount = parseAmount(values.get("amount"));
        String description = parseDescription(values.get("description"));
        String category = emptyToNull(values.get("category"));
        if (category == null) {
            return expenseService.registerExpense(amount, description);
        }
        return expenseService.registerExpense(category, description, amount.toPlainString());
    }

    private BigDecimal parseAmount(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Valor é obrigatório");
        }
        return new BigDecimal(value);
    }

    private String parseDescription(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Descrição é obrigatória");
        }
        return value.trim();
    }

    private String emptyToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    private String extractId(HttpExchange exchange) {
        String path = exchange.getRequestURI().getPath();
        String[] parts = path.split("/");
        if (parts.length < 4) {
            return null;
        }
        return parts[3];
    }
}
