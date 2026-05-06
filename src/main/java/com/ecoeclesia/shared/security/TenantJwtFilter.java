package com.ecoeclesia.shared.security;

import com.ecoeclesia.shared.tenant.TenantContext;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Component
public class TenantJwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String tenantHeader = request.getHeader("X-Tenant-Id");
        String userHeader = request.getHeader("X-User-Id");
        if (tenantHeader != null && userHeader != null) {
            TenantContext.setTenantId(UUID.fromString(tenantHeader));
            var auth = new UsernamePasswordAuthenticationToken(userHeader, null, List.of());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        try { filterChain.doFilter(request, response); }
        finally { TenantContext.clear(); }
    }
}
