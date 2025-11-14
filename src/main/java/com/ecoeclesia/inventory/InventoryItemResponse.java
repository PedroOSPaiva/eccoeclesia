package com.ecoeclesia.inventory;

import java.time.LocalDate;
import java.util.UUID;

public record InventoryItemResponse(
        UUID id,
        String name,
        String description,
        int quantity,
        int minimumQuantity,
        ItemType type,
        LocalDate expirationDate,
        Integer warrantyMonths
) {
    public static InventoryItemResponse from(InventoryItem item) {
        LocalDate expirationDate = null;
        Integer warrantyMonths = null;
        if (item instanceof ConsumableItem consumable) {
            expirationDate = consumable.getExpirationDate();
        } else if (item instanceof DurableItem durable) {
            warrantyMonths = durable.getWarrantyMonths();
        }
        return new InventoryItemResponse(
                item.getId(),
                item.getName(),
                item.getDescription(),
                item.getQuantity(),
                item.getMinimumQuantity(),
                item.getType(),
                expirationDate,
                warrantyMonths
        );
    }
}
