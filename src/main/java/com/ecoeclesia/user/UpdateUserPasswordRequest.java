package com.ecoeclesia.user;

import jakarta.validation.constraints.NotBlank;

public record UpdateUserPasswordRequest(
        @NotBlank(message = "password is required")
        String password
) {
}
