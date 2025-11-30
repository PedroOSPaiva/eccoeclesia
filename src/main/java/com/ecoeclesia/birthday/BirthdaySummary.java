package com.ecoeclesia.birthday;

import java.time.LocalDate;

public record BirthdaySummary(String id, String name, LocalDate birthDate, String ministry, String contact,
                              LocalDate nextBirthday, int turningAge, long daysUntilBirthday) {
}
