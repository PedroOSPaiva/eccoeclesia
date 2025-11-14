package com.ecoeclesia.inventory;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "inventory_items")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "item_type", discriminatorType = DiscriminatorType.STRING)
public abstract class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotBlank
    @Column(nullable = false, length = 255)
    private String name;

    @Column(length = 512)
    private String description;

    @Min(0)
    @Column(nullable = false)
    private int quantity;

    @Min(0)
    @Column(name = "minimum_quantity", nullable = false)
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

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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
