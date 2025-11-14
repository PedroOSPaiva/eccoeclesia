package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import java.util.List;
import java.util.Objects;

public record CreateUserRequest(String email, String password, List<UserRole> roles) {
    public CreateUserRequest {
        Objects.requireNonNull(email, "email");
        Objects.requireNonNull(password, "password");
        Objects.requireNonNull(roles, "roles");
    }
}
