package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.time.LocalDate;

public final class ReceivableServiceTest {

    private final ReceivableService service = new ReceivableService(new InMemoryReceivableRepository());

    @Test("creates receivable entries with open status")
    public void createsReceivable() {
        ReceivableEntry entry = service.create("Dízimos", new BigDecimal("1200.00"),
                LocalDate.now().plusDays(3), "Ofertas", "Dízimo", "Projeto Social", "tester");
        assertEquals(ReceivableStatus.OPEN, entry.status());
        assertEquals("Ofertas", entry.origin());
        assertEquals(1, service.list().size());
    }

    @Test("updates receivable status")
    public void updatesStatus() {
        ReceivableEntry entry = service.create("Oferta especial", new BigDecimal("450.00"),
                LocalDate.now().plusDays(2), "Campanha", "Especial", null, "tester");
        ReceivableEntry updated = service.updateStatus(entry.id(), ReceivableStatus.RECEIVED, "approver");
        assertTrue(updated.status() == ReceivableStatus.RECEIVED);
        assertEquals("approver", updated.updatedBy());
    }
}
