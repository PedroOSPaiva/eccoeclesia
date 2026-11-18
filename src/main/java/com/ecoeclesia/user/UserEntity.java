package com.ecoeclesia.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.UUID;

/**
 * Entidade Spring Data JDBC mapeando a tabela 'users' criada no V1__initialize_schema.sql.
 */
@Table("users")
public class UserEntity {

    @Id
    private UUID id;
    private String email;
    private String password;

    public UserEntity() {
    }

    public UserEntity(UUID id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

