package com.ecoeclesia.auth;

import com.ecoeclesia.access.UserAccessPolicy;
import com.ecoeclesia.access.UserRole;

import java.util.LinkedHashSet;
import java.util.Set;

public final class UserHttpAuthorities {

    public static final String MANAGE_EXPENSES = "expenses:manage";
    public static final String MANAGE_INVENTORY = "inventory:manage";
    public static final String VIEW_REPORTS = "reports:view";

    private UserHttpAuthorities() {
    }

    public static Set<String> fromRole(UserRole role) {
        Set<String> authorities = new LinkedHashSet<>();
        authorities.add("ROLE_" + role.name());
        if (UserAccessPolicy.canManageExpenses(role)) {
            authorities.add(MANAGE_EXPENSES);
        }
        if (UserAccessPolicy.canManageInventory(role)) {
            authorities.add(MANAGE_INVENTORY);
        }
        if (UserAccessPolicy.canViewReports(role)) {
            authorities.add(VIEW_REPORTS);
        }
        return authorities;
    }
}
