package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.StringJoiner;
import java.util.UUID;

final class BirthdaysHandler implements HttpHandler {

    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final Path dataFile;
    private final AuthTokenService authTokenService;

    BirthdaysHandler(FinanceHttpResponseWriter responseWriter, FinanceHttpJson json, Path dataFile,
                     AuthTokenService authTokenService) {
        this.responseWriter = responseWriter;
        this.json = json;
        this.dataFile = dataFile;
        this.authTokenService = authTokenService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 204, "");
            return;
        }
        String method = exchange.getRequestMethod();
        if ("GET".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "birthdays:read")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            responseWriter.writeJson(exchange, 200, birthdaysJson());
            return;
        }
        if ("POST".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "birthdays:write")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            handleCreate(exchange);
            return;
        }
        if ("PUT".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "birthdays:write")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            handleUpdate(exchange);
            return;
        }
        if ("DELETE".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "birthdays:write")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            handleDelete(exchange);
            return;
        }
        responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
    }

    private String birthdaysJson() throws IOException {
        List<BirthdayEntry> entries = readBirthdays();
        StringJoiner joiner = new StringJoiner(",", "[", "]");
        for (BirthdayEntry entry : entries) {
            joiner.add(entry.toJson(json));
        }
        return joiner.toString();
    }

    private void handleCreate(HttpExchange exchange) throws IOException {
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        var values = FinanceSimpleJsonParser.parse(body);
        try {
            String id = values.get("id");
            if (id == null || id.isBlank()) {
                id = UUID.randomUUID().toString();
            }
            BirthdayEntry entry = new BirthdayEntry(
                    id,
                    require(values.get("name"), "Nome é obrigatório"),
                    require(values.get("birthDate"), "Data de nascimento é obrigatória"),
                    require(values.get("ministry"), "Ministério é obrigatório"),
                    require(values.get("contact"), "Contato é obrigatório"));
            List<BirthdayEntry> entries = readBirthdays();
            entries.add(entry);
            persist(entries);
            responseWriter.writeJson(exchange, 201, entry.toJson(json));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }

    private void handleUpdate(HttpExchange exchange) throws IOException {
        String id = extractId(exchange);
        if (id == null) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"Invalid path\"}");
            return;
        }
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        var values = FinanceSimpleJsonParser.parse(body);
        List<BirthdayEntry> entries = readBirthdays();
        BirthdayEntry existing = entries.stream()
                .filter(entry -> entry.id().equals(id))
                .findFirst()
                .orElse(null);
        if (existing == null) {
            responseWriter.writeJson(exchange, 404, "{\"error\":\"Not found\"}");
            return;
        }
        BirthdayEntry updated = new BirthdayEntry(
                id,
                valueOrDefault(values.get("name"), existing.name()),
                valueOrDefault(values.get("birthDate"), existing.birthDate()),
                valueOrDefault(values.get("ministry"), existing.ministry()),
                valueOrDefault(values.get("contact"), existing.contact()));
        entries.removeIf(entry -> entry.id().equals(id));
        entries.add(updated);
        persist(entries);
        responseWriter.writeJson(exchange, 200, updated.toJson(json));
    }

    private void handleDelete(HttpExchange exchange) throws IOException {
        String id = extractId(exchange);
        if (id == null) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"Invalid path\"}");
            return;
        }
        List<BirthdayEntry> entries = readBirthdays();
        boolean removed = entries.removeIf(entry -> entry.id().equals(id));
        if (!removed) {
            responseWriter.writeJson(exchange, 404, "{\"error\":\"Not found\"}");
            return;
        }
        persist(entries);
        responseWriter.writeJson(exchange, 204, "");
    }

    private List<BirthdayEntry> readBirthdays() throws IOException {
        if (!Files.exists(dataFile)) {
            return new ArrayList<>();
        }
        List<BirthdayEntry> entries = new ArrayList<>();
        for (String line : Files.readAllLines(dataFile, StandardCharsets.UTF_8)) {
            String trimmed = line.trim();
            if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                continue;
            }
            String[] parts = trimmed.split(",", -1);
            if (parts.length < 5) {
                continue;
            }
            entries.add(new BirthdayEntry(
                    parts[0].trim(),
                    parts[1].trim(),
                    parts[2].trim(),
                    parts[3].trim(),
                    parts[4].trim()));
        }
        entries.sort(Comparator.comparing(BirthdayEntry::birthDate));
        return entries;
    }

    private void persist(List<BirthdayEntry> entries) throws IOException {
        Files.createDirectories(dataFile.getParent());
        List<String> lines = new ArrayList<>();
        lines.add("# id,name,birthDate,ministry,contact");
        for (BirthdayEntry entry : entries) {
            lines.add(String.join(",", entry.id(), entry.name(), entry.birthDate(), entry.ministry(), entry.contact()));
        }
        Files.write(dataFile, lines, StandardCharsets.UTF_8);
    }

    private String require(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(message);
        }
        return value.trim();
    }

    private String valueOrDefault(String value, String fallback) {
        if (value == null || value.isBlank()) {
            return fallback;
        }
        return value.trim();
    }

    private String extractId(HttpExchange exchange) {
        String path = exchange.getRequestURI().getPath();
        String[] parts = path.split("/");
        if (parts.length < 4) {
            return null;
        }
        return parts[3];
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }

    private record BirthdayEntry(String id, String name, String birthDate, String ministry, String contact) {
        String toJson(FinanceHttpJson json) {
            return new StringBuilder("{")
                    .append("\"id\":\"").append(json.escape(id)).append("\",")
                    .append("\"name\":\"").append(json.escape(name)).append("\",")
                    .append("\"birthDate\":\"").append(json.escape(birthDate)).append("\",")
                    .append("\"ministry\":\"").append(json.escape(ministry)).append("\",")
                    .append("\"contact\":\"").append(json.escape(contact)).append("\"")
                    .append("}")
                    .toString();
        }
    }
}
