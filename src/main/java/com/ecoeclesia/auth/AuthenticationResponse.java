package com.ecoeclesia.auth;

import com.ecoeclesia.user.UserAccountResponse;

public record AuthenticationResponse(
        String tokenType,
        String accessToken,
        String refreshToken,
        UserAccountResponse user
) {
    public static AuthenticationResponse bearer(String accessToken, String refreshToken, UserAccountResponse user) {
        return new AuthenticationResponse("Bearer", accessToken, refreshToken, user);
    }
}
