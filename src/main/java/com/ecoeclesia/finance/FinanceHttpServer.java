package com.ecoeclesia.finance;

import com.ecoeclesia.config.DatabaseCredentials;
import com.ecoeclesia.config.DatabaseUrlResolver;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.StringJoiner;

/**
 * Minimal HTTP server to expose ledger operations to the React frontend.
 * Agora inclui autenticação básica por token e prefere persistência em banco
 * quando uma URL JDBC é fornecida via variável de ambiente.
 */
public final class FinanceHttpServer {

    private final HttpServer server;
    private final LedgerService ledgerService;
    private final FinancialReportGenerator reportGenerator;
    private final FinancialReportPdfExporter pdfExporter;
    private final FinancialReportSpreadsheetExporter spreadsheetExporter;
    private final AuthTokenService authTokenService;
    private final ChartOfAccounts chart;

    public FinanceHttpServer(int port, LedgerService ledgerService, FinancialReportGenerator reportGenerator,
                             FinancialReportPdfExporter pdfExporter, FinancialReportSpreadsheetExporter spreadsheetExporter,
                             AuthTokenService authTokenService, ChartOfAccounts chart)
            throws IOException {
        this.server = HttpServer.create(new InetSocketAddress(port), 0);
        this.ledgerService = Objects.requireNonNull(ledgerService);
        this.reportGenerator = Objects.requireNonNull(reportGenerator);
        this.pdfExporter = Objects.requireNonNull(pdfExporter);
        this.spreadsheetExporter = Objects.requireNonNull(spreadsheetExporter);
        this.authTokenService = Objects.requireNonNull(authTokenService);
        this.chart = Objects.requireNonNull(chart);
        registerRoutes();
    }

    public static FinanceHttpServer startDefault(int port) throws IOException {
        LedgerRepository repository = chooseRepository();
        ChartOfAccounts chart = ChartOfAccounts.defaultPlan();
        LedgerService ledgerService = new LedgerService(repository, chart);
        FinancialReportGenerator generator = new FinancialReportGenerator(repository, chart);
        return new FinanceHttpServer(port, ledgerService, generator,
                new FinancialReportPdfExporter(chart), new FinancialReportSpreadsheetExporter(), new AuthTokenService(), chart);
    }

    private static LedgerRepository chooseRepository() {
        String raw = System.getenv("FINANCE_DB_URL");
        if (raw == null || raw.isBlank()) {
            raw = System.getenv("DATABASE_URL");
        }

        String configuredUrl = raw;
        if (configuredUrl != null && !configuredUrl.isBlank()) {
            DatabaseCredentials credentials = DatabaseUrlResolver.resolve(configuredUrl)
                    .orElseGet(() -> new DatabaseCredentials(configuredUrl, null, null));
            String username = credentials.username() != null ? credentials.username() : System.getenv("FINANCE_DB_USER");
            String password = credentials.password() != null ? credentials.password() : System.getenv("FINANCE_DB_PASSWORD");
            DataSource dataSource = new SimpleDataSource(credentials.jdbcUrl(), username, password);
            return new SqlLedgerRepository(new JdbcLedgerGateway(dataSource));
        }
        return new DatabaseLedgerRepository(Path.of("data", "ledger-db.csv"));
    }

    public void start() {
        server.start();
    }

    public void stop() {
        server.stop(0);
    }

    private void registerRoutes() {
        server.createContext("/api/auth/login", new LoginHandler());
        server.createContext("/api/auth/refresh", new RefreshHandler());
        server.createContext("/api/ledger", new LedgerHandler());
        server.createContext("/api/ledger/chart", new ChartHandler());
        server.createContext("/api/reports/ledger", new ReportHandler());
        server.createContext("/api/reports/ledger.pdf", new PdfHandler());
        server.createContext("/api/reports/ledger.csv", new CsvHandler());
    }

