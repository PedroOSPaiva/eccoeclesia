package com.ecoeclesia.inventory;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    private UUID consumableId;
    private UUID durableId;

    @BeforeEach
    void setUp() {
        consumable = new ConsumableItem("Velas", "Velas de cera", 5, 2, LocalDate.now().plusDays(30));
        durable = new DurableItem("Projetor", "Projetor multimídia", 2, 1, 24);
        consumableId = UUID.randomUUID();
        durableId = UUID.randomUUID();
        consumable.setId(consumableId);
        durable.setId(durableId);
    }

    @Test
    void recordEntryShouldIncreaseQuantity() {
        when(consumableRepository.findById(consumableId)).thenReturn(Optional.of(consumable));
        when(consumableRepository.save(any(ConsumableItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        InventoryItem updated = inventoryService.recordEntry(consumableId, ItemType.CONSUMABLE, 3);

        assertThat(updated.getQuantity()).isEqualTo(8);
    }

    @Test
    void recordExitShouldValidateStockAvailability() {
        when(durableRepository.findById(durableId)).thenReturn(Optional.of(durable));

        assertThatThrownBy(() -> inventoryService.recordExit(durableId, ItemType.DURABLE, 5))
                .isInstanceOf(InsufficientStockException.class)
                .hasMessageContaining("Quantidade insuficiente");
    }

    @Test
    void findItemsBelowMinimumShouldReturnItemsWithLowStock() {
        ConsumableItem lowStockConsumable = new ConsumableItem("Café", "Café em pó", 1, 3, LocalDate.now().plusDays(20));
        lowStockConsumable.setId(UUID.randomUUID());
        DurableItem okDurable = new DurableItem("Caixa de som", "Caixa para eventos", 5, 2, 12);
        okDurable.setId(UUID.randomUUID());

        when(consumableRepository.findAll()).thenReturn(List.of(lowStockConsumable, consumable));
        when(durableRepository.findAll()).thenReturn(List.of(okDurable));

        List<InventoryItem> alerts = inventoryService.findItemsBelowMinimum();

        assertThat(alerts)
                .hasSize(1)
                .first()
                .isSameAs(lowStockConsumable);
    }
}
