package com.ecoeclesia.api;

import com.ecoeclesia.finance.AuthTokenService;
import com.ecoeclesia.inventory.ConsumableItem;
import com.ecoeclesia.inventory.DurableItem;
import com.ecoeclesia.inventory.InventoryItem;
import com.ecoeclesia.inventory.InventoryNotFoundException;
import com.ecoeclesia.inventory.InventoryService;
import com.ecoeclesia.inventory.ItemType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@RestController
@RequestMapping({"/inventory", "/api/inventory"})
public class InventoryApiController {

    private final InventoryService inventoryService;
    private final AuthTokenService authTokenService;

    public InventoryApiController(InventoryService inventoryService, AuthTokenService authTokenService) {
        this.inventoryService = inventoryService;
        this.authTokenService = authTokenService;
    }

    public record InventoryItemResponse(
            String id,
            String name,
            String description,
            int quantity,
            int minimumQuantity,
            int minimumStock,
            String type,
            String expirationDate,
            Integer warrantyMonths,
            Instant lastUpdated
    ) {
        public static InventoryItemResponse from(InventoryItem item) {
            if (item instanceof ConsumableItem consumable) {
                return new InventoryItemResponse(
                        consumable.getId(),
                        consumable.getName(),
                        consumable.getDescription(),
                        consumable.getQuantity(),
                        consumable.getMinimumStock(),
                        consumable.getMinimumStock(),
                        "CONSUMABLE",
                        consumable.getExpirationDate() != null ? consumable.getExpirationDate().toString() : null,
                        null,
                        consumable.getLastUpdated()
                );
            } else if (item instanceof DurableItem durable) {
                return new InventoryItemResponse(
                        durable.getId(),
                        durable.getName(),
                        durable.getDescription(),
                        durable.getQuantity(),
                        durable.getMinimumStock(),
                        durable.getMinimumStock(),
                        "DURABLE",
                        null,
                        durable.getWarrantyMonths(),
                        durable.getLastUpdated()
                );
            } else {
                return new InventoryItemResponse(
                        item.getId(),
                        item.getName(),
                        item.getDescription(),
                        item.getQuantity(),
                        item.getMinimumStock(),
                        item.getMinimumStock(),
                        "UNKNOWN",
                        null,
                        null,
                        item.getLastUpdated()
                );
            }
        }
    }

    public record CreateConsumableRequest(
            String name,
            String description,
            Integer quantity,
            Integer minimumQuantity,
            Integer minimumStock,
            String expirationDate
    ) {}

    public record CreateDurableRequest(
            String name,
            String description,
            Integer quantity,
            Integer minimumQuantity,
            Integer minimumStock,
            Integer warrantyMonths
    ) {}

    public record MovementRequest(Integer quantity) {}

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<InventoryItemResponse>> listItems() {
        List<InventoryItemResponse> items = inventoryService.listItems().stream()
                .map(InventoryItemResponse::from)
                .toList();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/alerts")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<InventoryItemResponse>> listAlerts() {
        List<InventoryItemResponse> alerts = inventoryService.findItemsBelowMinimum().stream()
                .map(InventoryItemResponse::from)
                .toList();
        return ResponseEntity.ok(alerts);
    }

