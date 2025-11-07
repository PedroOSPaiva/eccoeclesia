package com.ecoeclesia.inventory;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record DurableItemRequest(
        @NotBlank String name,
        String description,
        @Min(0) int quantity,
        @Min(0) int minimumQuantity,
        Integer warrantyMonths
) {

    public DurableItem toEntity() {
        return new DurableItem(name, description, quantity, minimumQuantity, warrantyMonths);
    }
}
