package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import java.util.List;
import java.util.Objects;

public record UpdateUserRolesRequest(List<UserRole> roles) {
    public UpdateUserRolesRequest {
        Objects.requireNonNull(roles, "roles");
    }
}
