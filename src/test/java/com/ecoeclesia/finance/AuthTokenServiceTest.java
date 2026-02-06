package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertThrows;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.access.UserRole;
import com.ecoeclesia.testing.Test;
import com.ecoeclesia.user.CreateUserRequest;
import com.ecoeclesia.user.UserManagementController;
import java.util.List;

public final class AuthTokenServiceTest {

    private AuthTokenService newService() {
        return new AuthTokenService(
                new UserManagementController(),
                List.of(new CreateUserRequest("tesouraria@ecoeclesia.test", "finance123",
                        List.of(UserRole.FINANCE), null, null, null, null)));
    }

    @Test("issues tokens with finance permissions for seeded finance account")
    public void issuesFinanceTokens() {
        AuthTokenService service = newService();
        AuthTokens tokens = service.login("tesouraria@ecoeclesia.test", "finance123");
        assertTrue(tokens.permissions().contains("finance:read"));
        assertEquals("Bearer", tokens.tokenType());
        assertTrue(service.isAllowed("Bearer " + tokens.accessToken(), "finance:write"));
    }

    @Test("resets password with forgot password token")
    public void resetsPasswordWithToken() {
        AuthTokenService service = newService();
        PasswordResetToken token = service.requestPasswordReset("tesouraria@ecoeclesia.test");
        service.resetPassword(token.token(), "novaSenha@123");

        AuthTokens newTokens = service.login("tesouraria@ecoeclesia.test", "novaSenha@123");
        assertEquals("Bearer", newTokens.tokenType());
        assertThrows(IllegalArgumentException.class,
                () -> service.login("tesouraria@ecoeclesia.test", "finance123"));
    }

    @Test("rejects invalid reset token")
    public void rejectsInvalidResetToken() {
        AuthTokenService service = newService();
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> service.resetPassword("invalid-token", "novaSenha@123"));
        assertEquals("Token de recuperação inválido", exception.getMessage());
    }
}
