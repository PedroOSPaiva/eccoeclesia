package com.ecoeclesia.inventory;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "inventory_items")
public class DurableItem extends InventoryItem {

    private Integer warrantyMonths;

    public DurableItem() {
        super();
    }

    public DurableItem(String name, String description, int quantity, int minimumQuantity,
                       Integer warrantyMonths) {
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
