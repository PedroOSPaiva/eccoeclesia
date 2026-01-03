package com.ecoeclesia.finance;

import com.sun.net.httpserver.Filter;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;

final class RequestLoggingFilter extends Filter {

    private final FinanceHttpLogger logger;

    RequestLoggingFilter(FinanceHttpLogger logger) {
        this.logger = logger;
    }

    @Override
    public void doFilter(HttpExchange exchange, Chain chain) throws IOException {
        long start = System.nanoTime();
        try {
            chain.doFilter(exchange);
        } finally {
            long elapsedMs = (System.nanoTime() - start) / 1_000_000;
            int status = exchange.getResponseCode();
            if (status == -1) {
                status = 200;
            }
            logger.logRequest(exchange, elapsedMs, status);
        }
    }

    @Override
    public String description() {
        return "Logs HTTP requests";
    }
}
