package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

final class CsvHandler implements HttpHandler {

    private final FinancialReportGenerator reportGenerator;
    private final FinancialReportSpreadsheetExporter spreadsheetExporter;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpQueryParams queryParams;

    CsvHandler(FinancialReportGenerator reportGenerator, FinancialReportSpreadsheetExporter spreadsheetExporter,
               AuthTokenService authTokenService, FinanceHttpResponseWriter responseWriter,
               FinanceHttpQueryParams queryParams) {
        this.reportGenerator = reportGenerator;
        this.spreadsheetExporter = spreadsheetExporter;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
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
        String csv = spreadsheetExporter.toCsv(report);
        byte[] data = csv.getBytes(StandardCharsets.UTF_8);
        responseWriter.writeBytes(exchange, 200, "text/csv; charset=utf-8", data);
    }
}
