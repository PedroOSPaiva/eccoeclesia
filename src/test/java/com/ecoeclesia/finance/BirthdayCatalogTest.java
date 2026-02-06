package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertThrows;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.birthday.BirthdayPerson;
import com.ecoeclesia.testing.Test;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public final class BirthdayCatalogTest {

    @Test("creates updates and deletes birthday entries in csv")
    public void managesBirthdayCrud() throws IOException {
        Path temp = Files.createTempFile("birthdays", ".csv");
        try {
            BirthdayCatalog catalog = new BirthdayCatalog(temp);

            BirthdayPerson created = catalog.create("Maria", "1990-01-10", "Música", "(11)99999-0000");
            assertEquals("Maria", created.name());
            assertEquals(1, catalog.list().size());

            BirthdayPerson updated = catalog.update(created.id(), "Maria Silva", "1990-01-10", "Liturgia", "maria@email.com");
            assertEquals("Maria Silva", updated.name());
            assertEquals("Liturgia", updated.ministry());

            catalog.delete(created.id());
            assertEquals(0, catalog.list().size());
        } finally {
            Files.deleteIfExists(temp);
        }
    }

    @Test("rejects future birth date")
    public void rejectsFutureBirthDate() throws IOException {
        Path temp = Files.createTempFile("birthdays", ".csv");
        try {
            BirthdayCatalog catalog = new BirthdayCatalog(temp);
            IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                    () -> catalog.create("Pessoa", "2999-01-01", "Equipe", "contato"));
            assertEquals("Data de nascimento não pode ser futura", ex.getMessage());
        } finally {
            Files.deleteIfExists(temp);
        }
    }

    @Test("loads existing csv entries")
    public void loadsExistingCsv() throws IOException {
        Path temp = Files.createTempFile("birthdays", ".csv");
        try {
            Files.write(temp, List.of("id-1,Ana,1992-05-15,Pastoral Infantil,(11)99999-1111"), StandardCharsets.UTF_8);
            BirthdayCatalog catalog = new BirthdayCatalog(temp);
            List<BirthdayPerson> people = catalog.list();
            assertEquals(1, people.size());
            assertEquals("id-1", people.get(0).id());
            assertTrue(people.get(0).birthDate().toString().equals("1992-05-15"));
        } finally {
            Files.deleteIfExists(temp);
        }
    }
}
