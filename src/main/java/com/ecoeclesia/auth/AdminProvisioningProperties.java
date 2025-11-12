package com.ecoeclesia.auth;

import jakarta.validation.constraints.AssertTrue;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "app.admin")
@Validated
public class AdminProvisioningProperties {

    private boolean enabled = false;

    private String email;

    private String password;

    private String roles = "TREASURER";

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public boolean hasRequiredCredentials() {
        return email != null && !email.isBlank() && password != null && !password.isBlank();
    }

    @AssertTrue(message = "app.admin.email and app.admin.password must be provided when app.admin.enabled=true")
    public boolean isCredentialsPresentWhenEnabled() {
        if (!enabled) {
            return true;
        }
        return hasRequiredCredentials();
    }
}
