package com.ecoeclesia.birthday;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public final class CsvBirthdayRepository implements BirthdayRepository {

    private final Path dataFile;

    public CsvBirthdayRepository(Path dataFile) {
        this.dataFile = Objects.requireNonNull(dataFile);
    }

    @Override
    public List<BirthdayPerson> findAll() {
        if (!Files.exists(dataFile)) {
            return List.of();
        }
        List<BirthdayPerson> people = new ArrayList<>();
        List<String> lines;
        try {
            lines = Files.readAllLines(dataFile, StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new IllegalStateException("Falha ao ler aniversariantes em " + dataFile, ex);
        }
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                continue;
            }
            String[] parts = trimmed.split(",");
            if (parts.length < 5) {
                continue;
            }
            people.add(new BirthdayPerson(
                    parts[0].trim(),
                    parts[1].trim(),
                    LocalDate.parse(parts[2].trim()),
                    parts[3].trim(),
                    parts[4].trim()));
        }
        return List.copyOf(people);
    }
}
