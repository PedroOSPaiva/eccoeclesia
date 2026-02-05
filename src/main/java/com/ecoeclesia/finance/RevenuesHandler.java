package com.ecoeclesia.finance;

import com.ecoeclesia.revenue.RevenueEntity;
import com.ecoeclesia.revenue.RevenueService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Map;

final class RevenuesHandler implements HttpHandler {

    private final RevenueService revenueService;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final FinanceHttpQueryParams queryParams = new FinanceHttpQueryParams();

    RevenuesHandler(RevenueService revenueService, AuthTokenService authTokenService,
                    FinanceHttpResponseWriter responseWriter, FinanceHttpJson json) {
        this.revenueService = revenueService;
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
            if (!isAllowed(exchange, "finance:read")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            Instant start = toInstant(queryParams.getDate(exchange, "start"));
            Instant end = toInstant(queryParams.getDate(exchange, "end"));
            responseWriter.writeJson(exchange, 200, json.revenues(revenueService.listRevenues(start, end)));
            return;
        }
        if ("POST".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "finance:write")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Map<String, String> values = FinanceSimpleJsonParser.parse(body);
            try {
                RevenueEntity created = createRevenue(values);
                responseWriter.writeJson(exchange, 201, json.revenue(created));
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }
        if ("PUT".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "finance:write")) {
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
                String description = require(values.get("description"), "Descrição é obrigatória");
                String category = emptyToNull(values.get("category"));
                RevenueEntity updated = revenueService.updateRevenue(id, amount, description, category);
                responseWriter.writeJson(exchange, 200, json.revenue(updated));
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }
        if ("DELETE".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "finance:write")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            String id = extractId(exchange);
            if (id == null) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"Invalid path\"}");
                return;
            }
            try {
                revenueService.deleteRevenue(id);
                responseWriter.writeJson(exchange, 204, "");
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }
        responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
    }

    private RevenueEntity createRevenue(Map<String, String> values) {
        BigDecimal amount = parseAmount(values.get("amount"));
        String description = require(values.get("description"), "Descrição é obrigatória");
        String category = emptyToNull(values.get("category"));
        if (category == null) {
            return revenueService.registerRevenue(amount, description);
        }
        return revenueService.registerRevenue(amount, description, category);
    }

    private BigDecimal parseAmount(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Valor é obrigatório");
        }
        return new BigDecimal(value);
    }

    private String require(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(message);
        }
        return value.trim();
    }

    private String emptyToNull(String value) {
        if (value == null || value.isBlank() || "null".equalsIgnoreCase(value)) {
            return null;
        }
        return value.trim();
    }

    private Instant toInstant(LocalDate date) {
        if (date == null) {
            return null;
        }
        return date.atStartOfDay(ZoneId.systemDefault()).toInstant();
    }

    private String extractId(HttpExchange exchange) {
        String path = exchange.getRequestURI().getPath();
        String[] parts = path.split("/");
        if (parts.length < 4) {
            return null;
        }
        return parts[3];
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }
}
