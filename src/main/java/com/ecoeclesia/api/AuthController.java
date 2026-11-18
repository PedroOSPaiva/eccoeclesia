package com.ecoeclesia.api;

import com.ecoeclesia.finance.AuthTokenService;
import com.ecoeclesia.finance.AuthTokens;
import com.ecoeclesia.finance.PasswordResetToken;
import com.ecoeclesia.user.UserAccount;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthTokenService authTokenService;

    public AuthController(AuthTokenService authTokenService) {
        this.authTokenService = authTokenService;
    }

    public record LoginRequest(String email, String password) {}

    public record RefreshRequest(String refreshToken) {}

    public record ForgotPasswordRequest(String email) {}

    public record ResetPasswordRequest(String token, String newPassword, String password) {}

    @PostMapping("/login")
    public AuthTokens login(@RequestBody LoginRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Corpo da requisição é obrigatório");
        }
        return authTokenService.login(request.email(), request.password());
    }

    @PostMapping("/refresh")
    public AuthTokens refresh(@RequestBody RefreshRequest request) {
        if (request == null || request.refreshToken() == null || request.refreshToken().isBlank()) {
            throw new IllegalArgumentException("Refresh token é obrigatório");
        }
        return authTokenService.refresh(request.refreshToken());
    }

    @PostMapping("/forgot-password")
    public PasswordResetToken forgotPassword(@RequestBody ForgotPasswordRequest request) {
        if (request == null || request.email() == null || request.email().isBlank()) {
            throw new IllegalArgumentException("Email é obrigatório");
        }
        return authTokenService.requestPasswordReset(request.email());
    }

    @PostMapping("/reset-password")
    public void resetPassword(@RequestBody ResetPasswordRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Corpo da requisição é obrigatório");
        }
        // ASSUNÇÃO: Suporta tanto o campo 'newPassword' quanto 'password' enviado pelo client
        String pwd = request.newPassword() != null && !request.newPassword().isBlank()
                ? request.newPassword()
                : request.password();
        authTokenService.resetPassword(request.token(), pwd);
    }

    @GetMapping("/me")
    public UserAccount me(@RequestHeader(value = "Authorization", required = false) String authorization) {
        UserAccount account = authTokenService.accountFor(authorization);
        if (account == null) {
            throw new IllegalArgumentException("Token inválido ou não autenticado");
        }
        return account;
    }
}

