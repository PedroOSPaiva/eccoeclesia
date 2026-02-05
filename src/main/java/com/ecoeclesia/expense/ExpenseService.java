package com.ecoeclesia.expense;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

/**
 * Business rules related to expenses. The service performs lightweight
 * validation and delegates storage to the repository so that it can be reused
 * by both the CLI application and future HTTP controllers.
 */
public final class ExpenseService {

    private final ExpenseRepository repository;
    private static final Map<String, ExpenseCategory> CATEGORY_LOOKUP;

    static {
        Map<String, ExpenseCategory> lookup = new HashMap<>();
        for (ExpenseCategory category : ExpenseCategory.values()) {
            lookup.put(category.name().toLowerCase(Locale.ROOT), category);
        }
        lookup.put("visitantes", ExpenseCategory.VISITORS);
        CATEGORY_LOOKUP = Map.copyOf(lookup);
    }

    public ExpenseService(ExpenseRepository repository) {
        this.repository = Objects.requireNonNull(repository);
    }

    public ExpenseDocument registerExpense(String categoryName, String description, String amount) {
        ExpenseCategory category = parseCategory(categoryName);
        BigDecimal value = new BigDecimal(amount);
        ExpenseDocument document = new ExpenseDocument(value, description, category);
        return repository.save(document);
    }

    public ExpenseDocument registerExpense(BigDecimal amount, String description) {
        ExpenseCategory category = classifyExpense(description);
        ExpenseDocument document = new ExpenseDocument(amount, description, category);
        return repository.save(document);
    }

    public ExpenseDocument updateExpense(String id, BigDecimal amount, String description, String categoryName) {
        ExpenseDocument existing = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Expense not found: " + id));
        existing.setAmount(amount);
        existing.setDescription(description);
        if (categoryName == null || categoryName.isBlank()) {
            existing.setCategory(classifyExpense(description));
        } else {
            existing.setCategory(parseCategory(categoryName));
        }
        return repository.save(existing);
    }

    public java.util.List<ExpenseDocument> listExpenses() {
        return repository.findAll();
    }

    public void deleteExpense(String id) {
        ExpenseDocument existing = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Expense not found: " + id));
        repository.deleteById(existing.getId());
    }

    public ExpenseCategory classifyExpense(String description) {
        String normalized = description.toLowerCase(Locale.ROOT);
        if (containsAny(normalized, "supermercado", "mercado", "padaria", "mercearia")) {
            return ExpenseCategory.GROCERIES;
        }
        if (containsAny(normalized, "uber", "combustivel", "ônibus", "transporte")) {
            return ExpenseCategory.TRANSPORT;
        }
        if (containsAny(normalized, "luz", "energia", "agua", "internet")) {
            return ExpenseCategory.UTILITIES;
        }
        if (containsAny(normalized, "manutenção", "reparo", "conserto")) {
            return ExpenseCategory.MAINTENANCE;
        }
        if (containsAny(normalized, "cinema", "retiro", "evento")) {
            return ExpenseCategory.ENTERTAINMENT;
        }
        if (containsAny(normalized, "doação", "ajuda", "assistencia")) {
            return ExpenseCategory.DONATIONS;
        }
        return ExpenseCategory.OTHER;
    }

    private static boolean containsAny(String value, String... candidates) {
        for (String candidate : candidates) {
            if (value.contains(candidate)) {
                return true;
            }
        }
        return false;
    }

    private ExpenseCategory parseCategory(String categoryName) {
        String normalized = categoryName.trim().toLowerCase(Locale.ROOT);
        ExpenseCategory category = CATEGORY_LOOKUP.get(normalized);
        if (category != null) {
            return category;
        }
        throw new IllegalArgumentException("Unknown expense category: " + categoryName);
    }
}
