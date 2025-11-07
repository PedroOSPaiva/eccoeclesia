package com.ecoeclesia.auth;

public record AuthenticationResponse(
        String tokenType,
        String accessToken,
        String refreshToken
) {
    public static AuthenticationResponse bearer(String accessToken, String refreshToken) {
        return new AuthenticationResponse("Bearer", accessToken, refreshToken);
    }
}
