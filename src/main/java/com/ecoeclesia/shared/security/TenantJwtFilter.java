package com.ecoeclesia.shared.security;

import com.ecoeclesia.membros.application.AutenticacaoService;
import com.ecoeclesia.shared.tenant.TenantContext;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Component
public class TenantJwtFilter extends OncePerRequestFilter {
    private final AutenticacaoService autenticacaoService;

    public TenantJwtFilter(AutenticacaoService autenticacaoService) {
        this.autenticacaoService = autenticacaoService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            var claims = autenticacaoService.parse(authHeader.substring(7));
            UUID tenantId = UUID.fromString(claims.get("tenantIdAtual", String.class));
            TenantContext.setTenantId(tenantId);
            List<String> roles = claims.get("roles", List.class);
            var authorities = roles.stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r)).toList();
            var auth = new UsernamePasswordAuthenticationToken(claims.getSubject(), null, authorities);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        try { filterChain.doFilter(request, response); }
        finally { TenantContext.clear(); }
    }
}
