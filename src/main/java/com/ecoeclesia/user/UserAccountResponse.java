package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import com.ecoeclesia.auth.UserAccountDocument;
import com.ecoeclesia.auth.UserHttpAuthorities;

import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public record UserAccountResponse(
        String id,
        String email,
        Set<String> roles,
        Set<String> authorities
) {

    public static UserAccountResponse fromDocument(UserAccountDocument document) {
        Objects.requireNonNull(document, "document must not be null");
        Set<UserRole> roleSet = document.getRoles();
        Set<String> roleNames = roleSet.stream()
                .map(UserRole::name)
                .collect(Collectors.toCollection(LinkedHashSet::new));
        Set<String> authoritySet = roleSet.stream()
                .map(UserHttpAuthorities::fromRole)
                .flatMap(Set::stream)
                .collect(Collectors.toCollection(LinkedHashSet::new));
        return new UserAccountResponse(document.getId(), document.getEmail(), roleNames, authoritySet);
    }
}
