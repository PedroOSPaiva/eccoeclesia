package com.ecoeclesia.finance;

import com.ecoeclesia.inventory.InventoryItem;
import com.ecoeclesia.inventory.InventoryNotFoundException;
import com.ecoeclesia.inventory.InventoryService;
import com.ecoeclesia.inventory.ItemType;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Map;

final class InventoryHandler implements HttpHandler {

    private final InventoryService inventoryService;
    private final AuthTokenService authTokenService;
    private final FinanceHttpResponseWriter responseWriter;
    private final FinanceHttpJson json;

    InventoryHandler(InventoryService inventoryService, AuthTokenService authTokenService,
                     FinanceHttpResponseWriter responseWriter, FinanceHttpJson json) {
        this.inventoryService = inventoryService;
        this.authTokenService = authTokenService;
        this.responseWriter = responseWriter;
        this.json = json;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        if ("OPTIONS".equalsIgnoreCase(method)) {
            responseWriter.writeJson(exchange, 204, "");
            return;
        }
        String path = exchange.getRequestURI().getPath();
        if ("GET".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "inventory:read")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            if (path.endsWith("/alerts")) {
                responseWriter.writeJson(exchange, 200, json.inventoryItems(inventoryService.findItemsBelowMinimum()));
            } else {
                responseWriter.writeJson(exchange, 200, json.inventoryItems(inventoryService.listItems()));
            }
            return;
        }
        if ("POST".equalsIgnoreCase(method)) {
            if (!isAllowed(exchange, "inventory:write")) {
                responseWriter.writeJson(exchange, 403, "{\"error\":\"Forbidden\"}");
                return;
            }
            if (path.endsWith("/consumables")) {
                handleCreateConsumable(exchange);
                return;
            }
            if (path.endsWith("/durables")) {
                handleCreateDurable(exchange);
                return;
            }
            if (path.contains("/entries") || path.contains("/exits")) {
                handleMovement(exchange);
                return;
            }
        }
        responseWriter.writeJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
    }

    private void handleCreateConsumable(HttpExchange exchange) throws IOException {
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, String> values = FinanceSimpleJsonParser.parse(body);
        try {
            String name = require(values.get("name"), "Nome é obrigatório");
            String description = require(values.get("description"), "Descrição é obrigatória");
            int quantity = parseInt(values.get("quantity"), "Quantidade é obrigatória");
            int minimum = parseInt(values.get("minimumQuantity"), "Quantidade mínima é obrigatória");
            Instant expiration = parseDate(values.get("expirationDate"));
            InventoryItem item = inventoryService.registerConsumable(name, description, quantity, minimum, expiration);
            responseWriter.writeJson(exchange, 201, json.inventoryItem(item));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }

    private void handleCreateDurable(HttpExchange exchange) throws IOException {
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, String> values = FinanceSimpleJsonParser.parse(body);
        try {
            String name = require(values.get("name"), "Nome é obrigatório");
            String description = require(values.get("description"), "Descrição é obrigatória");
            int quantity = parseInt(values.get("quantity"), "Quantidade é obrigatória");
            int minimum = parseInt(values.get("minimumQuantity"), "Quantidade mínima é obrigatória");
            int warrantyMonths = parseInt(values.get("warrantyMonths"), null);
            InventoryItem item = inventoryService.registerDurable(name, description, quantity, minimum, warrantyMonths);
            responseWriter.writeJson(exchange, 201, json.inventoryItem(item));
        } catch (IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }

    private void handleMovement(HttpExchange exchange) throws IOException {
        String path = exchange.getRequestURI().getPath();
        String[] parts = path.split("/");
        if (parts.length < 5) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"Invalid path\"}");
            return;
        }
        String typeSegment = parts[2];
        String id = parts[3];
        String action = parts[4];
        ItemType type = parseType(typeSegment);
        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, String> values = FinanceSimpleJsonParser.parse(body);
        try {
            int quantity = parseInt(values.get("quantity"), "Quantidade é obrigatória");
            InventoryItem updated;
            if ("entries".equalsIgnoreCase(action)) {
                updated = inventoryService.recordEntry(id, type, quantity);
            } else if ("exits".equalsIgnoreCase(action)) {
                updated = inventoryService.recordExit(id, type, quantity);
            } else {
                responseWriter.writeJson(exchange, 400, "{\"error\":\"Invalid path\"}");
                return;
            }
            responseWriter.writeJson(exchange, 200, json.inventoryItem(updated));
        } catch (InventoryNotFoundException | IllegalArgumentException ex) {
            responseWriter.writeJson(exchange, 400, "{\"error\":\"" + json.escape(ex.getMessage()) + "\"}");
        }
    }

    private ItemType parseType(String typeSegment) {
        if ("consumables".equalsIgnoreCase(typeSegment)) {
            return ItemType.CONSUMABLE;
        }
        if ("durables".equalsIgnoreCase(typeSegment)) {
            return ItemType.DURABLE;
        }
        throw new IllegalArgumentException("Tipo inválido: " + typeSegment);
    }

    private int parseInt(String value, String errorMessage) {
        if (value == null || value.isBlank() || "null".equalsIgnoreCase(value)) {
            if (errorMessage == null) {
                return 0;
            }
            throw new IllegalArgumentException(errorMessage);
        }
        return Integer.parseInt(value);
    }

    private Instant parseDate(String value) {
        if (value == null || value.isBlank() || "null".equalsIgnoreCase(value)) {
            return null;
        }
        LocalDate date = LocalDate.parse(value.trim());
        return date.atStartOfDay(ZoneId.systemDefault()).toInstant();
    }

    private String require(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(message);
        }
        return value.trim();
    }

    private boolean isAllowed(HttpExchange exchange, String permission) {
        String authorization = exchange.getRequestHeaders().getFirst("Authorization");
        return authTokenService.isAllowed(authorization, permission);
    }
}
