package com.ecoeclesia.revenue;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface RevenueRepository {
    RevenueEntity save(RevenueEntity entity);

    Optional<RevenueEntity> findById(String id);

    List<RevenueEntity> findAll();

    List<RevenueEntity> findByPeriod(Instant start, Instant end);

    void deleteById(String id);
}
