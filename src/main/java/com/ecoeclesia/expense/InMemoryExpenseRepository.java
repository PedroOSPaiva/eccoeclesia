package com.ecoeclesia.expense;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Thread-safe repository backed by a concurrent map. The implementation keeps
 * the interface identical to a real Mongo repository, which makes the service
 * layer easy to migrate later.
 */
public final class InMemoryExpenseRepository implements ExpenseRepository {

    private final Map<String, ExpenseDocument> store = new ConcurrentHashMap<>();

    @Override
    public ExpenseDocument save(ExpenseDocument document) {
        store.put(document.getId(), document);
        return document;
    }

    @Override
    public Optional<ExpenseDocument> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<ExpenseDocument> findAll() {
        List<ExpenseDocument> documents = new ArrayList<>(store.values());
        documents.sort(Comparator.comparing(ExpenseDocument::getCreatedAt).reversed());
        return documents;
    }

    @Override
    public void deleteById(String id) {
        store.remove(id);
    }
}
