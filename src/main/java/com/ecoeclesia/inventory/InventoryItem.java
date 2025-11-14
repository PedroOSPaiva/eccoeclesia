package com.ecoeclesia.inventory;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

public abstract class InventoryItem {
    private final String id;
    private String name;
    private String description;
    private int quantity;
    private int minimumStock;
    private Instant lastUpdated;

    protected InventoryItem(String name, String description, int quantity, int minimumStock) {
        this(UUID.randomUUID().toString(), name, description, quantity, minimumStock, Instant.now());
    }

    protected InventoryItem(String id, String name, String description, int quantity, int minimumStock, Instant lastUpdated) {
        this.id = Objects.requireNonNull(id);
        this.name = Objects.requireNonNull(name);
        this.description = Objects.requireNonNull(description);
        this.quantity = quantity;
        this.minimumStock = minimumStock;
        this.lastUpdated = Objects.requireNonNull(lastUpdated);
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getMinimumStock() {
        return minimumStock;
    }

    public Instant getLastUpdated() {
        return lastUpdated;
    }

    public void increaseQuantity(int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        quantity += amount;
        lastUpdated = Instant.now();
    }

    public void decreaseQuantity(int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        if (quantity - amount < 0) {
            throw new IllegalArgumentException("Quantity cannot become negative");
        }
        quantity -= amount;
        lastUpdated = Instant.now();
    }

    public boolean isBelowMinimum() {
        return quantity < minimumStock;
    }
}
