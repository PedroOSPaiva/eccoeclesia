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
        ReceivableEntry entry = service.create("Dízimos", new BigDecimal("1200.00"), LocalDate.now().plusDays(3));
        assertEquals(ReceivableStatus.OPEN, entry.status());
        assertEquals(1, service.list().size());
    }

    @Test("updates receivable status")
    public void updatesStatus() {
        ReceivableEntry entry = service.create("Oferta especial", new BigDecimal("450.00"), LocalDate.now().plusDays(2));
        ReceivableEntry updated = service.updateStatus(entry.id(), ReceivableStatus.RECEIVED);
        assertTrue(updated.status() == ReceivableStatus.RECEIVED);
    }
}