    @PostMapping("/consumables")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")
    public ResponseEntity<InventoryItemResponse> createConsumable(@RequestBody CreateConsumableRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Corpo da requisição é obrigatório");
        }
        if (request.name() == null || request.name().isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (request.description() == null || request.description().isBlank()) {
            throw new IllegalArgumentException("Descrição é obrigatória");
        }
        int qty = request.quantity() != null ? request.quantity() : 0;
        int min = request.minimumQuantity() != null ? request.minimumQuantity()
                : (request.minimumStock() != null ? request.minimumStock() : 0);

        Instant expiration = null;
        if (request.expirationDate() != null && !request.expirationDate().isBlank()) {
            try {
                LocalDate date = LocalDate.parse(request.expirationDate().trim());
                expiration = date.atStartOfDay(ZoneId.systemDefault()).toInstant();
            } catch (Exception ex) {
                expiration = Instant.parse(request.expirationDate().trim());
            }
        }

        InventoryItem item = inventoryService.registerConsumable(
                request.name().trim(),
                request.description().trim(),
                qty,
                min,
                expiration
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(InventoryItemResponse.from(item));
    }

    @PostMapping("/durables")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")
    public ResponseEntity<InventoryItemResponse> createDurable(@RequestBody CreateDurableRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Corpo da requisição é obrigatório");
        }
        if (request.name() == null || request.name().isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (request.description() == null || request.description().isBlank()) {
            throw new IllegalArgumentException("Descrição é obrigatória");
        }
        int qty = request.quantity() != null ? request.quantity() : 0;
        int min = request.minimumQuantity() != null ? request.minimumQuantity()
                : (request.minimumStock() != null ? request.minimumStock() : 0);
        int warranty = request.warrantyMonths() != null ? request.warrantyMonths() : 0;

        InventoryItem item = inventoryService.registerDurable(
                request.name().trim(),
                request.description().trim(),
                qty,
                min,
                warranty
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(InventoryItemResponse.from(item));
    }

    @PutMapping("/consumables/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")
    public ResponseEntity<InventoryItemResponse> updateConsumable(
            @PathVariable String id,
            @RequestBody CreateConsumableRequest request
    ) {
        if (request == null) {
            throw new IllegalArgumentException("Corpo da requisição é obrigatório");
        }
        int min = request.minimumQuantity() != null ? request.minimumQuantity()
                : (request.minimumStock() != null ? request.minimumStock() : 0);
        Instant expiration = null;
        if (request.expirationDate() != null && !request.expirationDate().isBlank()) {
            try {
                LocalDate date = LocalDate.parse(request.expirationDate().trim());
                expiration = date.atStartOfDay(ZoneId.systemDefault()).toInstant();
            } catch (Exception ex) {
                expiration = Instant.parse(request.expirationDate().trim());
            }
        }
        InventoryItem item = inventoryService.updateConsumable(
                id,
                request.name().trim(),
                request.description().trim(),
                min,
                expiration
        );
        return ResponseEntity.ok(InventoryItemResponse.from(item));
    }

    @PutMapping("/durables/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")
    public ResponseEntity<InventoryItemResponse> updateDurable(
            @PathVariable String id,
            @RequestBody CreateDurableRequest request
    ) {
        if (request == null) {
            throw new IllegalArgumentException("Corpo da requisição é obrigatório");
        }
        int min = request.minimumQuantity() != null ? request.minimumQuantity()
                : (request.minimumStock() != null ? request.minimumStock() : 0);
        int warranty = request.warrantyMonths() != null ? request.warrantyMonths() : 0;
        InventoryItem item = inventoryService.updateDurable(
                id,
                request.name().trim(),
                request.description().trim(),
                min,
                warranty
        );
        return ResponseEntity.ok(InventoryItemResponse.from(item));
    }

    @PostMapping("/{typeSegment}/{id}/entries")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")
    public ResponseEntity<InventoryItemResponse> recordEntry(
            @PathVariable String typeSegment,
            @PathVariable String id,
            @RequestBody MovementRequest request
    ) {
        ItemType type = parseType(typeSegment);
        int qty = request != null && request.quantity() != null ? request.quantity() : 1;
        InventoryItem item = inventoryService.recordEntry(id, type, qty);
        return ResponseEntity.ok(InventoryItemResponse.from(item));
    }

    @PostMapping("/{typeSegment}/{id}/exits")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")
    public ResponseEntity<InventoryItemResponse> recordExit(
            @PathVariable String typeSegment,
            @PathVariable String id,
            @RequestBody MovementRequest request
    ) {
        ItemType type = parseType(typeSegment);
        int qty = request != null && request.quantity() != null ? request.quantity() : 1;
        InventoryItem item = inventoryService.recordExit(id, type, qty);
        return ResponseEntity.ok(InventoryItemResponse.from(item));
    }

    private ItemType parseType(String typeSegment) {
        if ("consumables".equalsIgnoreCase(typeSegment) || "consumable".equalsIgnoreCase(typeSegment)) {
            return ItemType.CONSUMABLE;
        }
        if ("durables".equalsIgnoreCase(typeSegment) || "durable".equalsIgnoreCase(typeSegment)) {
            return ItemType.DURABLE;
        }
        throw new IllegalArgumentException("Tipo inválido: " + typeSegment);
    }
}
