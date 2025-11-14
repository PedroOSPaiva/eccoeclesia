package com.ecoeclesia.revenue;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public final class RevenueServiceTest {

    private final RevenueService service = new RevenueService(new InMemoryRevenueRepository());

    @Test("classifies descriptions containing dízimo")
    public void classifiesTithes() {
        var category = service.classifyRevenue("Dízimo da família Araújo");
        assertEquals(RevenueCategory.TITHES, category);
    }

    @Test("persists filtered list using date range")
    public void filtersByPeriod() {
        service.registerRevenue(new BigDecimal("50"), "Oferta", "OFFERINGS");
        var past = service.registerRevenue(new BigDecimal("120"), "Dízimo antigo", "TITHES");
        past.setReceivedAt(Instant.parse("2024-01-10T00:00:00Z"));
        var recent = service.registerRevenue(new BigDecimal("90"), "Evento juventude", "EVENTS");
        recent.setReceivedAt(Instant.parse("2024-02-15T00:00:00Z"));

        List<RevenueEntity> results = service.listRevenues(
                Instant.parse("2024-02-01T00:00:00Z"), Instant.parse("2024-03-01T00:00:00Z"));

        assertEquals(1, results.size());
        assertEquals(recent.getId(), results.get(0).getId());
    }

    @Test("rejects unknown category names")
    public void rejectsInvalidCategory() {
        boolean thrown = false;
        try {
            service.registerRevenue(new BigDecimal("10"), "Entrada", "UNKNOWN");
        } catch (IllegalArgumentException ex) {
            thrown = true;
        }
        assertTrue(thrown, "Expected IllegalArgumentException to be thrown");
    }
}
