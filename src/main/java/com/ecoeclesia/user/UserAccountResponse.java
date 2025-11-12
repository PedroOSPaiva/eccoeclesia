package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import com.ecoeclesia.auth.UserAccountEntity;
import com.ecoeclesia.auth.UserHttpAuthorities;

import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public record UserAccountResponse(
        UUID id,
        String email,
        Set<String> roles,
        Set<String> authorities
) {

    public static UserAccountResponse fromEntity(UserAccountEntity entity) {
        Objects.requireNonNull(entity, "entity must not be null");
        Set<UserRole> roleSet = entity.getRoles();
        Set<String> roleNames = roleSet.stream()
                .map(UserRole::name)
                .collect(Collectors.toCollection(LinkedHashSet::new));
        Set<String> authoritySet = roleSet.stream()
                .map(UserHttpAuthorities::fromRole)
                .flatMap(Set::stream)
                .collect(Collectors.toCollection(LinkedHashSet::new));
        return new UserAccountResponse(entity.getId(), entity.getEmail(), roleNames, authoritySet);
    }
}
