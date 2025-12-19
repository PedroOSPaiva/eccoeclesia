package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpServer;
import javax.sql.DataSource;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Path;
import java.util.Objects;
import com.ecoeclesia.config.DatabaseCredentials;
import com.ecoeclesia.config.DatabaseUrlResolver;

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
    private final FinanceHttpJson json;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpQueryParams queryParams;

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
        this.json = new FinanceHttpJson();
        this.responseWriter = new FinanceHttpResponseWriter();
        this.queryParams = new FinanceHttpQueryParams();
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
        server.createContext("/api/auth/login", new LoginHandler(authTokenService, responseWriter, json));
        server.createContext("/api/auth/refresh", new RefreshHandler(authTokenService, responseWriter, json));
        server.createContext("/api/ledger", new LedgerHandler(ledgerService, authTokenService, responseWriter, json, queryParams));
        server.createContext("/api/ledger/chart", new ChartHandler(chart, authTokenService, responseWriter, json));
        server.createContext("/api/reports/ledger",
                new ReportHandler(reportGenerator, new FinancialReportFormatter(), authTokenService, responseWriter, json, queryParams));
        server.createContext("/api/reports/ledger.pdf",
                new PdfHandler(reportGenerator, pdfExporter, authTokenService, responseWriter, queryParams));
        server.createContext("/api/reports/ledger.csv",
                new CsvHandler(reportGenerator, spreadsheetExporter, authTokenService, responseWriter, queryParams));
    }
}
