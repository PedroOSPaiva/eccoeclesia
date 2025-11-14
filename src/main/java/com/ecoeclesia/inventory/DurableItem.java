package com.ecoeclesia.inventory;

public final class DurableItem extends InventoryItem {

    private final int warrantyMonths;

    public DurableItem(String name, String description, int quantity, int minimumStock, int warrantyMonths) {
        super(name, description, quantity, minimumStock);
        this.warrantyMonths = warrantyMonths;
    }

    public int getWarrantyMonths() {
        return warrantyMonths;
    }
}
