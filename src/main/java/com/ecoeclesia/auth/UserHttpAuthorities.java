package com.ecoeclesia.auth;

import com.ecoeclesia.access.UserAccessPolicy;
import com.ecoeclesia.access.UserRole;

import java.util.LinkedHashSet;
import java.util.Set;

public final class UserHttpAuthorities {

    public static final String MANAGE_EXPENSES = "expenses:manage";
    public static final String MANAGE_REVENUES = "revenues:manage";
    public static final String MANAGE_INVENTORY = "inventory:manage";
    public static final String VIEW_INVENTORY = "inventory:view";
    public static final String VIEW_REPORTS = "reports:view";
    public static final String MANAGE_USERS = "users:manage";

    private UserHttpAuthorities() {
    }

    public static Set<String> fromRole(UserRole role) {
        Set<String> authorities = new LinkedHashSet<>();
        authorities.add("ROLE_" + role.name());
        if (UserAccessPolicy.canManageExpenses(role)) {
            authorities.add(MANAGE_EXPENSES);
        }
        if (UserAccessPolicy.canManageRevenues(role)) {
            authorities.add(MANAGE_REVENUES);
        }
        if (UserAccessPolicy.canManageInventory(role)) {
            authorities.add(MANAGE_INVENTORY);
        }
        if (UserAccessPolicy.canViewInventory(role)) {
            authorities.add(VIEW_INVENTORY);
        }
        if (UserAccessPolicy.canViewReports(role)) {
            authorities.add(VIEW_REPORTS);
        }
        if (UserAccessPolicy.canManageUsers(role)) {
            authorities.add(MANAGE_USERS);
        }
        return authorities;
    }
}
