package com.ecoeclesia.finance;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

final class FinanceHttpResponseWriter {

    void writeJson(HttpExchange exchange, int status, String body) throws IOException {
        Headers headers = exchange.getResponseHeaders();
        headers.add("Content-Type", "application/json");
        addCors(headers);
        byte[] payload = body.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(status, payload.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(payload);
        }
    }

    void writeBytes(HttpExchange exchange, int status, String contentType, byte[] data) throws IOException {
        Headers headers = exchange.getResponseHeaders();
        headers.add("Content-Type", contentType);
        addCors(headers);
        exchange.sendResponseHeaders(status, data.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(data);
        }
    }

    private void addCors(Headers headers) {
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    }
}
