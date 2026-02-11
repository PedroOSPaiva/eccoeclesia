package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.time.LocalDate;

public final class CashflowServiceTest {

    @Test("aggregates cashflow totals with filters")
    public void aggregatesTotals() {
        PayableService payableService = new PayableService(new InMemoryPayableRepository());
        ReceivableService receivableService = new ReceivableService(new InMemoryReceivableRepository());
        CashflowService service = new CashflowService(payableService, receivableService);

        payableService.create("Internet", new BigDecimal("120.00"), LocalDate.now().plusDays(5),
                "Administração", null, java.util.List.of(), "tester");
        payableService.create("Som", new BigDecimal("80.00"), LocalDate.now().plusDays(6),
                "Liturgia", null, java.util.List.of(), "tester");
        receivableService.create("Ofertas", new BigDecimal("300.00"), LocalDate.now().plusDays(2),
                "Ofertas", "Dízimo", null, "tester");

        CashflowSnapshot snapshot = service.snapshot(LocalDate.now(), LocalDate.now().plusDays(10),
                PayableStatus.OPEN, ReceivableStatus.OPEN, "Administração");

        assertEquals(new BigDecimal("120.00"), snapshot.totalPayables());
        assertEquals(new BigDecimal("300.00"), snapshot.totalReceivables());
        assertEquals(new BigDecimal("180.00"), snapshot.netBalance());
    }

    @Test("ignores blank cost center filter")
    public void ignoresBlankCostCenter() {
        PayableService payableService = new PayableService(new InMemoryPayableRepository());
        ReceivableService receivableService = new ReceivableService(new InMemoryReceivableRepository());
        CashflowService service = new CashflowService(payableService, receivableService);

        payableService.create("Internet", new BigDecimal("120.00"), LocalDate.now().plusDays(5),
                "Administração", null, java.util.List.of(), "tester");
        payableService.create("Som", new BigDecimal("80.00"), LocalDate.now().plusDays(6),
                "Liturgia", null, java.util.List.of(), "tester");
        receivableService.create("Ofertas", new BigDecimal("300.00"), LocalDate.now().plusDays(2),
                "Ofertas", "Dízimo", null, "tester");

        CashflowSnapshot snapshot = service.snapshot(LocalDate.now(), LocalDate.now().plusDays(10),
                PayableStatus.OPEN, ReceivableStatus.OPEN, "   ");

        assertEquals(new BigDecimal("200.00"), snapshot.totalPayables());
        assertEquals(new BigDecimal("300.00"), snapshot.totalReceivables());
        assertEquals(new BigDecimal("100.00"), snapshot.netBalance());
    }
}
