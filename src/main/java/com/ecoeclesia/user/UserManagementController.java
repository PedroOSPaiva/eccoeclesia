package com.ecoeclesia.user;

import com.ecoeclesia.access.UserAccessPolicy;
import com.ecoeclesia.access.UserRole;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ecoeclesia.user.PasswordHasher.hash;

@RestController
@RequestMapping("/api/users")
public class UserManagementController {

    private final UserAccountRepository repository;
    private final UserAccessPolicy accessPolicy = new UserAccessPolicy();

    public UserManagementController() {
        this(new InMemoryUserAccountRepository());
    }

    public UserManagementController(UserAccountRepository repository) {
        this.repository = Objects.requireNonNull(repository, "repository");
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public UserAccountResponse createUser(@RequestBody CreateUserRequest request) {
        Objects.requireNonNull(request, "request");
        if (repository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already registered");
        }
        UserAccount account = new UserAccount(
                request.email(),
                hash(request.password()),
                Set.copyOf(request.roles()),
                request.fullName(),
                request.birthDate(),
                request.address(),
                request.photoUrl());
        repository.save(account);
        return UserAccountResponse.from(account, permissionsFor(account.getRoles()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserAccountResponse> listUsers() {
        return repository.findAll().stream()
                .map(account -> UserAccountResponse.from(account, permissionsFor(account.getRoles())))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable String id) {
        repository.deleteById(id);
    }

    public UserAccountResponse updatePassword(String id, UpdateUserPasswordRequest request) {
        UserAccount account = requireAccount(id);
        account.updatePassword(hash(request.password()));
        repository.save(account);
        return UserAccountResponse.from(account, permissionsFor(account.getRoles()));
    }

    public UserAccountResponse updateRoles(String id, UpdateUserRolesRequest request) {
        UserAccount account = requireAccount(id);
        account.replaceRoles(Set.copyOf(request.roles()));
        repository.save(account);
        return UserAccountResponse.from(account, permissionsFor(account.getRoles()));
    }

    public UserAccountResponse updateProfile(String id, UpdateUserProfileRequest request) {
        Objects.requireNonNull(request, "request");
        UserAccount account = requireAccount(id);
        String nextEmail = normalize(request.email());
        if (nextEmail != null && !account.getEmail().equalsIgnoreCase(nextEmail) && repository.existsByEmail(nextEmail)) {
            throw new IllegalArgumentException("Email already registered");
        }
        account.updateProfile(
                nextEmail,
                normalize(request.fullName()),
                normalize(request.birthDate()),
                normalize(request.address()),
                normalize(request.photoUrl()));
        repository.save(account);
        return UserAccountResponse.from(account, permissionsFor(account.getRoles()));
    }

    public UserAccount findAccountByEmail(String email) {
        if (email == null) {
            return null;
        }
        return repository.findByEmail(email).orElse(null);
    }

    public boolean credentialsMatch(String email, String rawPassword) {
        UserAccount account = findAccountByEmail(email);
        if (account == null) {
            return false;
        }
        return PasswordHasher.matches(rawPassword, account.getHashedPassword());
    }

    private UserAccount requireAccount(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + id));
    }

    private static String hash(String value) {
        return PasswordHasher.hash(value);
    }

    private Set<String> permissionsFor(Set<UserRole> roles) {
        return roles.stream()
                .flatMap(role -> accessPolicy.permissionsFor(role).stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    private static String normalize(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isBlank() ? null : trimmed;
    }
}
