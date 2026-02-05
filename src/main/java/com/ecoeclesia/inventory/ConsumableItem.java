package com.ecoeclesia.inventory;

import java.time.Instant;

public final class ConsumableItem extends InventoryItem {

    private final Instant expirationDate;

    public ConsumableItem(String name, String description, int quantity, int minimumStock, Instant expirationDate) {
        super(name, description, quantity, minimumStock);
        this.expirationDate = expirationDate;
    }

    public ConsumableItem(String id, String name, String description, int quantity, int minimumStock,
                          Instant expirationDate, Instant lastUpdated) {
        super(id, name, description, quantity, minimumStock, lastUpdated);
        this.expirationDate = expirationDate;
    }

    public Instant getExpirationDate() {
        return expirationDate;
    }
}
