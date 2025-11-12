package com.ecoeclesia.config;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class DatabaseUrlResolverTest {

    @Test
    void convertsPostgresUrlToJdbc() {
        var credentials = DatabaseUrlResolver.resolve("postgresql://user:secret@db.example.com:6543/ecoeclesia")
                .orElseThrow();

        assertThat(credentials.jdbcUrl())
                .isEqualTo("jdbc:postgresql://db.example.com:6543/ecoeclesia");
        assertThat(credentials.username()).isEqualTo("user");
        assertThat(credentials.password()).isEqualTo("secret");
    }

    @Test
    void preservesQueryParameters() {
        var credentials = DatabaseUrlResolver.resolve("postgres://user:secret@db.example.com/ecoeclesia?sslmode=require")
                .orElseThrow();

        assertThat(credentials.jdbcUrl())
                .isEqualTo("jdbc:postgresql://db.example.com:5432/ecoeclesia?sslmode=require");
        assertThat(credentials.username()).isEqualTo("user");
        assertThat(credentials.password()).isEqualTo("secret");
    }

    @Test
    void returnsEmptyForUnknownScheme() {
        assertThat(DatabaseUrlResolver.resolve("mysql://user:secret@db.example.com:3306/app"))
                .isEmpty();
    }

    @Test
    void keepsJdbcUrlUntouched() {
        var credentials = DatabaseUrlResolver.resolve("jdbc:postgresql://localhost:5432/app")
                .orElseThrow();

        assertThat(credentials.jdbcUrl()).isEqualTo("jdbc:postgresql://localhost:5432/app");
        assertThat(credentials.username()).isNull();
        assertThat(credentials.password()).isNull();
    }

    @Test
    void rejectsUrlWithoutDatabase() {
        assertThatThrownBy(() -> DatabaseUrlResolver.resolve("postgresql://user:secret@db.example.com").orElseThrow())
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("database name");
    }
}
