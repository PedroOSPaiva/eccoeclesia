package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import java.time.Instant;
import java.util.Set;

public record UserAccountResponse(String id, String email, String fullName, String birthDate, String address,
                                  String photoUrl, Set<UserRole> roles, Set<String> authorities, Instant updatedAt) {
    public static UserAccountResponse from(UserAccount account, Set<String> authorities) {
        return new UserAccountResponse(
                account.getId(),
                account.getEmail(),
                account.getFullName(),
                account.getBirthDate(),
                account.getAddress(),
                account.getPhotoUrl(),
                account.getRoles(),
                authorities,
                account.getUpdatedAt());
    }
}
