package com.ecoeclesia.expense;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<ExpenseEntity, UUID> {

    List<ExpenseEntity> findAllByCreatedAtBetween(Instant start, Instant end);

    List<ExpenseEntity> findAllByCreatedAtAfter(Instant start);

    List<ExpenseEntity> findAllByCreatedAtBefore(Instant end);
}
