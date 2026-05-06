package com.ecoeclesia.membros.application;

import com.ecoeclesia.membros.domain.Role;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class AutenticacaoService {
    private final SecretKey key;

    public AutenticacaoService(@Value("${security.jwt.secret:01234567890123456789012345678901}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String gerarToken(UUID usuarioId, UUID tenantIdAtual, List<Role> roles, Map<String, String> tenants) {
        Instant exp = Instant.now().plus(120, ChronoUnit.MINUTES);
        return Jwts.builder()
            .subject(usuarioId.toString())
            .claim("roles", roles.stream().map(Enum::name).toList())
            .claim("tenantIdAtual", tenantIdAtual.toString())
            .claim("tenants", tenants)
            .expiration(Date.from(exp))
            .signWith(key)
            .compact();
    }

    public io.jsonwebtoken.Claims parse(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }
}
