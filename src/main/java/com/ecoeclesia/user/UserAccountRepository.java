package com.ecoeclesia.user;

import java.util.List;
import java.util.Optional;

/**
 * Contrato de persistência para contas de usuário e suas permissões associadas.
 */
public interface UserAccountRepository {

    UserAccount save(UserAccount account);

    Optional<UserAccount> findById(String id);

    Optional<UserAccount> findByEmail(String email);

    List<UserAccount> findAll();

    void deleteById(String id);

    boolean existsByEmail(String email);
}

