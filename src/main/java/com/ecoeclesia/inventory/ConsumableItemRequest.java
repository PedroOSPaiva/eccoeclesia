package com.ecoeclesia.inventory;

import java.time.LocalDate;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ConsumableItemRequest(
        @NotBlank String name,
        String description,
        @Min(0) int quantity,
        @Min(0) int minimumQuantity,
        @NotNull LocalDate expirationDate
) {

    public ConsumableItem toEntity() {
        return new ConsumableItem(name, description, quantity, minimumQuantity, expirationDate);
    }
}
