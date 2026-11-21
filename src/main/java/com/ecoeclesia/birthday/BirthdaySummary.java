package com.ecoeclesia.birthday;

import java.time.LocalDate;

public record BirthdaySummary(
        String id,
        String communityId,
        String name,
        LocalDate birthDate,
        String ministry,
        String contact,
        LocalDate nextBirthday,
        int turningAge,
        long daysUntilBirthday
) {
    public BirthdaySummary(
            String id,
            String name,
            LocalDate birthDate,
            String ministry,
            String contact,
            LocalDate nextBirthday,
            int turningAge,
            long daysUntilBirthday
    ) {
        this(id, null, name, birthDate, ministry, contact, nextBirthday, turningAge, daysUntilBirthday);
    }
}
