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
        PayableEntry entry = service.create("Conta de energia", new BigDecimal("250.00"),
                LocalDate.now().plusDays(10), "Administração", "MONTHLY", java.util.List.of("nota.pdf"), "tester");
        assertEquals(PayableStatus.OPEN, entry.status());
        assertEquals("Administração", entry.costCenter());
        assertEquals(1, service.list().size());
    }

    @Test("updates payable status")
    public void updatesStatus() {
        PayableEntry entry = service.create("Aluguel", new BigDecimal("900.00"),
                LocalDate.now().plusDays(5), null, null, java.util.List.of(), "tester");
        PayableEntry updated = service.updateStatus(entry.id(), PayableStatus.PAID, "approver");
        assertTrue(updated.status() == PayableStatus.PAID);
        assertEquals("approver", updated.updatedBy());
    }
}
