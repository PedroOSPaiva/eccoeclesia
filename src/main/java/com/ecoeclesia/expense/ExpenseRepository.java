package com.ecoeclesia.expense;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;

public interface ExpenseRepository extends MongoRepository<ExpenseDocument, String> {

    List<ExpenseDocument> findAllByCreatedAtBetween(Instant start, Instant end);

    List<ExpenseDocument> findAllByCreatedAtAfter(Instant start);

    List<ExpenseDocument> findAllByCreatedAtBefore(Instant end);
}
