package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;

final class PdfHandler implements HttpHandler {

    private final FinancialReportGenerator reportGenerator;
    private final FinancialReportPdfExporter pdfExporter;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpQueryParams queryParams;

    PdfHandler(FinancialReportGenerator reportGenerator, FinancialReportPdfExporter pdfExporter,
               AuthTokenService authTokenService, FinanceHttpResponseWriter responseWriter,
               FinanceHttpQueryParams queryParams) {
        this.reportGenerator = reportGenerator;
        this.pdfExporter = pdfExporter;
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
        byte[] pdf = pdfExporter.render(report);
        responseWriter.writeBytes(exchange, 200, "application/pdf", pdf);
    }
}
