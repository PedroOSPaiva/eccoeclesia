package com.ecoeclesia.revenue;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface RevenueRepository extends JpaRepository<RevenueEntity, UUID> {

    List<RevenueEntity> findAllByCreatedAtBetween(Instant start, Instant end);

    List<RevenueEntity> findAllByCreatedAtAfter(Instant start);

    List<RevenueEntity> findAllByCreatedAtBefore(Instant end);
}
