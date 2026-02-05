package com.ecoeclesia.inventory;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

public final class InventoryService {

    private final Map<String, ConsumableItem> consumables = new ConcurrentHashMap<>();
    private final Map<String, DurableItem> durables = new ConcurrentHashMap<>();
    private final Path storageFile;

    public InventoryService() {
        this(null);
    }

    public InventoryService(Path storageFile) {
        this.storageFile = storageFile;
        load();
    }

    public ConsumableItem registerConsumable(String name, String description, int quantity, int minimumStock, Instant expiration) {
        var item = new ConsumableItem(name, description, quantity, minimumStock, expiration);
        consumables.put(item.getId(), item);
        persist();
        return item;
    }

    public DurableItem registerDurable(String name, String description, int quantity, int minimumStock, int warrantyMonths) {
        var item = new DurableItem(name, description, quantity, minimumStock, warrantyMonths);
        durables.put(item.getId(), item);
        persist();
        return item;
    }

    public InventoryItem recordEntry(String id, ItemType type, int amount) {
        InventoryItem item = requireItem(id, type);
        item.increaseQuantity(amount);
        persist();
        return item;
    }

    public InventoryItem recordExit(String id, ItemType type, int amount) {
        InventoryItem item = requireItem(id, type);
        if (item.getQuantity() - amount < 0) {
            throw new InsufficientStockException("Quantidade insuficiente para o item " + id);
        }
        item.decreaseQuantity(amount);
        persist();
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

    private void load() {
        if (storageFile == null || !Files.exists(storageFile)) {
            return;
        }
        try {
            for (String line : Files.readAllLines(storageFile, StandardCharsets.UTF_8)) {
                String trimmed = line.trim();
                if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                    continue;
                }
                String[] parts = trimmed.split(",", -1);
                if (parts.length < 9) {
                    continue;
                }
                String id = parts[0].trim();
                ItemType type = ItemType.valueOf(parts[1].trim());
                String name = parts[2].trim();
                String description = parts[3].trim();
                int quantity = Integer.parseInt(parts[4].trim());
                int minimumStock = Integer.parseInt(parts[5].trim());
                Instant lastUpdated = Instant.parse(parts[8].trim());
                if (type == ItemType.CONSUMABLE) {
                    Instant expiration = parts[6].isBlank() ? null : Instant.parse(parts[6].trim());
                    ConsumableItem item = new ConsumableItem(id, name, description, quantity, minimumStock, expiration, lastUpdated);
                    consumables.put(id, item);
                } else {
                    int warrantyMonths = parts[7].isBlank() ? 0 : Integer.parseInt(parts[7].trim());
                    DurableItem item = new DurableItem(id, name, description, quantity, minimumStock, warrantyMonths, lastUpdated);
                    durables.put(id, item);
                }
            }
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to load inventory file", ex);
        }
    }

    private void persist() {
        if (storageFile == null) {
            return;
        }
        try {
            Files.createDirectories(storageFile.getParent());
            List<String> lines = new ArrayList<>();
            lines.add("# id,type,name,description,quantity,minimumStock,expirationDate,warrantyMonths,lastUpdated");
            for (InventoryItem item : listItems()) {
                if (item instanceof ConsumableItem consumable) {
                    lines.add(String.join(",",
                            consumable.getId(),
                            ItemType.CONSUMABLE.name(),
                            consumable.getName(),
                            consumable.getDescription(),
                            Integer.toString(consumable.getQuantity()),
                            Integer.toString(consumable.getMinimumStock()),
                            consumable.getExpirationDate() == null ? "" : consumable.getExpirationDate().toString(),
                            "",
                            consumable.getLastUpdated().toString()));
                } else if (item instanceof DurableItem durable) {
                    lines.add(String.join(",",
                            durable.getId(),
                            ItemType.DURABLE.name(),
                            durable.getName(),
                            durable.getDescription(),
                            Integer.toString(durable.getQuantity()),
                            Integer.toString(durable.getMinimumStock()),
                            "",
                            Integer.toString(durable.getWarrantyMonths()),
                            durable.getLastUpdated().toString()));
                }
            }
            Files.write(storageFile, lines, StandardCharsets.UTF_8);
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to persist inventory file", ex);
        }
    }
}
