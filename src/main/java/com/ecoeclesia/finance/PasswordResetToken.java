package com.ecoeclesia.finance;

public record PasswordResetToken(String token, String expiresAt) {
}
