package com.ecoeclesia.auth;

import com.ecoeclesia.access.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.EnumSet;
import java.util.Locale;
import java.util.Set;

@Component
public class AdminUserInitializer implements ApplicationRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UserAccountService userAccountService;
    private final boolean enabled;
    private final String email;
    private final String password;
    private final String roles;

    public AdminUserInitializer(UserAccountService userAccountService,
                                @Value("${app.admin.enabled:true}") boolean enabled,
                                @Value("${app.admin.email:admin@ecoeclesia.com}") String email,
                                @Value("${app.admin.password:changeme}") String password,
                                @Value("${app.admin.roles:TREASURER}") String roles) {
        this.userAccountService = userAccountService;
        this.enabled = enabled;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!enabled) {
            LOGGER.debug("Admin user provisioning disabled");
            return;
        }
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            LOGGER.warn("Skipping admin user provisioning due to missing credentials");
            return;
        }
        if (userAccountService.emailExists(email)) {
            LOGGER.debug("Admin user already exists: {}", email);
            return;
        }
        Set<UserRole> roleSet = parseRoles(roles);
        userAccountService.createUser(email, password, roleSet);
        LOGGER.info("Provisioned default admin user: {}", email);
    }

    private Set<UserRole> parseRoles(String roles) {
        EnumSet<UserRole> roleSet = EnumSet.noneOf(UserRole.class);
        if (roles == null || roles.isBlank()) {
            roleSet.add(UserRole.TREASURER);
            return roleSet;
        }
        String[] parts = roles.split(",");
        for (String part : parts) {
            String normalized = part.trim();
            if (normalized.isEmpty()) {
                continue;
            }
            try {
                roleSet.add(UserRole.valueOf(normalized.toUpperCase(Locale.ROOT)));
            } catch (IllegalArgumentException ex) {
                LOGGER.warn("Ignoring unknown admin role: {}", normalized);
            }
        }
        if (roleSet.isEmpty()) {
            roleSet.add(UserRole.TREASURER);
        }
        return roleSet;
    }
}
