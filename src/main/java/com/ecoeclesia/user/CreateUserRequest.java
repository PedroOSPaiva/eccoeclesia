package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import java.util.List;
import java.util.Objects;

public record CreateUserRequest(String email, String password, List<UserRole> roles,
                                String fullName, String birthDate, String address, String photoUrl) {
    public CreateUserRequest {
        Objects.requireNonNull(email, "email");
        Objects.requireNonNull(password, "password");
        Objects.requireNonNull(roles, "roles");
    }
}
