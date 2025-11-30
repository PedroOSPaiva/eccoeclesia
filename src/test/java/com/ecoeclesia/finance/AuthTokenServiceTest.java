package com.ecoeclesia.finance;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertTrue;

import com.ecoeclesia.testing.Test;

public final class AuthTokenServiceTest {

    private final AuthTokenService service = new AuthTokenService();

    @Test("issues tokens with finance permissions for tesoureiro emails")
    public void issuesFinanceTokens() {
        AuthTokens tokens = service.login("tesoureiro@paroquia.org", "segredo");
        assertTrue(tokens.permissions().contains("finance:read"));
        assertEquals("Bearer", tokens.tokenType());
        assertTrue(service.isAllowed("Bearer " + tokens.accessToken(), "finance:write"));
    }
}
