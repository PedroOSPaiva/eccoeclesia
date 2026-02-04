package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Map;

final class PayablesStatusHandler implements HttpHandler {

    private final PayableService payableService;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final FinanceHttpLogger logger;

    PayablesStatusHandler(PayableService payableService, AuthTokenService authTokenService,
                          FinanceHttpResponseWriter responseWriter, FinanceHttpJson json, FinanceHttpLogger logger) {
        this.payableService = payableService;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
        this.logger = logger;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (!"PUT".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        if (!isAllowed(exchange, "finance:write")) {
            responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
            return;
        }
        String path = exchange.getRequestURI().getPath();
        String[] parts = path.split("/");
        if (parts.length < 5 || !"status".equalsIgnoreCase(parts[4])) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"Invalid path\"}");
            return;
        }
        String id = parts[3];
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, String> values = FinanceSimpleJsonParser.parse(body);
        try {
            String rawStatus = values.get("status");
            if (rawStatus == null || rawStatus.isBlank()) {
                throw new IllegalArgumentException("Status é obrigatório");
            }
            PayableStatus status = PayableStatus.valueOf(rawStatus.trim().toUpperCase(Locale.ROOT));
            PayableEntry updated = payableService.updateStatus(id, status, currentUser(exchange));
            logger.logEvent("Payable status updated: " + id + " -> " + status);
            responseWriter.writeJson(exchange, 200, json.payable(updated));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }

    private String currentUser(HttpExchange exchange) {
        var account = authTokenService.accountFor(exchange.getRequestHeaders().getFirst("Authorization"));
        if (account == null) {
            return "system";
        }
        return account.getEmail();
    }
}
