package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Locale;

final class CashflowCsvHandler implements HttpHandler {

    private final CashflowService cashflowService;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpQueryParams queryParams = new FinanceHttpQueryParams();

    CashflowCsvHandler(CashflowService cashflowService, AuthTokenService authTokenService,
                       FinanceHttpResponseWriter responseWriter) {
        this.cashflowService = cashflowService;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
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
                    parseReceivableStatus(queryParams.getString(exchange, "receivableStatus")));
            String csv = toCsv(snapshot);
            responseWriter.writeBytes(exchange, 200, "text/csv; charset=utf-8", csv.getBytes(StandardCharsets.UTF_8));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + ex.getMessage() + "\"}");
        }
    }

    private String toCsv(CashflowSnapshot snapshot) {
        return new StringBuilder()
                .append("metric,value\n")
                .append("totalPayables,").append(snapshot.totalPayables()).append("\n")
                .append("totalReceivables,").append(snapshot.totalReceivables()).append("\n")
                .append("netBalance,").append(snapshot.netBalance()).append("\n")
                .toString();
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }

    private PayableStatus parsePayableStatus(String raw) {
        if (raw == null || raw.isBlank()) {
            return null;
        }
        return PayableStatus.valueOf(raw.trim().toUpperCase(Locale.ROOT));
    }

    private ReceivableStatus parseReceivableStatus(String raw) {
        if (raw == null || raw.isBlank()) {
            return null;
        }
        return ReceivableStatus.valueOf(raw.trim().toUpperCase(Locale.ROOT));
    }
}
