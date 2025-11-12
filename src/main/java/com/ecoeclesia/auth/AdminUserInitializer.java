package com.ecoeclesia.auth;

import com.ecoeclesia.access.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final AdminProvisioningProperties adminProperties;

    public AdminUserInitializer(UserAccountService userAccountService,
                                AdminProvisioningProperties adminProperties) {
        this.userAccountService = userAccountService;
        this.adminProperties = adminProperties;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!adminProperties.isEnabled()) {
            LOGGER.debug("Admin user provisioning disabled");
            return;
        }
        if (!adminProperties.hasRequiredCredentials()) {
            LOGGER.warn("Skipping admin user provisioning due to missing credentials");
            return;
        }
        String email = adminProperties.getEmail();
        String password = adminProperties.getPassword();
        if (userAccountService.emailExists(email)) {
            LOGGER.debug("Admin user already exists: {}", email);
            return;
        }
        Set<UserRole> roleSet = parseRoles(adminProperties.getRoles());
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
