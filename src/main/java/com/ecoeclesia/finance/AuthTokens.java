package com.ecoeclesia.finance;

import java.util.Set;

record AuthTokens(String accessToken, String refreshToken, String tokenType, String role, Set<String> permissions,
                  boolean mustChangePassword, long daysUntilPasswordExpiry, String passwordExpiresAt) {
}
