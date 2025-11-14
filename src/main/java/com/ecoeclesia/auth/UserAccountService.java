package com.ecoeclesia.auth;

import com.ecoeclesia.access.UserRole;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Service
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAccountService(UserAccountRepository userAccountRepository,
                              PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserAccountEntity createUser(String email, String rawPassword, Set<UserRole> roles) {
        Objects.requireNonNull(email, "email must not be null");
        Objects.requireNonNull(rawPassword, "rawPassword must not be null");
        Objects.requireNonNull(roles, "roles must not be null");

        UserAccountEntity account = UserAccountEntity.of(email, encodePassword(rawPassword), roles);
        account.setEmail(email);
        return userAccountRepository.save(account);
    }

    public UserAccountEntity save(UserAccountEntity account) {
        return userAccountRepository.save(account);
    }

    public List<UserAccountEntity> listUsers() {
        return userAccountRepository.findAll();
    }

    public UserAccountEntity requireById(UUID id) {
        return userAccountRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id.toString()));
    }

    public UserAccountEntity updateRoles(UserAccountEntity account, Set<UserRole> roles) {
        account.setRoles(roles);
        return userAccountRepository.save(account);
    }

    public UserAccountEntity updatePassword(UserAccountEntity account, String rawPassword) {
        account.setPassword(encodePassword(rawPassword));
        return userAccountRepository.save(account);
    }

    public boolean emailExists(String email) {
        return userAccountRepository.findByEmail(email.toLowerCase()).isPresent();
    }

    public UserAccountEntity requireByEmail(String email) {
        return userAccountRepository.findByEmail(email.toLowerCase())
                .orElseThrow(() -> new UserNotFoundException(email));
    }

    private String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
