package com.ecoeclesia.inventory;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

public final class InventoryService {

    private final Map<String, ConsumableItem> consumables = new ConcurrentHashMap<>();
    private final Map<String, DurableItem> durables = new ConcurrentHashMap<>();

    public ConsumableItem registerConsumable(String name, String description, int quantity, int minimumStock, Instant expiration) {
        var item = new ConsumableItem(name, description, quantity, minimumStock, expiration);
        consumables.put(item.getId(), item);
        return item;
    }

    public DurableItem registerDurable(String name, String description, int quantity, int minimumStock, int warrantyMonths) {
        var item = new DurableItem(name, description, quantity, minimumStock, warrantyMonths);
        durables.put(item.getId(), item);
        return item;
    }

    public InventoryItem recordEntry(String id, ItemType type, int amount) {
        InventoryItem item = requireItem(id, type);
        item.increaseQuantity(amount);
        return item;
    }

    public InventoryItem recordExit(String id, ItemType type, int amount) {
        InventoryItem item = requireItem(id, type);
        if (item.getQuantity() - amount < 0) {
            throw new InsufficientStockException("Quantidade insuficiente para o item " + id);
        }
        item.decreaseQuantity(amount);
        return item;
    }

    public List<InventoryItem> findItemsBelowMinimum() {
        List<InventoryItem> alerts = new ArrayList<>();
        consumables.values().stream().filter(InventoryItem::isBelowMinimum).forEach(alerts::add);
        durables.values().stream().filter(InventoryItem::isBelowMinimum).forEach(alerts::add);
        return alerts;
    }

    public List<InventoryItem> listItems() {
        List<InventoryItem> items = new ArrayList<>();
        items.addAll(consumables.values());
        items.addAll(durables.values());
        return items;
    }

    public InventoryItem findItem(String id, ItemType type) {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(type, "type");
        return switch (type) {
            case CONSUMABLE -> consumables.getOrDefault(id, null);
            case DURABLE -> durables.getOrDefault(id, null);
        };
    }

    private InventoryItem requireItem(String id, ItemType type) {
        InventoryItem item = findItem(id, type);
        if (item == null) {
            throw new InventoryNotFoundException("Item not found: " + id);
        }
        return item;
    }
}
