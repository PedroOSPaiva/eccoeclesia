package com.ecoeclesia.access;

import java.util.EnumSet;
import java.util.Objects;
import java.util.Set;

/**
 * Centralises the authorization rules of the application based on {@link UserRole}.
 * <p>
 * The policy is intentionally simple for now and focuses on the operations
 * that were already defined in the project vision: managing expenses,
 * maintaining the inventory and consulting reports.
 */
public final class UserAccessPolicy {

    private static final Set<UserRole> MANAGEMENT_ROLES = EnumSet.of(
            UserRole.COORDINATION,
            UserRole.SECRETARIAT,
            UserRole.TREASURER,
            UserRole.PRIEST
    );

    private static final Set<UserRole> REPORT_ROLES = EnumSet.allOf(UserRole.class);
    private static final Set<UserRole> INVENTORY_VIEW_ROLES = EnumSet.allOf(UserRole.class);

    private UserAccessPolicy() {
        // Utility class
    }

    /**
     * Determines whether the given role is allowed to create, update or delete expense entries.
     *
     * @param role the role to be evaluated
     * @return {@code true} when the role has permission for expense management
     * @throws IllegalArgumentException if {@code role} is {@code null}
     */
    public static boolean canManageExpenses(UserRole role) {
        return ensureRole(role) && MANAGEMENT_ROLES.contains(role);
    }

    /**
     * Determines whether the given role is allowed to create, update or delete revenue entries.
     */
    public static boolean canManageRevenues(UserRole role) {
        return ensureRole(role) && MANAGEMENT_ROLES.contains(role);
    }

    /**
     * Determines whether the given role is allowed to manipulate the inventory.
     *
     * @param role the role to be evaluated
     * @return {@code true} when the role has permission for inventory management
     * @throws IllegalArgumentException if {@code role} is {@code null}
     */
    public static boolean canManageInventory(UserRole role) {
        return ensureRole(role) && MANAGEMENT_ROLES.contains(role);
    }

    /**
     * Determines whether the given role is allowed to consult inventory information.
     */
    public static boolean canViewInventory(UserRole role) {
        return ensureRole(role) && INVENTORY_VIEW_ROLES.contains(role);
    }

    /**
     * Determines whether the given role is allowed to visualise reports.
     *
     * @param role the role to be evaluated
     * @return {@code true} when the role has permission to visualise reports
     * @throws IllegalArgumentException if {@code role} is {@code null}
     */
    public static boolean canViewReports(UserRole role) {
        return ensureRole(role) && REPORT_ROLES.contains(role);
    }

    /**
     * Determines whether the given role is allowed to administer user accounts.
     */
    public static boolean canManageUsers(UserRole role) {
        return ensureRole(role) && MANAGEMENT_ROLES.contains(role);
    }

    private static boolean ensureRole(UserRole role) {
        if (Objects.isNull(role)) {
            throw new IllegalArgumentException("role must not be null");
        }
        return true;
    }
}
