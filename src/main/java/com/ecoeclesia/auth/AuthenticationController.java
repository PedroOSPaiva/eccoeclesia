package com.ecoeclesia.auth;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserAccountService userAccountService;
    private final JwtService jwtService;

    public AuthenticationController(AuthenticationManager authenticationManager,
                                    UserAccountService userAccountService,
                                    JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userAccountService = userAccountService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );
            UserAccountDetails principal = (UserAccountDetails) authentication.getPrincipal();
            UserAccountDocument account = principal.getAccount();
            String accessToken = jwtService.generateAccessToken(account);
            String refreshToken = jwtService.generateRefreshToken(account);
            return ResponseEntity.ok(AuthenticationResponse.bearer(accessToken, refreshToken));
        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(UNAUTHORIZED, "Invalid credentials", ex);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        String refreshToken = request.refreshToken();
        if (!jwtService.isRefreshToken(refreshToken)) {
            throw new ResponseStatusException(UNAUTHORIZED, "Invalid refresh token type");
        }

        String username = jwtService.extractUsername(refreshToken);
        UserAccountDocument account = userAccountService.requireByEmail(username);
        UserAccountDetails userDetails = new UserAccountDetails(account);
        if (!jwtService.isTokenValid(refreshToken, userDetails)) {
            throw new ResponseStatusException(UNAUTHORIZED, "Invalid refresh token");
        }
        String accessToken = jwtService.generateAccessToken(account);
        String newRefreshToken = jwtService.generateRefreshToken(account);
        return ResponseEntity.ok(AuthenticationResponse.bearer(accessToken, newRefreshToken));
    }
}
