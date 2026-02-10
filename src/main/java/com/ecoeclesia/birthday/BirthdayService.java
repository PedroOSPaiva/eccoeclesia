package com.ecoeclesia.birthday;

import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

public final class BirthdayService {

    private final BirthdayRepository repository;
    private final Clock clock;

    public BirthdayService(BirthdayRepository repository) {
        this(repository, Clock.systemUTC());
    }

    public BirthdayService(BirthdayRepository repository, Clock clock) {
        this.repository = Objects.requireNonNull(repository);
        this.clock = Objects.requireNonNull(clock);
    }

    public List<BirthdaySummary> listUpcomingBirthdays() {
        LocalDate today = LocalDate.now(clock);

        return repository.findAll().stream()
                .map(person -> toSummary(today, person))
                .sorted(Comparator.comparingLong(BirthdaySummary::daysUntilBirthday).thenComparing(BirthdaySummary::name))
                .toList();
    }

    public BirthdaySummary registerBirthday(String name, LocalDate birthDate, String ministry, String contact) {
        String normalizedName = normalizeRequired(name, "Nome é obrigatório");
        LocalDate normalizedBirthDate = Objects.requireNonNull(birthDate, "birthDate");
        if (normalizedBirthDate.isAfter(LocalDate.now(clock))) {
            throw new IllegalArgumentException("Data de nascimento inválida");
        }
        BirthdayPerson saved = repository.save(BirthdayPerson.create(
                normalizedName,
                normalizedBirthDate,
                normalizeOptional(ministry),
                normalizeOptional(contact)));
        return toSummary(LocalDate.now(clock), saved);
    }

    private static String normalizeRequired(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(message);
        }
        return value.trim();
    }

    private static String normalizeOptional(String value) {
        if (value == null) {
            return "";
        }
        return value.trim();
    }

    private static BirthdaySummary toSummary(LocalDate today, BirthdayPerson person) {
        LocalDate nextBirthday = person.birthDate().withYear(today.getYear());
        if (!nextBirthday.isAfter(today)) {
            nextBirthday = nextBirthday.plusYears(1);
        }
        long daysUntil = ChronoUnit.DAYS.between(today, nextBirthday);
        int turningAge = Period.between(person.birthDate(), nextBirthday).getYears();

        return new BirthdaySummary(person.id(), person.name(), person.birthDate(), person.ministry(), person.contact(),
                nextBirthday, turningAge, daysUntil);
    }
}
