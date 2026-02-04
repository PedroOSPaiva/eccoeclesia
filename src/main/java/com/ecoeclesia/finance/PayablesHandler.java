package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Stream;

final class PayablesHandler implements HttpHandler {

    private final PayableService payableService;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final FinanceHttpLogger logger;
    private final FinanceHttpQueryParams queryParams = new FinanceHttpQueryParams();

    PayablesHandler(PayableService payableService, AuthTokenService authTokenService,
                    FinanceHttpResponseWriter responseWriter, FinanceHttpJson json, FinanceHttpLogger logger) {
        this.payableService = payableService;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
        this.logger = logger;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())
                && !"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            if (!isAllowed(exchange, "finance:read")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            responseWriter.writeJson(exchange, 200, json.payables(filterPayables(exchange)));
            return;
        }
        if (!isAllowed(exchange, "finance:write")) {
            responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
            return;
        }
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, String> values = FinanceSimpleJsonParser.parse(body);
        try {
            PayableEntry created = payableService.create(
                    values.get("description"),
                    parseAmount(values.get("amount")),
                    parseDate(values.get("dueDate")),
                    emptyToNull(values.get("costCenter")),
                    emptyToNull(values.get("recurrence")),
                    parseAttachments(values.get("attachments")),
                    currentUser(exchange));
            logger.logEvent("Payable created: " + created.id());
            responseWriter.writeJson(exchange, 201, json.payable(created));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }

    private BigDecimal parseAmount(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Valor é obrigatório");
        }
        return new BigDecimal(value);
    }

    private LocalDate parseDate(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Data de vencimento é obrigatória");
        }
        return LocalDate.parse(value);
    }

    private List<String> parseAttachments(String value) {
        if (value == null || value.isBlank()) {
            return List.of();
        }
        return Stream.of(value.split(","))
                .map(String::trim)
                .filter(item -> !item.isBlank())
                .toList();
    }

    private String emptyToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    private String currentUser(HttpExchange exchange) {
        var account = authTokenService.accountFor(exchange.getRequestHeaders().getFirst("Authorization"));
        if (account == null) {
            return "system";
        }
        return account.getEmail();
    }

    private List<PayableEntry> filterPayables(HttpExchange exchange) {
        String rawStatus = queryParams.getString(exchange, "status");
        String costCenter = queryParams.getString(exchange, "costCenter");
        LocalDate start = queryParams.getDate(exchange, "start");
        LocalDate end = queryParams.getDate(exchange, "end");
        PayableStatus status = null;
        if (rawStatus != null && !rawStatus.isBlank()) {
            status = PayableStatus.valueOf(rawStatus.trim().toUpperCase(Locale.ROOT));
        }
        PayableStatus finalStatus = status;
        return payableService.list().stream()
                .filter(entry -> finalStatus == null || entry.status() == finalStatus)
                .filter(entry -> costCenter == null
                        || (entry.costCenter() != null && costCenter.equalsIgnoreCase(entry.costCenter())))
                .filter(entry -> start == null || !entry.dueDate().isBefore(start))
                .filter(entry -> end == null || !entry.dueDate().isAfter(end))
                .toList();
    }
}
