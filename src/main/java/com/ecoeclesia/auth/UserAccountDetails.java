package com.ecoeclesia.auth;

import com.ecoeclesia.access.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public class UserAccountDetails implements UserDetails {

    private final UserAccountDocument account;
    private final Set<GrantedAuthority> authorities;

    public UserAccountDetails(UserAccountDocument account) {
        this.account = Objects.requireNonNull(account, "account must not be null");
        this.authorities = computeAuthorities(account.getRoles());
    }

    public UserAccountDocument getAccount() {
        return account;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public String getUsername() {
        return account.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    private Set<GrantedAuthority> computeAuthorities(Set<UserRole> roles) {
        return roles.stream()
                .map(UserHttpAuthorities::fromRole)
                .flatMap(Set::stream)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }
}
