package com.ecoeclesia.finance;

import com.ecoeclesia.birthday.BirthdayService;
import com.ecoeclesia.birthday.BirthdaySummary;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

final class BirthdaysHandler implements HttpHandler {

    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;
    private final BirthdayService birthdayService;

    BirthdaysHandler(FinanceHttpResponseWriter responseWriter, FinanceHttpJson json, BirthdayService birthdayService) {
        this.responseWriter = responseWriter;
        this.json = json;
        this.birthdayService = birthdayService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 204, "");
            return;
        }
        if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                handleCreate(exchange);
                return;
            }
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        responseWriter.writeJson(exchange, 200, birthdaysJson());
    }

    private void handleCreate(HttpExchange exchange) throws IOException {
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, String> values = FinanceSimpleJsonParser.parse(body);
        try {
            BirthdaySummary created = birthdayService.registerBirthday(
                    values.get("name"),
                    parseBirthDate(values.get("birthDate")),
                    values.get("ministry"),
                    values.get("contact"));
            responseWriter.writeJson(exchange, 201, birthdayJson(created));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }

    private LocalDate parseBirthDate(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Data de nascimento é obrigatória");
        }
        try {
            return LocalDate.parse(value.trim());
        } catch (Exception ex) {
            throw new IllegalArgumentException("Data de nascimento inválida");
        }
    }

    private String birthdaysJson() {
        List<BirthdaySummary> birthdays = birthdayService.listUpcomingBirthdays();
        StringJoiner joiner = new StringJoiner(",", "[", "]");
        for (BirthdaySummary summary : birthdays) {
            joiner.add(birthdayJson(summary));
        }
        return joiner.toString();
    }

    private String birthdayJson(BirthdaySummary summary) {
        return new StringBuilder("{")
                .append("\"id\":\"").append(json.escape(summary.id())).append("\",")
                .append("\"name\":\"").append(json.escape(summary.name())).append("\",")
                .append("\"birthDate\":\"").append(json.escape(summary.birthDate().toString())).append("\",")
                .append("\"ministry\":\"").append(json.escape(summary.ministry())).append("\",")
                .append("\"contact\":\"").append(json.escape(summary.contact())).append("\",")
                .append("\"nextBirthday\":\"").append(json.escape(summary.nextBirthday().toString())).append("\",")
                .append("\"turningAge\":").append(summary.turningAge()).append(",")
                .append("\"daysUntilBirthday\":").append(summary.daysUntilBirthday())
                .append("}")
                .toString();
    }
}