    private final class ChartHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                writeCors(exchange, 405, "{\\\"error\\\":\\\"Method not allowed\\\"}");
                return;
            }
            if (!authTokenService.isAllowed(exchange.getRequestHeaders().getFirst("Authorization"), "finance:read")) {
                writeCors(exchange, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }
            writeCors(exchange, 200, toJsonChart(chart.all()));
        }
    }

    private final class LedgerHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                writeCors(exchange, 204, "");
                return;
            }
            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                if (!authTokenService.isAllowed(exchange.getRequestHeaders().getFirst("Authorization"), "finance:read")) {
                    writeCors(exchange, 401, "{\"error\":\"Unauthorized\"}");
                    return;
                }
                LocalDate start = queryDate(exchange, "start");
                LocalDate end = queryDate(exchange, "end");
                List<LedgerEntry> entries = start != null && end != null
                        ? ledgerService.findByPeriod(start, end)
                        : ledgerService.listAll();
                writeCors(exchange, 200, toJson(entries));
                return;
            }
            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                if (!authTokenService.isAllowed(exchange.getRequestHeaders().getFirst("Authorization"), "finance:write")) {
                    writeCors(exchange, 401, "{\"error\":\"Unauthorized\"}");
                    return;
                }
                String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                try {
                    LedgerRequest request = LedgerRequest.parse(body);
                    LedgerEntry entry = request.toEntry(ledgerService);
                    writeCors(exchange, 201, toJsonEntry(entry));
                } catch (IllegalArgumentException ex) {
                    writeCors(exchange, 400, "{\"error\":\"" + escape(ex.getMessage()) + "\"}");
                }
                return;
            }
            writeCors(exchange, 405, "{\"error\":\"Method not allowed\"}");
        }
    }

    private final class ReportHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                writeCors(exchange, 405, "{\\\"error\\\":\\\"Method not allowed\\\"}");
                return;
            }
            if (!authTokenService.isAllowed(exchange.getRequestHeaders().getFirst("Authorization"), "finance:read")) {
                writeCors(exchange, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }
            FinancialReport report = reportGenerator.generate(
                    queryDate(exchange, "start", LocalDate.now().withDayOfMonth(1)),
                    queryDate(exchange, "end", LocalDate.now()),
                    BigDecimal.ZERO);
            String formatted = new FinancialReportFormatter().render(report);
            writeCors(exchange, 200, "{\\\"report\\\":\\\"" + escape(formatted) + "\\\"}");
        }
    }

    private final class PdfHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                writeCors(exchange, 405, "{\\\"error\\\":\\\"Method not allowed\\\"}");
                return;
            }
            if (!authTokenService.isAllowed(exchange.getRequestHeaders().getFirst("Authorization"), "finance:read")) {
                writeCors(exchange, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }
            FinancialReport report = reportGenerator.generate(
                    queryDate(exchange, "start", LocalDate.now().withDayOfMonth(1)),
                    queryDate(exchange, "end", LocalDate.now()),
                    BigDecimal.ZERO);
            byte[] pdf = pdfExporter.render(report);
            Headers headers = exchange.getResponseHeaders();
            headers.add("Content-Type", "application/pdf");
            headers.add("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(200, pdf.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(pdf);
            }
        }
    }

    private final class CsvHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                writeCors(exchange, 405, "{\\\"error\\\":\\\"Method not allowed\\\"}");
                return;
            }
            if (!authTokenService.isAllowed(exchange.getRequestHeaders().getFirst("Authorization"), "finance:read")) {
                writeCors(exchange, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }
            FinancialReport report = reportGenerator.generate(
                    queryDate(exchange, "start", LocalDate.now().withDayOfMonth(1)),
                    queryDate(exchange, "end", LocalDate.now()),
                    BigDecimal.ZERO);
            String csv = spreadsheetExporter.toCsv(report);
            Headers headers = exchange.getResponseHeaders();
            headers.add("Content-Type", "text/csv; charset=utf-8");
            headers.add("Access-Control-Allow-Origin", "*");
            byte[] data = csv.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, data.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(data);
            }
        }
    }

    private final class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                writeCors(exchange, 405, "{\\\"error\\\":\\\"Method not allowed\\\"}");
                return;
            }
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Map<String, String> values = SimpleJsonParser.parse(body);
            try {
                AuthTokens tokens = authTokenService.login(values.get("email"), values.get("password"));
                writeCors(exchange, 200, toJson(tokens));
            } catch (IllegalArgumentException ex) {
                writeCors(exchange, 400, "{\"error\":\"" + escape(ex.getMessage()) + "\"}");
            }
        }
    }

    private final class RefreshHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                writeCors(exchange, 405, "{\\\"error\\\":\\\"Method not allowed\\\"}");
                return;
            }
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Map<String, String> values = SimpleJsonParser.parse(body);
            try {
                AuthTokens tokens = authTokenService.refresh(values.get("refreshToken"));
                writeCors(exchange, 200, toJson(tokens));
            } catch (IllegalArgumentException ex) {
                writeCors(exchange, 400, "{\"error\":\"" + escape(ex.getMessage()) + "\"}");
            }
        }
    }

    private void writeCors(HttpExchange exchange, int status, String body) throws IOException {
        Headers headers = exchange.getResponseHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        byte[] payload = body.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(status, payload.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(payload);
        }
    }

    private LocalDate queryDate(HttpExchange exchange, String key) {
        return queryDate(exchange, key, null);
    }

    private LocalDate queryDate(HttpExchange exchange, String key, LocalDate fallback) {
        String query = exchange.getRequestURI().getQuery();
        if (query == null || query.isBlank()) {
            return fallback;
        }
        for (String token : query.split("&")) {
            String[] kv = token.split("=");
            if (kv.length == 2 && kv[0].equalsIgnoreCase(key) && !kv[1].isBlank()) {
                return LocalDate.parse(kv[1]);
            }
        }
        return fallback;
    }

    private String toJson(List<LedgerEntry> entries) {
        StringJoiner joiner = new StringJoiner(",", "{\"items\":[", "]}");
        for (LedgerEntry entry : entries) {
            joiner.add(toJsonEntry(entry));
        }
        return joiner.toString();
    }

    private String toJsonChart(Collection<ChartOfAccount> accounts) {
        StringJoiner joiner = new StringJoiner(",", "{\"accounts\":[", "]}");
        for (ChartOfAccount account : accounts) {
            joiner.add(new StringBuilder("{")
                    .append("\"code\":\"").append(escape(account.code())).append("\",")
                    .append("\"classification\":\"").append(escape(account.classification())).append("\",")
                    .append("\"type\":\"").append(escape(account.type())).append("\",")
                    .append("\"description\":\"").append(escape(account.description())).append("\",")
                    .append("\"nature\":\"").append(account.nature().name()).append("\"")
                    .append("}").toString());
        }
        return joiner.toString();
    }

    private String toJsonEntry(LedgerEntry entry) {
        return new StringBuilder("{")
                .append("\"id\":\"").append(escape(entry.id())).append("\",")
                .append("\"accountCode\":\"").append(escape(entry.accountCode())).append("\",")
                .append("\"referenceCode\":\"").append(escape(entry.referenceCode())).append("\",")
                .append("\"costCenter\":\"").append(escape(entry.costCenter())).append("\",")
                .append("\"description\":\"").append(escape(entry.description())).append("\",")
                .append("\"amount\":\"").append(entry.amount().toPlainString()).append("\",")
                .append("\"type\":\"").append(entry.type().name()).append("\",")
                .append("\"occurredOn\":\"").append(entry.occurredOn()).append("\"")
                .append("}")
                .toString();
    }

    private String toJson(AuthTokens tokens) {
        return new StringBuilder("{")
                .append("\"accessToken\":\"").append(escape(tokens.accessToken())).append("\",")
                .append("\"refreshToken\":\"").append(escape(tokens.refreshToken())).append("\",")
                .append("\"tokenType\":\"").append(tokens.tokenType()).append("\",")
                .append("\"role\":\"").append(tokens.role()).append("\",")
                .append("\"permissions\":[")
                .append(String.join(",", tokens.permissions().stream().map(p -> "\"" + escape(p) + "\"").toList()))
                .append("]}")
                .toString();
    }

    private String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n");
    }

    private record LedgerRequest(String type, String accountCode, String description, String amount,
                                 String referenceCode, String costCenter, String occurredOn) {
        LedgerEntry toEntry(LedgerService service) {
            BigDecimal value = new BigDecimal(amount);
            LocalDate date = occurredOn == null || occurredOn.isBlank() ? LocalDate.now() : LocalDate.parse(occurredOn);
            if (LedgerEntryType.INCOME.name().equalsIgnoreCase(type)) {
                return service.recordIncome(accountCode, value, description, referenceCode, costCenter, date);
            }
            if (LedgerEntryType.EXPENSE.name().equalsIgnoreCase(type)) {
                return service.recordExpense(accountCode, value, description, referenceCode, costCenter, date);
            }
            throw new IllegalArgumentException("type must be INCOME or EXPENSE");
        }

        static LedgerRequest parse(String json) {
            Map<String, String> values = SimpleJsonParser.parse(json);
            return new LedgerRequest(
                    values.getOrDefault("type", ""),
                    values.getOrDefault("accountCode", ""),
                    values.getOrDefault("description", ""),
                    values.getOrDefault("amount", "0"),
                    values.getOrDefault("referenceCode", ""),
                    values.getOrDefault("costCenter", ""),
                    values.getOrDefault("occurredOn", "")
            );
        }
    }

    private static final class SimpleJsonParser {
        static Map<String, String> parse(String json) {
            String trimmed = json.trim();
            if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
                trimmed = trimmed.substring(1, trimmed.length() - 1);
            }
            List<String> tokens = splitRespectingQuotes(trimmed);
            java.util.Map<String, String> values = new java.util.HashMap<>();
            for (String token : tokens) {
                String[] kv = token.split(":", 2);
                if (kv.length != 2) continue;
                String key = stripQuotes(kv[0]);
                String value = stripQuotes(kv[1]);
                values.put(key, value);
            }
            return values;
        }

        private static List<String> splitRespectingQuotes(String input) {
            List<String> parts = new ArrayList<>();
            StringBuilder current = new StringBuilder();
            boolean inQuotes = false;
            for (char ch : input.toCharArray()) {
                if (ch == '"') {
                    inQuotes = !inQuotes;
                }
                if (ch == ',' && !inQuotes) {
                    parts.add(current.toString());
                    current.setLength(0);
                } else {
                    current.append(ch);
                }
            }
            if (current.length() > 0) {
                parts.add(current.toString());
            }
            return parts;
        }

        private static String stripQuotes(String token) {
            String trimmed = token.trim();
            if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
                return trimmed.substring(1, trimmed.length() - 1);
            }
            return trimmed;
        }
    }
}
