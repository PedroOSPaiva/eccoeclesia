package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

final class LedgerHandler implements HttpHandler {

    private final LedgerService ledgerService;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final FinanceHttpQueryParams queryParams;

    LedgerHandler(LedgerService ledgerService, AuthTokenService authTokenService,
                  FinanceHttpResponseWriter responseWriter, FinanceHttpJson json,
                  FinanceHttpQueryParams queryParams) {
        this.ledgerService = ledgerService;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
        this.queryParams = queryParams;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 204, "");
            return;
        }
        if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            if (!authTokenService.isAllowed(exchange.getRequestHeaders().getFirst("Authorization"), "finance:read")) {
                responseWriter.writeJson(exchange, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }
            LocalDate start = queryParams.getDate(exchange, "start");
            LocalDate end = queryParams.getDate(exchange, "end");
            List<LedgerEntry> entries = start != null && end != null
                    ? ledgerService.findByPeriod(start, end)
                    : ledgerService.listAll();
            responseWriter.writeJson(exchange, 200, json.ledgerEntries(entries));
            return;
        }
        if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            if (!authTokenService.isAllowed(exchange.getRequestHeaders().getFirst("Authorization"), "finance:write")) {
                responseWriter.writeJson(exchange, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            try {
                FinanceLedgerRequest request = FinanceLedgerRequest.parse(body);
                LedgerEntry entry = request.toEntry(ledgerService);
                responseWriter.writeJson(exchange, 201, json.ledgerEntry(entry));
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }
        responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
    }
}
