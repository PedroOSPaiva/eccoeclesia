package com.ecoeclesia.inventory;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class InventoryService {

    private final ConsumableItemRepository consumableRepository;
    private final DurableItemRepository durableRepository;

    public InventoryService(ConsumableItemRepository consumableRepository,
                            DurableItemRepository durableRepository) {
        this.consumableRepository = consumableRepository;
        this.durableRepository = durableRepository;
    }

    public ConsumableItem registerConsumable(ConsumableItem item) {
        return consumableRepository.save(item);
    }

    public DurableItem registerDurable(DurableItem item) {
        return durableRepository.save(item);
    }

    public InventoryItem recordEntry(UUID id, ItemType type, int quantity) {
        InventoryItem item = findItem(id, type);
        item.increaseQuantity(quantity);
        return saveItem(item, type);
    }

    public InventoryItem recordExit(UUID id, ItemType type, int quantity) {
        InventoryItem item = findItem(id, type);
        try {
            item.decreaseQuantity(quantity);
        } catch (IllegalStateException ex) {
            throw new InsufficientStockException(ex.getMessage());
        }
        return saveItem(item, type);
    }

    public List<InventoryItem> findAll() {
        List<InventoryItem> items = new ArrayList<>();
        items.addAll(consumableRepository.findAll());
        items.addAll(durableRepository.findAll());
        return items;
    }

    public List<InventoryItem> findItemsBelowMinimum() {
        return findAll().stream()
                .filter(InventoryItem::isBelowMinimum)
                .toList();
    }

    private InventoryItem findItem(UUID id, ItemType type) {
        return switch (type) {
            case CONSUMABLE -> consumableRepository.findById(id)
                    .orElseThrow(() -> new InventoryNotFoundException("Consumível não encontrado: " + id));
            case DURABLE -> durableRepository.findById(id)
                    .orElseThrow(() -> new InventoryNotFoundException("Bem durável não encontrado: " + id));
        };
    }

    private InventoryItem saveItem(InventoryItem item, ItemType type) {
        return switch (type) {
            case CONSUMABLE -> consumableRepository.save((ConsumableItem) item);
            case DURABLE -> durableRepository.save((DurableItem) item);
        };
    }
}
