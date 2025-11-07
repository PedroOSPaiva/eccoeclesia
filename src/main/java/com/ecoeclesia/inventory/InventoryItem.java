package com.ecoeclesia.inventory;

import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Document(collection = "inventory_items")
public abstract class InventoryItem {

    @Id
    private String id;

    @NotBlank
    private String name;

    private String description;

    @Min(0)
    private int quantity;

    @Min(0)
    private int minimumQuantity;

    protected InventoryItem() {
        // for framework use
    }

    protected InventoryItem(String name, String description, int quantity, int minimumQuantity) {
        this.name = Objects.requireNonNull(name, "name");
        this.description = description;
        setQuantity(quantity);
        setMinimumQuantity(minimumQuantity);
    }

    public abstract ItemType getType();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = Objects.requireNonNull(name, "name");
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        if (quantity < 0) {
            throw new IllegalArgumentException("Quantidade não pode ser negativa");
        }
        this.quantity = quantity;
    }

    public int getMinimumQuantity() {
        return minimumQuantity;
    }

    public void setMinimumQuantity(int minimumQuantity) {
        if (minimumQuantity < 0) {
            throw new IllegalArgumentException("Estoque mínimo não pode ser negativo");
        }
        this.minimumQuantity = minimumQuantity;
    }

    public void increaseQuantity(int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("A quantidade de entrada deve ser positiva");
        }
        this.quantity += amount;
    }

    public void decreaseQuantity(int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("A quantidade de saída deve ser positiva");
        }
        if (amount > this.quantity) {
            throw new IllegalStateException("Quantidade insuficiente em estoque");
        }
        this.quantity -= amount;
    }

    public boolean isBelowMinimum() {
        return quantity < minimumQuantity;
    }
}
