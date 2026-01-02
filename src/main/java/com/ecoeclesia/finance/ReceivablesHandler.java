package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Map;

final class ReceivablesHandler implements HttpHandler {

    private final ReceivableService receivableService;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;

    ReceivablesHandler(ReceivableService receivableService, AuthTokenService authTokenService,
                       FinanceHttpResponseWriter responseWriter, FinanceHttpJson json) {
        this.receivableService = receivableService;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
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
            responseWriter.writeJson(exchange, 200, json.receivables(receivableService.list()));
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
                    parseDate(values.get("dueDate")));
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
}
