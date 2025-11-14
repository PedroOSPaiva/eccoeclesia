package com.ecoeclesia.inventory;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertThrows;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.testing.Test;
import java.time.Instant;
import java.util.List;

public final class InventoryServiceTest {

    private final InventoryService service = new InventoryService();

    @Test("records inventory entries")
    public void recordsEntries() {
        ConsumableItem item = service.registerConsumable("Velas", "Velas de cera", 5, 2, Instant.now());
        service.recordEntry(item.getId(), ItemType.CONSUMABLE, 3);
        assertEquals(8, item.getQuantity());
    }

    @Test("validates exits against available stock")
    public void validatesExit() {
        DurableItem item = service.registerDurable("Caixa de som", "Eventos", 1, 1, 12);
        assertThrows(InsufficientStockException.class,
                () -> service.recordExit(item.getId(), ItemType.DURABLE, 2));
    }

    @Test("finds items below minimum")
    public void findsLowStockItems() {
        service.registerConsumable("Café", "Café em pó", 1, 3, Instant.now());
        service.registerDurable("Projetor", "Projetor HD", 4, 2, 24);

        List<InventoryItem> alerts = service.findItemsBelowMinimum();
        assertEquals(1, alerts.size());
        assertTrue(alerts.get(0).isBelowMinimum());
    }
}
