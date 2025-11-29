package com.ecoeclesia;

import com.ecoeclesia.expense.ExpenseService;
import com.ecoeclesia.expense.InMemoryExpenseRepository;
import com.ecoeclesia.finance.FinanceHttpServer;

/**
 * Entry point used by the custom build script when developers want to execute
 * a small manual smoke test. The application simply wires together a handful
 * of services and prints a summary to standard output so that we know the
 * classpath compiled correctly.
 */
public final class EcoEcclesiaApplication {

    public static void main(String[] args) {
        var repository = new InMemoryExpenseRepository();
        var service = new ExpenseService(repository);
        service.registerExpense("visitantes", "Coffee for visitors", "25.00");
        System.out.println("EcoEcclesia backend is ready – stored " + service.listExpenses().size() + " expense(s).");
        try {
            var server = FinanceHttpServer.startDefault(8080);
            server.start();
            System.out.println("Finance HTTP server listening on http://localhost:8080");
        } catch (Exception ex) {
            System.err.println("Failed to start Finance HTTP server: " + ex.getMessage());
        }
    }

    private EcoEcclesiaApplication() {
    }
}
