package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.access.UserRole;
import com.ecoeclesia.user.CreateUserRequest;
import com.ecoeclesia.testing.Test;
import java.util.List;

public final class AuthTokenServiceTest {

    private final AuthTokenService service =
            new AuthTokenService(
                    new com.ecoeclesia.user.UserManagementController(),
                    List.of(new CreateUserRequest("tesouraria@ecoeclesia.test", "finance123",
                            List.of(UserRole.FINANCE), null, null, null, null)));

    @Test("issues tokens with finance permissions for seeded finance account")
    public void issuesFinanceTokens() {
        AuthTokens tokens = service.login("tesouraria@ecoeclesia.test", "finance123");
        assertTrue(tokens.permissions().contains("finance:read"));
        assertEquals("Bearer", tokens.tokenType());
        assertTrue(service.isAllowed("Bearer " + tokens.accessToken(), "finance:write"));
    }
}
