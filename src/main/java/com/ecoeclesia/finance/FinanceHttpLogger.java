package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

final class FinanceHttpLogger {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm:ss");

    void logRequest(HttpExchange exchange, long elapsedMillis, int status) {
        String line = "[%s] %s %s %d %dms".formatted(
                now(),
                exchange.getRequestMethod(),
                exchange.getRequestURI(),
                status,
                elapsedMillis);
        System.out.println(line);
    }

    void logEvent(String message) {
        System.out.println("[%s] %s".formatted(now(), message));
    }

    private String now() {
        return OffsetDateTime.now().format(FORMATTER);
    }
}
