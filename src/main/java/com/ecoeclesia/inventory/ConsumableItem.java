package com.ecoeclesia.inventory;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "inventory_items")
public class ConsumableItem extends InventoryItem {

    @Field("expiration_date")
    private LocalDate expirationDate;

    public ConsumableItem() {
        super();
    }

    public ConsumableItem(String name, String description, int quantity, int minimumQuantity,
                          LocalDate expirationDate) {
        super(name, description, quantity, minimumQuantity);
        this.expirationDate = expirationDate;
    }

    @Override
    public ItemType getType() {
        return ItemType.CONSUMABLE;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }
}
