package com.ecoeclesia.config;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertThrows;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.testing.Test;

public final class DatabaseUrlResolverTest {

    @Test("converts postgres url to jdbc format")
    public void convertsPostgresUrl() {
        var credentials = DatabaseUrlResolver.resolve("postgresql://user:secret@db.example.com:6543/ecoeclesia").orElseThrow();
        assertEquals("jdbc:postgresql://db.example.com:6543/ecoeclesia", credentials.jdbcUrl());
        assertEquals("user", credentials.username());
        assertEquals("secret", credentials.password());
    }

    @Test("returns empty for other schemes")
    public void ignoresUnknownSchemes() {
        assertTrue(DatabaseUrlResolver.resolve("mysql://root@localhost:3306/app").isEmpty());
    }

    @Test("keeps jdbc urls untouched")
    public void keepsJdbcUrlUntouched() {
        var credentials = DatabaseUrlResolver.resolve("jdbc:postgresql://localhost:5432/app").orElseThrow();
        assertEquals("jdbc:postgresql://localhost:5432/app", credentials.jdbcUrl());
    }

    @Test("rejects url without database name")
    public void rejectsUrlWithoutDatabase() {
        assertThrows(IllegalArgumentException.class,
                () -> DatabaseUrlResolver.resolve("postgresql://user:secret@db.example.com").orElseThrow());
    }
}
