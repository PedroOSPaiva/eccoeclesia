package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import java.time.Instant;
import java.util.Set;

public record UserAccountResponse(String id, String email, Set<UserRole> roles, Instant updatedAt) {
    public static UserAccountResponse from(UserAccount account) {
        return new UserAccountResponse(account.getId(), account.getEmail(), account.getRoles(), account.getUpdatedAt());
    }
}
