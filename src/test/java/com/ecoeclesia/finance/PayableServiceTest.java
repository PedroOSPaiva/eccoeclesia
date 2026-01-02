package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.time.LocalDate;

public final class PayableServiceTest {

    private final PayableService service = new PayableService(new InMemoryPayableRepository());

    @Test("creates payable entries with open status")
    public void createsPayable() {
        PayableEntry entry = service.create("Conta de energia", new BigDecimal("250.00"), LocalDate.now().plusDays(10));
        assertEquals(PayableStatus.OPEN, entry.status());
        assertEquals(1, service.list().size());
    }

    @Test("updates payable status")
    public void updatesStatus() {
        PayableEntry entry = service.create("Aluguel", new BigDecimal("900.00"), LocalDate.now().plusDays(5));
        PayableEntry updated = service.updateStatus(entry.id(), PayableStatus.PAID);
        assertTrue(updated.status() == PayableStatus.PAID);
    }
}
