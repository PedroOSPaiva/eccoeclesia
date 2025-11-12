package com.ecoeclesia.inventory;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/inventory")
@Validated
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping("/consumables")
    @ResponseStatus(HttpStatus.CREATED)
    public InventoryItemResponse createConsumable(@Valid @RequestBody ConsumableItemRequest request) {
        ConsumableItem saved = inventoryService.registerConsumable(request.toEntity());
        return InventoryItemResponse.from(saved);
    }

    @PostMapping("/durables")
    @ResponseStatus(HttpStatus.CREATED)
    public InventoryItemResponse createDurable(@Valid @RequestBody DurableItemRequest request) {
        DurableItem saved = inventoryService.registerDurable(request.toEntity());
        return InventoryItemResponse.from(saved);
    }

    @PostMapping("/{type}/{id}/entries")
    public InventoryItemResponse recordEntry(@PathVariable String type,
                                             @PathVariable UUID id,
                                             @Valid @RequestBody InventoryMovementRequest request) {
        ItemType itemType = ItemType.fromPathSegment(type);
        InventoryItem updated = inventoryService.recordEntry(id, itemType, request.quantity());
        return InventoryItemResponse.from(updated);
    }

    @PostMapping("/{type}/{id}/exits")
    public InventoryItemResponse recordExit(@PathVariable String type,
                                            @PathVariable UUID id,
                                            @Valid @RequestBody InventoryMovementRequest request) {
        ItemType itemType = ItemType.fromPathSegment(type);
        InventoryItem updated = inventoryService.recordExit(id, itemType, request.quantity());
        return InventoryItemResponse.from(updated);
    }

    @GetMapping
    public List<InventoryItemResponse> listInventory() {
        return inventoryService.findAll().stream()
                .map(InventoryItemResponse::from)
                .toList();
    }

    @GetMapping("/alerts")
    public List<InventoryItemResponse> listAlerts() {
        return inventoryService.findItemsBelowMinimum().stream()
                .map(InventoryItemResponse::from)
                .toList();
    }
}
