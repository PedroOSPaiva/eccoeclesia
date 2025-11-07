package com.ecoeclesia.inventory;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

    @Mock
    private ConsumableItemRepository consumableRepository;

    @Mock
    private DurableItemRepository durableRepository;

    @InjectMocks
    private InventoryService inventoryService;

    private ConsumableItem consumable;
    private DurableItem durable;

    @BeforeEach
    void setUp() {
        consumable = new ConsumableItem("Velas", "Velas de cera", 5, 2, LocalDate.now().plusDays(30));
        consumable.setId("consumable-1");
        durable = new DurableItem("Projetor", "Projetor multimídia", 2, 1, 24);
        durable.setId("durable-1");
    }

    @Test
    void recordEntryShouldIncreaseQuantity() {
        when(consumableRepository.findById("consumable-1")).thenReturn(Optional.of(consumable));
        when(consumableRepository.save(any(ConsumableItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        InventoryItem updated = inventoryService.recordEntry("consumable-1", ItemType.CONSUMABLE, 3);

        assertThat(updated.getQuantity()).isEqualTo(8);
    }

    @Test
    void recordExitShouldValidateStockAvailability() {
        when(durableRepository.findById("durable-1")).thenReturn(Optional.of(durable));

        assertThatThrownBy(() -> inventoryService.recordExit("durable-1", ItemType.DURABLE, 5))
                .isInstanceOf(InsufficientStockException.class)
                .hasMessageContaining("Quantidade insuficiente");
    }

    @Test
    void findItemsBelowMinimumShouldReturnItemsWithLowStock() {
        ConsumableItem lowStockConsumable = new ConsumableItem("Café", "Café em pó", 1, 3, LocalDate.now().plusDays(20));
        lowStockConsumable.setId("cafe");
        DurableItem okDurable = new DurableItem("Caixa de som", "Caixa para eventos", 5, 2, 12);
        okDurable.setId("speaker");

        when(consumableRepository.findAll()).thenReturn(List.of(lowStockConsumable, consumable));
        when(durableRepository.findAll()).thenReturn(List.of(okDurable));

        List<InventoryItem> alerts = inventoryService.findItemsBelowMinimum();

        assertThat(alerts)
                .hasSize(1)
                .first()
                .isSameAs(lowStockConsumable);
    }
}
