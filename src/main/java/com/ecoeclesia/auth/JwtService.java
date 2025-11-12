package com.ecoeclesia.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

@Component
public class JwtService {

    private static final String TOKEN_TYPE_CLAIM = "typ";
    private static final String TOKEN_TYPE_ACCESS = "ACCESS";
    private static final String TOKEN_TYPE_REFRESH = "REFRESH";

    private final JwtProperties properties;

    public JwtService(JwtProperties properties) {
        this.properties = properties;
    }

    public String generateAccessToken(UserAccountDocument account) {
        return generateToken(account, TOKEN_TYPE_ACCESS, properties.getAccessTokenValidity().getSeconds());
    }

    public String generateRefreshToken(UserAccountDocument account) {
        return generateToken(account, TOKEN_TYPE_REFRESH, properties.getRefreshTokenValidity().getSeconds());
    }

    public boolean isAccessToken(String token) {
        return TOKEN_TYPE_ACCESS.equals(extractTokenType(token));
    }

    public boolean isRefreshToken(String token) {
        return TOKEN_TYPE_REFRESH.equals(extractTokenType(token));
    }

    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equalsIgnoreCase(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private String generateToken(UserAccountDocument account, String tokenType, long validitySeconds) {
        Instant now = Instant.now();
        Instant expiry = now.plus(validitySeconds, ChronoUnit.SECONDS);

        return Jwts.builder()
                .subject(account.getEmail())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .addClaims(Map.of(
                        TOKEN_TYPE_CLAIM, tokenType,
                        "uid", account.getId()
                ))
                .signWith(getSigningKey())
                .compact();
    }

    private boolean isTokenExpired(String token) {
        Date expiration = parseClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    private String extractTokenType(String token) {
        Object value = parseClaims(token).get(TOKEN_TYPE_CLAIM);
        return value == null ? null : value.toString();
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(properties.getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
