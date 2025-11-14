package com.ecoeclesia.user;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertThrows;

import com.ecoeclesia.access.UserRole;
import com.ecoeclesia.testing.Test;
import java.util.List;

public final class UserManagementControllerTest {

    private final UserManagementController controller = new UserManagementController();

    @Test("creates users with hashed passwords")
    public void createsUsers() {
        var response = controller.createUser(new CreateUserRequest("admin@ecoeclesia.org", "secret",
                List.of(UserRole.ADMIN)));
        assertEquals("admin@ecoeclesia.org", response.email());
        assertEquals(1, controller.listUsers().size());
    }

    @Test("prevents duplicated emails")
    public void preventsDuplicates() {
        controller.createUser(new CreateUserRequest("finance@ecoeclesia.org", "secret", List.of(UserRole.FINANCE)));
        assertThrows(IllegalArgumentException.class, () -> controller.createUser(
                new CreateUserRequest("finance@ecoeclesia.org", "another", List.of(UserRole.FINANCE))));
    }

    @Test("updates passwords")
    public void updatesPasswords() {
        var response = controller.createUser(new CreateUserRequest("volunteer@ecoeclesia.org", "123",
                List.of(UserRole.VOLUNTEER)));
        var updated = controller.updatePassword(response.id(), new UpdateUserPasswordRequest("456"));
        assertEquals(response.id(), updated.id());
    }
}
