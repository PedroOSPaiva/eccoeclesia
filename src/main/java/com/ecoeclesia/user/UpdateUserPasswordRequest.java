package com.ecoeclesia.user;

import java.util.Objects;

public record UpdateUserPasswordRequest(String password) {
    public UpdateUserPasswordRequest {
        Objects.requireNonNull(password, "password");
    }
}
