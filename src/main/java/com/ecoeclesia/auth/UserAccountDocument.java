package com.ecoeclesia.auth;

import com.ecoeclesia.access.UserRole;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collections;
import java.util.EnumSet;
import java.util.Objects;
import java.util.Set;

@Document(collection = "users")
public class UserAccountDocument {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String password;

    private Set<UserRole> roles = EnumSet.noneOf(UserRole.class);

    public UserAccountDocument() {
    }

    public UserAccountDocument(String id, String email, String password, Set<UserRole> roles) {
        this.id = id;
        setEmail(email);
        setPassword(password);
        setRoles(roles);
    }

    public static UserAccountDocument of(String email, String password, Set<UserRole> roles) {
        return new UserAccountDocument(null, email, password, roles);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = Objects.requireNonNull(email, "email must not be null").toLowerCase();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = Objects.requireNonNull(password, "password must not be null");
    }

    public Set<UserRole> getRoles() {
        return Collections.unmodifiableSet(roles);
    }

    public void setRoles(Set<UserRole> roles) {
        Objects.requireNonNull(roles, "roles must not be null");
        if (roles.isEmpty()) {
            throw new IllegalArgumentException("roles must not be empty");
        }
        this.roles = EnumSet.copyOf(roles);
    }
}
