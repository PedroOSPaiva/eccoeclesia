package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;

final class ReportHandler implements HttpHandler {

    private final FinancialReportGenerator reportGenerator;
    private final FinancialReportFormatter reportFormatter;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final FinanceHttpQueryParams queryParams;

    ReportHandler(FinancialReportGenerator reportGenerator, FinancialReportFormatter reportFormatter,
                  AuthTokenService authTokenService, FinanceHttpResponseWriter responseWriter,
                  FinanceHttpJson json, FinanceHttpQueryParams queryParams) {
        this.reportGenerator = reportGenerator;
        this.reportFormatter = reportFormatter;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
        this.queryParams = queryParams;
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
        FinancialReport report = reportGenerator.generate(
                queryParams.getDate(exchange, "start", LocalDate.now().withDayOfMonth(1)),
                queryParams.getDate(exchange, "end", LocalDate.now()),
                BigDecimal.ZERO);
        String formatted = reportFormatter.render(report);
        responseWriter.writeJson(exchange, 200, "{\"report\":\"" + json.escape(formatted) + "\"}");
    }
}
