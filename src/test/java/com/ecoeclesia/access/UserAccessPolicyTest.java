package com.ecoeclesia.access;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class UserAccessPolicyTest {

    @Nested
    @DisplayName("Expense management permissions")
    class ExpensePermissions {

        @Test
        void shouldAllowManagementRolesToManageExpenses() {
            assertThat(UserAccessPolicy.canManageExpenses(UserRole.COORDINATION)).isTrue();
            assertThat(UserAccessPolicy.canManageExpenses(UserRole.SECRETARIAT)).isTrue();
            assertThat(UserAccessPolicy.canManageExpenses(UserRole.TREASURER)).isTrue();
            assertThat(UserAccessPolicy.canManageExpenses(UserRole.PRIEST)).isTrue();
        }

        @Test
        void shouldRejectFaithfulManagingExpenses() {
            assertThat(UserAccessPolicy.canManageExpenses(UserRole.FAITHFUL)).isFalse();
        }
    }

    @Nested
    @DisplayName("Inventory management permissions")
    class InventoryPermissions {

        @Test
        void shouldAllowManagementRolesToManageInventory() {
            assertThat(UserAccessPolicy.canManageInventory(UserRole.COORDINATION)).isTrue();
            assertThat(UserAccessPolicy.canManageInventory(UserRole.SECRETARIAT)).isTrue();
            assertThat(UserAccessPolicy.canManageInventory(UserRole.TREASURER)).isTrue();
            assertThat(UserAccessPolicy.canManageInventory(UserRole.PRIEST)).isTrue();
        }

        @Test
        void shouldRejectFaithfulManagingInventory() {
            assertThat(UserAccessPolicy.canManageInventory(UserRole.FAITHFUL)).isFalse();
        }
    }

    @Nested
    @DisplayName("Report visualisation permissions")
    class ReportPermissions {

        @Test
        void shouldAllowAllRolesToViewReports() {
            for (UserRole role : UserRole.values()) {
                assertThat(UserAccessPolicy.canViewReports(role)).as("role %s", role).isTrue();
            }
        }
    }

    @Test
    void shouldValidateNullRoles() {
        assertThatThrownBy(() -> UserAccessPolicy.canManageExpenses(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("role must not be null");
    }
}
