package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Locale;
import java.util.Map;

final class ReceivablesHandler implements HttpHandler {

    private final ReceivableService receivableService;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final FinanceHttpLogger logger;
    private final FinanceHttpQueryParams queryParams = new FinanceHttpQueryParams();

    ReceivablesHandler(ReceivableService receivableService, AuthTokenService authTokenService,
                       FinanceHttpResponseWriter responseWriter, FinanceHttpJson json, FinanceHttpLogger logger) {
        this.receivableService = receivableService;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
        this.logger = logger;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())
                && !"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            if (!isAllowed(exchange, "finance:read")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            responseWriter.writeJson(exchange, 200, json.receivables(filterReceivables(exchange)));
            return;
        }
        if (!isAllowed(exchange, "finance:write")) {
            responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
            return;
        }
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, String> values = FinanceSimpleJsonParser.parse(body);
        try {
            ReceivableEntry created = receivableService.create(
                    values.get("description"),
                    parseAmount(values.get("amount")),
                    parseDate(values.get("dueDate")),
                    parseRequired(values.get("origin"), "Origem é obrigatória"),
                    parseRequired(values.get("category"), "Categoria é obrigatória"),
                    emptyToNull(values.get("project")),
                    currentUser(exchange));
            logger.logEvent("Receivable created: " + created.id());
            responseWriter.writeJson(exchange, 201, json.receivable(created));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }

    private BigDecimal parseAmount(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Valor é obrigatório");
        }
        return new BigDecimal(value);
    }

    private LocalDate parseDate(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Data de vencimento é obrigatória");
        }
        return LocalDate.parse(value);
    }

    private String parseRequired(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(message);
        }
        return value.trim();
    }

    private String emptyToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    private String currentUser(HttpExchange exchange) {
        var account = authTokenService.accountFor(exchange.getRequestHeaders().getFirst("Authorization"));
        if (account == null) {
            return "system";
        }
        return account.getEmail();
    }

    private java.util.List<ReceivableEntry> filterReceivables(HttpExchange exchange) {
        String origin = queryParams.getString(exchange, "origin");
        String category = queryParams.getString(exchange, "category");
        String project = queryParams.getString(exchange, "project");
        String rawStatus = queryParams.getString(exchange, "status");
        ReceivableStatus status = null;
        if (rawStatus != null && !rawStatus.isBlank()) {
            status = ReceivableStatus.valueOf(rawStatus.trim().toUpperCase(Locale.ROOT));
        }
        ReceivableStatus finalStatus = status;
        return receivableService.list().stream()
                .filter(entry -> origin == null || (entry.origin() != null && origin.equalsIgnoreCase(entry.origin())))
                .filter(entry -> category == null || (entry.category() != null && category.equalsIgnoreCase(entry.category())))
                .filter(entry -> project == null || (entry.project() != null && project.equalsIgnoreCase(entry.project())))
                .filter(entry -> finalStatus == null || entry.status() == finalStatus)
                .toList();
    }
}
