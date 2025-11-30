package com.ecoeclesia.birthday;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class InMemoryBirthdayRepository implements BirthdayRepository {

    private final List<BirthdayPerson> people = new ArrayList<>();

    public InMemoryBirthdayRepository() {
        people.add(new BirthdayPerson("a1", "Ana Bezerra", LocalDate.of(1992, 5, 15), "Pastoral Infantil", "(11) 99999-1234"));
        people.add(new BirthdayPerson("b2", "Bruno Carvalho", LocalDate.of(1987, 6, 3), "Liturgia", "bruno@paroquia.com"));
        people.add(new BirthdayPerson("c3", "Carla Dias", LocalDate.of(1995, 4, 28), "Música", "(11) 98888-4321"));
        people.add(new BirthdayPerson("d4", "Daniel Souza", LocalDate.of(1980, 5, 30), "Juventude", "daniel@paroquia.com"));
        people.add(new BirthdayPerson("e5", "Elisa Tavares", LocalDate.of(1999, 12, 2), "Acolhida", "(11) 97777-0000"));
    }

    @Override
    public List<BirthdayPerson> findAll() {
        return Collections.unmodifiableList(people);
    }
}
