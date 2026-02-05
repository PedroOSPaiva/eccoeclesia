package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;

final class BirthdaysHandler implements HttpHandler {

    private final FinanceHttpResponseWriter responseWriter;

    BirthdaysHandler(FinanceHttpResponseWriter responseWriter) {
        this.responseWriter = responseWriter;
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
        responseWriter.writeJson(exchange, 200,
                "[" +
                        "{\"id\":\"a1\",\"name\":\"Ana Bezerra\",\"birthDate\":\"1992-05-15\",\"ministry\":\"Pastoral Infantil\",\"contact\":\"(11) 99999-1234\"}," +
                        "{\"id\":\"b2\",\"name\":\"Bruno Carvalho\",\"birthDate\":\"1987-06-03\",\"ministry\":\"Liturgia\",\"contact\":\"bruno@paroquia.com\"}," +
                        "{\"id\":\"c3\",\"name\":\"Carla Dias\",\"birthDate\":\"1995-04-28\",\"ministry\":\"Música\",\"contact\":\"(11) 98888-4321\"}," +
                        "{\"id\":\"d4\",\"name\":\"Daniel Souza\",\"birthDate\":\"1980-05-30\",\"ministry\":\"Juventude\",\"contact\":\"daniel@paroquia.com\"}," +
                        "{\"id\":\"e5\",\"name\":\"Elisa Tavares\",\"birthDate\":\"1999-12-02\",\"ministry\":\"Acolhida\",\"contact\":\"(11) 97777-0000\"}" +
                        "]");
    }
}
