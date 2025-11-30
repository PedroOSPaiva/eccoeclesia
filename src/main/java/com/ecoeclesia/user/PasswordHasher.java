package com.ecoeclesia.user;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

/**
 * Centraliza o algoritmo de hashing de senhas para evitar duplicação entre
 * login e gerenciamento de usuários.
 */
public final class PasswordHasher {

    private PasswordHasher() {
    }

    public static String hash(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashed = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }

    public static boolean matches(String rawPassword, String hashedPassword) {
        return hash(rawPassword).equals(hashedPassword);
    }
}
