package com.ecoeclesia.leadership;

import java.util.List;
import java.util.Optional;

public interface ParishLeadershipRepository {
    List<ParishLeader> findAll();
    List<ParishLeader> findAllActive();
    Optional<ParishLeader> findById(String id);
    ParishLeader save(ParishLeader leader);
    void deleteById(String id);
}
