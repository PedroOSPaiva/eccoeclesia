package com.ecoeclesia.auth;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserAccountRepository extends MongoRepository<UserAccountDocument, String> {

    Optional<UserAccountDocument> findByEmail(String email);
}
