package com.ecoeclesia.auth;

import com.ecoeclesia.access.UserRole;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Set;

@Service
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAccountService(UserAccountRepository userAccountRepository,
                              PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserAccountDocument createUser(String email, String rawPassword, Set<UserRole> roles) {
        Objects.requireNonNull(email, "email must not be null");
        Objects.requireNonNull(rawPassword, "rawPassword must not be null");
        Objects.requireNonNull(roles, "roles must not be null");

        UserAccountDocument account = UserAccountDocument.of(email, encodePassword(rawPassword), roles);
        account.setEmail(email);
        return userAccountRepository.save(account);
    }

    public UserAccountDocument save(UserAccountDocument account) {
        return userAccountRepository.save(account);
    }

    public UserAccountDocument updatePassword(UserAccountDocument account, String rawPassword) {
        account.setPassword(encodePassword(rawPassword));
        return userAccountRepository.save(account);
    }

    public boolean emailExists(String email) {
        return userAccountRepository.findByEmail(email.toLowerCase()).isPresent();
    }

    public UserAccountDocument requireByEmail(String email) {
        return userAccountRepository.findByEmail(email.toLowerCase())
                .orElseThrow(() -> new UserNotFoundException(email));
    }

    private String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
