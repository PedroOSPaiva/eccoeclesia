package com.ecoeclesia.user;

import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

public record UpdateUserRolesRequest(
        @NotEmpty(message = "roles must not be empty")
        Set<String> roles
) {
}
