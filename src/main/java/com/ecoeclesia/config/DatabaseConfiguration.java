package com.ecoeclesia.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfiguration {

    @Bean
    @Primary
    public DataSource dataSource(DataSourceProperties properties) {
        DatabaseUrlResolver.resolve(properties.getUrl()).ifPresent(credentials -> {
            properties.setUrl(credentials.jdbcUrl());
            if (credentials.username() != null && !credentials.username().isBlank()) {
                properties.setUsername(credentials.username());
            }
            if (credentials.password() != null) {
                properties.setPassword(credentials.password());
            }
        });

        return properties
                .initializeDataSourceBuilder()
                .type(HikariDataSource.class)
                .build();
    }
}
