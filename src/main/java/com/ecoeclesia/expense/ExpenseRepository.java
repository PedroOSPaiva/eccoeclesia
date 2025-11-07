package com.ecoeclesia.expense;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExpenseRepository extends MongoRepository<ExpenseDocument, String> {
}
