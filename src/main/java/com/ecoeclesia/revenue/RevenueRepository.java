package com.ecoeclesia.revenue;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;

public interface RevenueRepository extends MongoRepository<RevenueDocument, String> {

    List<RevenueDocument> findAllByCreatedAtBetween(Instant start, Instant end);

    List<RevenueDocument> findAllByCreatedAtAfter(Instant start);

    List<RevenueDocument> findAllByCreatedAtBefore(Instant end);
}
