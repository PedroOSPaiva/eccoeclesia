package com.ecoeclesia.expense;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository {
    ExpenseDocument save(ExpenseDocument document);

    Optional<ExpenseDocument> findById(String id);

    List<ExpenseDocument> findAll();

    void deleteById(String id);
}
