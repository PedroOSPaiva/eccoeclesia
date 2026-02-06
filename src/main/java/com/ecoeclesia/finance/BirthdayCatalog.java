package com.ecoeclesia.finance;

import com.ecoeclesia.birthday.BirthdayPerson;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

final class BirthdayCatalog {

    private final Path dataFile;

    BirthdayCatalog(Path dataFile) {
        this.dataFile = Objects.requireNonNull(dataFile, "dataFile");
    }

    synchronized List<BirthdayPerson> list() throws IOException {
        return loadAll();
    }

    synchronized BirthdayPerson create(String name, String birthDate, String ministry, String contact) throws IOException {
        List<BirthdayPerson> current = loadAll();
        BirthdayPerson created = new BirthdayPerson(
                UUID.randomUUID().toString(),
                requireText(name, "Nome é obrigatório"),
                parseBirthDate(birthDate),
                normalizeOptional(ministry),
                normalizeOptional(contact));
        current.add(created);
        saveAll(current);
        return created;
    }

    synchronized BirthdayPerson update(String id, String name, String birthDate, String ministry, String contact) throws IOException {
        String normalizedId = requireText(id, "Id é obrigatório");
        List<BirthdayPerson> current = loadAll();
        for (int index = 0; index < current.size(); index++) {
            BirthdayPerson existing = current.get(index);
            if (existing.id().equals(normalizedId)) {
                BirthdayPerson updated = new BirthdayPerson(
                        existing.id(),
                        requireText(name, "Nome é obrigatório"),
                        parseBirthDate(birthDate),
                        normalizeOptional(ministry),
                        normalizeOptional(contact));
                current.set(index, updated);
                saveAll(current);
                return updated;
            }
        }
        throw new IllegalArgumentException("Aniversariante não encontrado: " + normalizedId);
    }

    synchronized void delete(String id) throws IOException {
        String normalizedId = requireText(id, "Id é obrigatório");
        List<BirthdayPerson> current = loadAll();
        boolean removed = current.removeIf(person -> person.id().equals(normalizedId));
        if (!removed) {
            throw new IllegalArgumentException("Aniversariante não encontrado: " + normalizedId);
        }
        saveAll(current);
    }

    private List<BirthdayPerson> loadAll() throws IOException {
        if (!Files.exists(dataFile)) {
            return new ArrayList<>();
        }
        List<BirthdayPerson> results = new ArrayList<>();
        for (String line : Files.readAllLines(dataFile, StandardCharsets.UTF_8)) {
            String trimmed = line.trim();
            if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                continue;
            }
            String[] parts = trimmed.split(",", -1);
            if (parts.length < 5) {
                continue;
            }
            results.add(new BirthdayPerson(
                    parts[0].trim(),
                    parts[1].trim(),
                    LocalDate.parse(parts[2].trim()),
                    emptyToNull(parts[3].trim()),
                    emptyToNull(parts[4].trim())));
        }
        return results;
    }

    private void saveAll(List<BirthdayPerson> people) throws IOException {
        Path parent = dataFile.getParent();
        if (parent != null) {
            Files.createDirectories(parent);
        }
        List<String> lines = people.stream()
                .map(this::toCsvLine)
                .toList();
        Files.write(dataFile, lines, StandardCharsets.UTF_8);
    }

    private String toCsvLine(BirthdayPerson person) {
        return String.join(",",
                sanitizeCsv(person.id()),
                sanitizeCsv(person.name()),
                person.birthDate().toString(),
                sanitizeCsv(person.ministry()),
                sanitizeCsv(person.contact()));
    }

    private String sanitizeCsv(String value) {
        if (value == null) {
            return "";
        }
        if (value.contains(",")) {
            throw new IllegalArgumentException("Campos não podem conter vírgula");
        }
        return value;
    }

    private String requireText(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(message);
        }
        String cleaned = value.trim();
        if (cleaned.length() > 120) {
            throw new IllegalArgumentException("Campo excede o limite de 120 caracteres");
        }
        return cleaned;
    }

    private String normalizeOptional(String value) {
        String cleaned = emptyToNull(value);
        if (cleaned == null) {
            return null;
        }
        if (cleaned.length() > 120) {
            throw new IllegalArgumentException("Campo excede o limite de 120 caracteres");
        }
        return cleaned;
    }

    private LocalDate parseBirthDate(String value) {
        String cleaned = requireText(value, "Data de nascimento é obrigatória");
        LocalDate date = LocalDate.parse(cleaned);
        if (date.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Data de nascimento não pode ser futura");
        }
        return date;
    }

    private String emptyToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
