package com.ecoeclesia.inventory;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("CONSUMABLE")
public class ConsumableItem extends InventoryItem {

    @Column(name = "expiration_date")
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
