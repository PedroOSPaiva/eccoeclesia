package com.ecoeclesia.inventory;

import jakarta.validation.constraints.Min;

public record InventoryMovementRequest(@Min(1) int quantity) {
}
