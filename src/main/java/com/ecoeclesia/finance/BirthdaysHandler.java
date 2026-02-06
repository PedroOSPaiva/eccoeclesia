package com.ecoeclesia.finance;

import com.ecoeclesia.birthday.BirthdayPerson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.Map;

final class BirthdaysHandler implements HttpHandler {

    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final BirthdayCatalog catalog;

    BirthdaysHandler(FinanceHttpResponseWriter responseWriter, FinanceHttpJson json, Path dataFile) {
        this.responseWriter = responseWriter;
        this.json = json;
        this.catalog = new BirthdayCatalog(dataFile);
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 204, "");
            return;
        }
        String method = exchange.getRequestMethod();
        String path = exchange.getRequestURI().getPath();

        if ("GET".equalsIgnoreCase(method)) {
            responseWriter.writeJson(exchange, 200, json.birthdays(catalog.list()));
            return;
        }

        if ("POST".equalsIgnoreCase(method)) {
            Map<String, String> values = parseBody(exchange);
            try {
                BirthdayPerson created = catalog.create(
                        values.get("name"),
                        values.get("birthDate"),
                        values.get("ministry"),
                        values.get("contact"));
                responseWriter.writeJson(exchange, 201, json.birthday(created));
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }

        if ("PUT".equalsIgnoreCase(method)) {
            String id = extractId(path);
            if (id == null) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"Invalid path\"}");
                return;
            }
            Map<String, String> values = parseBody(exchange);
            try {
                BirthdayPerson updated = catalog.update(
                        id,
                        values.get("name"),
                        values.get("birthDate"),
                        values.get("ministry"),
                        values.get("contact"));
                responseWriter.writeJson(exchange, 200, json.birthday(updated));
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }

        if ("DELETE".equalsIgnoreCase(method)) {
            String id = extractId(path);
            if (id == null) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"Invalid path\"}");
                return;
            }
            try {
                catalog.delete(id);
                responseWriter.writeJson(exchange, 204, "");
            } catch (IllegalArgumentException ex) {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
            }
            return;
        }

        responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
    }

    private Map<String, String> parseBody(HttpExchange exchange) throws IOException {
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        return FinanceSimpleJsonParser.parse(body);
    }

    private String extractId(String path) {
        if (path == null) {
            return null;
        }
        String[] parts = path.split("/");
        if (parts.length < 4) {
            return null;
        }
        String id = parts[3];
        if (id == null || id.isBlank()) {
            return null;
        }
        return id;
    }
}
