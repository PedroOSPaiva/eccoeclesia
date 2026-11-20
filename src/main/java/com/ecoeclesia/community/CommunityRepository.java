package com.ecoeclesia.community;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository {
    Community save(Community community);
    Optional<Community> findById(String id);
    Optional<Community> findByCode(String code);
    Optional<Community> findMainParish();
    List<Community> findAll();
}
