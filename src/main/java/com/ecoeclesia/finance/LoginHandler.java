package com.ecoeclesia.finance;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

final class LoginHandler implements HttpHandler {

    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;

    LoginHandler(AuthTokenService authTokenService, FinanceHttpResponseWriter responseWriter, FinanceHttpJson json) {
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, String> values = FinanceSimpleJsonParser.parse(body);
        try {
            AuthTokens tokens = authTokenService.login(values.get("email"), values.get("password"));
            responseWriter.writeJson(exchange, 200, json.tokens(tokens));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }
}
