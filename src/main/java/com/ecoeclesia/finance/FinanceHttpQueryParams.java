package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import java.time.LocalDate;

final class FinanceHttpQueryParams {

    LocalDate getDate(HttpExchange exchange, String key) {
        return getDate(exchange, key, null);
    }

    LocalDate getDate(HttpExchange exchange, String key, LocalDate fallback) {
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
}
