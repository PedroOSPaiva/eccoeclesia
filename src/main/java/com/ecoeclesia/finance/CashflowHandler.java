package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.Locale;

final class CashflowHandler implements HttpHandler {

    private final CashflowService cashflowService;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final FinanceHttpQueryParams queryParams = new FinanceHttpQueryParams();

    CashflowHandler(CashflowService cashflowService, AuthTokenService authTokenService,
                    FinanceHttpResponseWriter responseWriter, FinanceHttpJson json) {
        this.cashflowService = cashflowService;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 204, "");
            return;
        }
        if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        if (!isAllowed(exchange, "finance:read")) {
            responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
            return;
        }
        try {
            CashflowSnapshot snapshot = cashflowService.snapshot(
                    queryParams.getDate(exchange, "start"),
                    queryParams.getDate(exchange, "end"),
                    parsePayableStatus(queryParams.getString(exchange, "payableStatus")),
                    parseReceivableStatus(queryParams.getString(exchange, "receivableStatus")),
                    queryParams.getString(exchange, "costCenter"));
            responseWriter.writeJson(exchange, 200, json.cashflow(snapshot));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }

    private PayableStatus parsePayableStatus(String raw) {
        if (raw == null || raw.isBlank()) {
            return null;
        }
        try {
            return PayableStatus.valueOf(raw.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Status de contas a pagar inválido");
        }
    }

    private ReceivableStatus parseReceivableStatus(String raw) {
        if (raw == null || raw.isBlank()) {
            return null;
        }
        try {
            return ReceivableStatus.valueOf(raw.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Status de contas a receber inválido");
        }
    }
}
