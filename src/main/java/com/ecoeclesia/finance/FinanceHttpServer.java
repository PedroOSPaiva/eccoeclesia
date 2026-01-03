package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpServer;
import javax.sql.DataSource;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Path;
import java.util.Objects;
import com.ecoeclesia.config.DatabaseCredentials;
import com.ecoeclesia.config.DatabaseUrlResolver;
import com.ecoeclesia.user.UserManagementController;

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
    private final UserManagementController users;
    private final PayableService payableService;
    private final ReceivableService receivableService;
    private final FinanceHttpLogger logger;

    public FinanceHttpServer(int port, LedgerService ledgerService, FinancialReportGenerator reportGenerator,
                             FinancialReportPdfExporter pdfExporter, FinancialReportSpreadsheetExporter spreadsheetExporter,
                             AuthTokenService authTokenService, ChartOfAccounts chart, UserManagementController users,
                             PayableService payableService, ReceivableService receivableService,
                             FinanceHttpLogger logger)
            throws IOException {
        this.server = HttpServer.create(new InetSocketAddress(port), 0);
        this.ledgerService = Objects.requireNonNull(ledgerService);
        this.reportGenerator = Objects.requireNonNull(reportGenerator);
        this.pdfExporter = Objects.requireNonNull(pdfExporter);
        this.spreadsheetExporter = Objects.requireNonNull(spreadsheetExporter);
        this.authTokenService = Objects.requireNonNull(authTokenService);
        this.chart = Objects.requireNonNull(chart);
        this.users = Objects.requireNonNull(users);
        this.payableService = Objects.requireNonNull(payableService);
        this.receivableService = Objects.requireNonNull(receivableService);
        this.logger = Objects.requireNonNull(logger);
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
        UserManagementController users = new UserManagementController();
        AuthTokenService authTokenService = new AuthTokenService(users);
        PayableService payableService = new PayableService(new InMemoryPayableRepository());
        ReceivableService receivableService = new ReceivableService(new InMemoryReceivableRepository());
        FinanceHttpLogger logger = new FinanceHttpLogger();
        return new FinanceHttpServer(port, ledgerService, generator,
                new FinancialReportPdfExporter(chart), new FinancialReportSpreadsheetExporter(),
                authTokenService, chart, users, payableService, receivableService, logger);
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
        createContext("/api/auth/login", new LoginHandler(authTokenService, responseWriter, json));
        createContext("/api/auth/refresh", new RefreshHandler(authTokenService, responseWriter, json));
        createContext("/api/auth/password", new PasswordChangeHandler(authTokenService, responseWriter, json));
        createContext("/api/ledger", new LedgerHandler(ledgerService, authTokenService, responseWriter, json, queryParams));
        createContext("/api/ledger/chart", new ChartHandler(chart, authTokenService, responseWriter, json));
        createContext("/api/reports/ledger",
                new ReportHandler(reportGenerator, new FinancialReportFormatter(), authTokenService, responseWriter, json, queryParams));
        createContext("/api/reports/ledger.pdf",
                new PdfHandler(reportGenerator, pdfExporter, authTokenService, responseWriter, queryParams));
        createContext("/api/reports/ledger.csv",
                new CsvHandler(reportGenerator, spreadsheetExporter, authTokenService, responseWriter, queryParams));
        createContext("/api/users", new UsersHandler(authTokenService, users, responseWriter, json));
        createContext("/api/payables", new PayablesHandler(payableService, authTokenService, responseWriter, json, logger));
        createContext("/api/payables/", new PayablesStatusHandler(payableService, authTokenService, responseWriter, json, logger));
        createContext("/api/receivables", new ReceivablesHandler(receivableService, authTokenService, responseWriter, json, logger));
        createContext("/api/receivables/", new ReceivablesStatusHandler(receivableService, authTokenService, responseWriter, json, logger));
    }

    private void createContext(String path, com.sun.net.httpserver.HttpHandler handler) {
        var context = server.createContext(path, handler);
        context.getFilters().add(new RequestLoggingFilter(logger));
    }
}
