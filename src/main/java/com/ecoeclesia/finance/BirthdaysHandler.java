package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.StringJoiner;

final class BirthdaysHandler implements HttpHandler {

    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final Path dataFile;

    BirthdaysHandler(FinanceHttpResponseWriter responseWriter, FinanceHttpJson json, Path dataFile) {
        this.responseWriter = responseWriter;
        this.json = json;
        this.dataFile = dataFile;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 204, "");
            return;
        }
        if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        responseWriter.writeJson(exchange, 200, birthdaysJson());
    }

    private String birthdaysJson() throws IOException {
        if (!Files.exists(dataFile)) {
            return "[]";
        }
        List<String> lines = Files.readAllLines(dataFile, StandardCharsets.UTF_8);
        StringJoiner joiner = new StringJoiner(",", "[", "]");
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                continue;
            }
            String[] parts = trimmed.split(",");
            if (parts.length < 5) {
                continue;
            }
            joiner.add(new StringBuilder("{")
                    .append("\"id\":\"").append(json.escape(parts[0].trim())).append("\",")
                    .append("\"name\":\"").append(json.escape(parts[1].trim())).append("\",")
                    .append("\"birthDate\":\"").append(json.escape(parts[2].trim())).append("\",")
                    .append("\"ministry\":\"").append(json.escape(parts[3].trim())).append("\",")
                    .append("\"contact\":\"").append(json.escape(parts[4].trim())).append("\"")
                    .append("}")
                    .toString());
        }
        return joiner.toString();
    }
}
