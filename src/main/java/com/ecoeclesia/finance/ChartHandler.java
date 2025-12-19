package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;

final class ChartHandler implements HttpHandler {

    private final ChartOfAccounts chart;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;

    ChartHandler(ChartOfAccounts chart, AuthTokenService authTokenService,
                 FinanceHttpResponseWriter responseWriter, FinanceHttpJson json) {
        this.chart = chart;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        if (!authTokenService.isAllowed(exchange.getRequestHeaders().getFirst("Authorization"), "finance:read")) {
            responseWriter.writeJson(exchange, 401, "{\"error\":\"Unauthorized\"}");
            return;
        }
        responseWriter.writeJson(exchange, 200, json.chart(chart.all()));
    }
}
