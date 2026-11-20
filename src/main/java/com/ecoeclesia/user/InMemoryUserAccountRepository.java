package com.ecoeclesia.user;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Implementação em memória de UserAccountRepository para testes unitários.
 */
public class InMemoryUserAccountRepository implements UserAccountRepository {

    private final Map<String, UserAccount> store = new ConcurrentHashMap<>();

    @Override
    public UserAccount save(UserAccount account) {
        Objects.requireNonNull(account, "account");
        store.put(account.getId(), account);
        return account;
    }

    @Override
    public Optional<UserAccount> findById(String id) {
        if (id == null) return Optional.empty();
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<UserAccount> findByEmail(String email) {
        if (email == null) return Optional.empty();
        return store.values().stream()
                .filter(u -> u.getEmail().equalsIgnoreCase(email.trim()))
                .findFirst();
    }

    @Override
    public List<UserAccount> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public void deleteById(String id) {
        if (id != null) {
            store.remove(id);
        }
    }

    @Override
    public boolean existsByEmail(String email) {
        return findByEmail(email).isPresent();
    }
}

