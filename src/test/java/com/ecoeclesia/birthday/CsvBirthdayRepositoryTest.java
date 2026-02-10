package com.ecoeclesia.birthday;

import static com.ecoeclesia.testing.Assertions.assertEquals;

import com.ecoeclesia.testing.Test;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;

public final class CsvBirthdayRepositoryTest {

    @Test("saves and lists birthdays from csv file")
    public void savesAndLists() throws IOException {
        Path file = Files.createTempFile("birthdays", ".csv");
        Files.writeString(file, "# id,name,birthDate,ministry,contact\n", StandardCharsets.UTF_8);

        var repository = new CsvBirthdayRepository(file);
        repository.save(new BirthdayPerson("x1", "Pessoa Teste", LocalDate.of(2001, 1, 10), "Pastoral", "(11) 90000-0000"));

        List<BirthdayPerson> people = repository.findAll();
        assertEquals(1, people.size());
        assertEquals("x1", people.get(0).id());
        assertEquals("Pessoa Teste", people.get(0).name());
    }
}
