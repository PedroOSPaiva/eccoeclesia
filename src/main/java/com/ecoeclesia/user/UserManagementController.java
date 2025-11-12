package com.ecoeclesia.user;

import com.ecoeclesia.access.UserRole;
import com.ecoeclesia.auth.UserAccountDetails;
import com.ecoeclesia.auth.UserAccountEntity;
import com.ecoeclesia.auth.UserAccountService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.EnumSet;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserManagementController {

    private final UserAccountService userAccountService;

    public UserManagementController(UserAccountService userAccountService) {
        this.userAccountService = userAccountService;
    }

    @GetMapping
    public List<UserAccountResponse> listUsers() {
        return userAccountService.listUsers()
                .stream()
                .map(UserAccountResponse::fromEntity)
                .toList();
    }

    @PostMapping
    public ResponseEntity<UserAccountResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
        Set<UserRole> roles = parseRoles(request.roles());
        UserAccountEntity entity = userAccountService.createUser(request.email(), request.password(), roles);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserAccountResponse.fromEntity(entity));
    }

    @PutMapping("/{id}/roles")
    public UserAccountResponse updateRoles(@PathVariable UUID id, @Valid @RequestBody UpdateUserRolesRequest request) {
        UserAccountEntity account = userAccountService.requireById(id);
        Set<UserRole> roles = parseRoles(request.roles());
        UserAccountEntity updated = userAccountService.updateRoles(account, roles);
        return UserAccountResponse.fromEntity(updated);
    }

    @PutMapping("/{id}/password")
    public UserAccountResponse updatePassword(@PathVariable UUID id, @Valid @RequestBody UpdateUserPasswordRequest request) {
        UserAccountEntity account = userAccountService.requireById(id);
        UserAccountEntity updated = userAccountService.updatePassword(account, request.password());
        return UserAccountResponse.fromEntity(updated);
    }

    @GetMapping("/me")
    public UserAccountResponse currentUser(Authentication authentication) {
        Objects.requireNonNull(authentication, "authentication must not be null");
        UserAccountDetails principal = (UserAccountDetails) authentication.getPrincipal();
        return UserAccountResponse.fromEntity(principal.getAccount());
    }

    private Set<UserRole> parseRoles(Set<String> roleNames) {
        Objects.requireNonNull(roleNames, "roles must not be null");
        if (roleNames.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "roles must not be empty");
        }
        EnumSet<UserRole> roles = EnumSet.noneOf(UserRole.class);
        for (String roleName : roleNames) {
            try {
                roles.add(UserRole.valueOf(roleName.trim().toUpperCase(Locale.ROOT)));
            } catch (IllegalArgumentException ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role: " + roleName, ex);
            }
        }
        return roles;
    }
}
