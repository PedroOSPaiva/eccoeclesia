package com.ecoeclesia.access;

import static com.ecoeclesia.testing.Assertions.assertFalse;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.testing.Test;

public final class UserAccessPolicyTest {

    private final UserAccessPolicy policy = new UserAccessPolicy();

    @Test("allows admins to manage users")
    public void allowsAdminActions() {
        assertTrue(policy.isAllowed(UserRole.ADMIN, "users:write"));
    }

    @Test("denies volunteers from finance data")
    public void deniesVolunteerFinanceAccess() {
        assertFalse(policy.isAllowed(UserRole.VOLUNTEER, "finance:read"),
                "volunteers should not see finance data");
    }
}
