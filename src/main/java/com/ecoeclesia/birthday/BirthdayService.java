package com.ecoeclesia.birthday;

import com.ecoeclesia.member.Member;
import com.ecoeclesia.member.MemberRepository;

import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

public final class BirthdayService {

    private final MemberRepository memberRepository;
    private final BirthdayRepository repository;
    private final Clock clock;

    public BirthdayService(MemberRepository memberRepository, BirthdayRepository repository, Clock clock) {
        this.memberRepository = memberRepository;
        this.repository = repository;
        this.clock = Objects.requireNonNull(clock, "clock");
    }

    public BirthdayService(BirthdayRepository repository, Clock clock) {
        this(null, repository, clock);
    }

    public BirthdayService(MemberRepository memberRepository, Clock clock) {
        this(memberRepository, null, clock);
    }

    public BirthdayService(MemberRepository memberRepository, BirthdayRepository repository) {
        this(memberRepository, repository, Clock.systemUTC());
    }

    public BirthdayService(MemberRepository memberRepository) {
        this(memberRepository, null, Clock.systemUTC());
    }

    public BirthdayService(BirthdayRepository repository) {
        this(null, repository, Clock.systemUTC());
    }

    public List<BirthdaySummary> listUpcomingBirthdays() {
        return listUpcomingBirthdays(null);
    }

    public List<BirthdaySummary> listUpcomingBirthdays(String communityId) {
        LocalDate today = LocalDate.now(clock);
        List<BirthdaySummary> result = new ArrayList<>();

        if (memberRepository != null) {
            List<Member> list = (communityId != null && !communityId.isBlank() && !"ALL".equalsIgnoreCase(communityId))
                    ? memberRepository.findByCommunityId(communityId)
                    : memberRepository.findAll();

            list.stream()
                    .filter(m -> m.birthDate() != null)
                    .filter(m -> "ACTIVE".equalsIgnoreCase(m.status()) || "ATIVO".equalsIgnoreCase(m.status()))
                    .map(m -> toSummary(today, m))
                    .forEach(result::add);
        }

        if (repository != null && (result.isEmpty() || communityId == null || "ALL".equalsIgnoreCase(communityId))) {
            repository.findAll().stream()
                    .map(person -> toSummary(today, person))
                    .forEach(result::add);
        }

        return result.stream()
                .sorted(Comparator.comparingLong(BirthdaySummary::daysUntilBirthday).thenComparing(BirthdaySummary::name))
                .toList();
    }

    public BirthdaySummary registerBirthday(String communityId, String name, LocalDate birthDate, String ministry, String contact) {
        String normalizedName = normalizeRequired(name, "Nome é obrigatório");
        LocalDate normalizedBirthDate = Objects.requireNonNull(birthDate, "birthDate");
        if (normalizedBirthDate.isAfter(LocalDate.now(clock))) {
            throw new IllegalArgumentException("Data de nascimento inválida");
        }

        if (memberRepository != null && communityId != null && !communityId.isBlank() && !"ALL".equalsIgnoreCase(communityId)) {
            Member member = Member.create(
                    communityId,
                    normalizedName,
                    normalizedBirthDate,
                    normalizeOptional(contact),
                    null,
                    normalizeOptional(ministry)
            );
            Member saved = memberRepository.save(member);
            return toSummary(LocalDate.now(clock), saved);
        }

        if (repository != null) {
            BirthdayPerson saved = repository.save(BirthdayPerson.create(
                    normalizedName,
                    normalizedBirthDate,
                    normalizeOptional(ministry),
                    normalizeOptional(contact)));
            return toSummary(LocalDate.now(clock), saved);
        }
        return new BirthdaySummary(
                "temp",
                communityId,
                normalizedName,
                normalizedBirthDate,
                normalizeOptional(ministry),
                normalizeOptional(contact),
                normalizedBirthDate.withYear(LocalDate.now(clock).getYear()),
                Period.between(normalizedBirthDate, LocalDate.now(clock)).getYears(),
                0
        );
    }

    public BirthdaySummary registerBirthday(String name, LocalDate birthDate, String ministry, String contact) {
        return registerBirthday(null, name, birthDate, ministry, contact);
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

    private static BirthdaySummary toSummary(LocalDate today, Member m) {
        LocalDate nextBirthday = m.birthDate().withYear(today.getYear());
        if (nextBirthday.isBefore(today)) {
            nextBirthday = nextBirthday.plusYears(1);
        }
        long daysUntil = ChronoUnit.DAYS.between(today, nextBirthday);
        int turningAge = Period.between(m.birthDate(), nextBirthday).getYears();
        String contact = (m.phone() != null && !m.phone().isBlank())
                ? m.phone()
                : (m.email() != null ? m.email() : "");

        return new BirthdaySummary(
                m.id(),
                m.communityId(),
                m.name(),
                m.birthDate(),
                m.ministry() != null && !m.ministry().isBlank() ? m.ministry() : "Comunidade",
                contact,
                nextBirthday,
                turningAge,
                daysUntil
        );
    }

    private static BirthdaySummary toSummary(LocalDate today, BirthdayPerson person) {
        LocalDate nextBirthday = person.birthDate().withYear(today.getYear());
        if (nextBirthday.isBefore(today)) {
            nextBirthday = nextBirthday.plusYears(1);
        }
        long daysUntil = ChronoUnit.DAYS.between(today, nextBirthday);
        int turningAge = Period.between(person.birthDate(), nextBirthday).getYears();

        return new BirthdaySummary(
                person.id(),
                null,
                person.name(),
                person.birthDate(),
                person.ministry(),
                person.contact(),
                nextBirthday,
                turningAge,
                daysUntil
        );
    }
}
