package com.ecoeclesia.inventory;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("DURABLE")
public class DurableItem extends InventoryItem {

    @Column(name = "warranty_months")
    private Integer warrantyMonths;

    public DurableItem() {
        super();
    }

    public DurableItem(String name, String description, int quantity, int minimumQuantity, Integer warrantyMonths) {
        super(name, description, quantity, minimumQuantity);
        this.warrantyMonths = warrantyMonths;
    }

    @Override
    public ItemType getType() {
        return ItemType.DURABLE;
    }

    public Integer getWarrantyMonths() {
        return warrantyMonths;
    }

    public void setWarrantyMonths(Integer warrantyMonths) {
        this.warrantyMonths = warrantyMonths;
    }
}
