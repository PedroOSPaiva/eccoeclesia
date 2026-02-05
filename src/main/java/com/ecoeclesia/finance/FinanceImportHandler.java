package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;

final class FinanceImportHandler implements HttpHandler {

    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;

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
        exchange.getRequestBody().readAllBytes();
        responseWriter.writeJson(exchange, 200,
                "{\"expensesImported\":0,\"revenuesImported\":0,\"skipped\":0,\"errors\":[]}");
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }
}
