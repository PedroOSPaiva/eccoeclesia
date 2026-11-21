package com.ecoeclesia.steward;

import java.util.List;
import java.util.Optional;

public interface StewardRepository {
    Steward save(Steward steward);
    Optional<Steward> findById(String id);
    Optional<Steward> findByMemberId(String memberId);
    List<Steward> findAll();
    void deleteById(String id);
}
