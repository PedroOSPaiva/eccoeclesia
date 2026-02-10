package com.ecoeclesia.finance;

import com.ecoeclesia.birthday.BirthdayService;
import com.ecoeclesia.birthday.BirthdaySummary;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.List;
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
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        responseWriter.writeJson(exchange, 200, birthdaysJson());
    }

    private String birthdaysJson() {
        List<BirthdaySummary> birthdays = birthdayService.listUpcomingBirthdays();
        StringJoiner joiner = new StringJoiner(",", "[", "]");
        for (BirthdaySummary summary : birthdays) {
            joiner.add(new StringBuilder("{")
                    .append("\"id\":\"").append(json.escape(summary.id())).append("\",")
                    .append("\"name\":\"").append(json.escape(summary.name())).append("\",")
                    .append("\"birthDate\":\"").append(json.escape(summary.birthDate().toString())).append("\",")
                    .append("\"ministry\":\"").append(json.escape(summary.ministry())).append("\",")
                    .append("\"contact\":\"").append(json.escape(summary.contact())).append("\",")
                    .append("\"nextBirthday\":\"").append(json.escape(summary.nextBirthday().toString())).append("\",")
                    .append("\"turningAge\":").append(summary.turningAge()).append(",")
                    .append("\"daysUntilBirthday\":").append(summary.daysUntilBirthday())
                    .append("}")
                    .toString());
        }
        return joiner.toString();
    }
}
