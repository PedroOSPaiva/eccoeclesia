package com.ecoeclesia.birthday;

import static com.ecoeclesia.testing.Assertions.assertEquals;

import com.ecoeclesia.testing.Test;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;

public final class BirthdayServiceTest {

    @Test("orders by days until birthday and computes age")
    public void sortsUpcomingBirthdays() {
        var repository = new InMemoryBirthdayRepository();
        var fixedClock = Clock.fixed(Instant.parse("2024-05-10T00:00:00Z"), ZoneOffset.UTC);
        var service = new BirthdayService(repository, fixedClock);

        List<BirthdaySummary> results = service.listUpcomingBirthdays();

        assertEquals(5, results.size());
        // Next dates relative to 2024-05-10: 2024-05-15, 2024-05-30, 2024-06-03, 2024-12-02, 2025-04-28
        assertEquals("Ana Bezerra", results.get(0).name());
        assertEquals(5, results.get(0).daysUntilBirthday());
        assertEquals(32, results.get(0).turningAge());

        assertEquals(LocalDate.of(2025, 4, 28), results.get(4).nextBirthday());
    }

    @Test("registers birthday and computes summary")
    public void registersBirthday() {
        var repository = new InMemoryBirthdayRepository();
        var fixedClock = Clock.fixed(Instant.parse("2024-05-10T00:00:00Z"), ZoneOffset.UTC);
        var service = new BirthdayService(repository, fixedClock);

        BirthdaySummary created = service.registerBirthday("Novo Membro", LocalDate.of(2000, 5, 25), "Acolhida", "contato");

        assertEquals("Novo Membro", created.name());
        assertEquals(LocalDate.of(2024, 5, 25), created.nextBirthday());
        assertEquals(15, created.daysUntilBirthday());
    }
}
