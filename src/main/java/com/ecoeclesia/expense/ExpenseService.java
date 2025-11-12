package com.ecoeclesia.expense;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.EnumMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service responsible for registering expenses and classifying them into categories based on
 * simple keyword rules. The rules are intentionally deterministic to keep unit testing simple.
 */
@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final Map<ExpenseCategory, List<String>> classificationRules;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
        classificationRules = new EnumMap<>(ExpenseCategory.class);
        classificationRules.put(ExpenseCategory.GROCERIES, List.of("market", "mercado", "supermarket", "food"));
        classificationRules.put(ExpenseCategory.TRANSPORT, List.of("uber", "taxi", "bus", "metr", "ride"));
        classificationRules.put(ExpenseCategory.UTILITIES, List.of("energy", "water", "internet", "utility"));
        classificationRules.put(ExpenseCategory.ENTERTAINMENT, List.of("movie", "cinema", "concert", "netflix"));
    }

    /**
     * Registers an expense using an explicitly provided category.
     *
     * @throws IllegalArgumentException when the provided categoryName cannot be mapped to a known category
     */
    public ExpenseEntity registerExpense(BigDecimal amount, String description, String categoryName) {
        ExpenseCategory category = parseCategory(categoryName);
        return saveExpense(amount, description, category, null);
    }

    /**
     * Registers an expense by automatically classifying it based on the description.
     */
    public ExpenseEntity registerExpense(BigDecimal amount, String description) {
        ExpenseCategory category = classifyExpense(description);
        return saveExpense(amount, description, category, null);
    }

    /**
     * Registers an expense using a specific timestamp, typically used when importing historical data.
     */
    public ExpenseEntity registerExpense(BigDecimal amount, String description, String categoryName, Instant createdAt) {
        ExpenseCategory category = categoryName == null || categoryName.isBlank()
            ? classifyExpense(description)
            : parseCategory(categoryName);
        return saveExpense(amount, description, category, createdAt);
    }

    public List<ExpenseEntity> listExpenses(Instant start, Instant end) {
        List<ExpenseEntity> expenses;
        if (start != null && end != null) {
            expenses = expenseRepository.findAllByCreatedAtBetween(start, end);
        } else if (start != null) {
            expenses = expenseRepository.findAllByCreatedAtAfter(start);
        } else if (end != null) {
            expenses = expenseRepository.findAllByCreatedAtBefore(end);
        } else {
            expenses = expenseRepository.findAll();
        }
        return expenses.stream()
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .collect(Collectors.toList());
    }

    public ExpenseEntity getExpense(UUID id) {
        return expenseRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found: " + id));
    }

    public ExpenseEntity updateExpense(UUID id, BigDecimal amount, String description, String categoryName) {
        ExpenseEntity existing = getExpense(id);
        ExpenseCategory category = categoryName == null || categoryName.isBlank()
            ? classifyExpense(description)
            : parseCategory(categoryName);
        existing.setAmount(Objects.requireNonNull(amount, "amount must not be null"));
        existing.setDescription(Objects.requireNonNullElse(description, ""));
        existing.setCategory(category);
        return expenseRepository.save(existing);
    }

    public void deleteExpense(UUID id) {
        if (!expenseRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found: " + id);
        }
        expenseRepository.deleteById(id);
    }

    /**
     * Attempts to classify the given description into one of the known categories using simple keyword
     * matching. When no rule matches, {@link ExpenseCategory#OTHER} is returned.
     */
    public ExpenseCategory classifyExpense(String description) {
        String normalized = normalize(description);
        for (Map.Entry<ExpenseCategory, List<String>> entry : classificationRules.entrySet()) {
            for (String keyword : entry.getValue()) {
                if (normalized.contains(keyword)) {
                    return entry.getKey();
                }
            }
        }
        return ExpenseCategory.OTHER;
    }

    private ExpenseCategory parseCategory(String categoryName) {
        Objects.requireNonNull(categoryName, "categoryName must not be null");
        try {
            return ExpenseCategory.valueOf(categoryName.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoria inválida: " + categoryName, ex);
        }
    }

    private String normalize(String description) {
        return description == null ? "" : description.toLowerCase(Locale.ROOT);
    }

    private ExpenseEntity saveExpense(BigDecimal amount, String description, ExpenseCategory category, Instant createdAt) {
        ExpenseEntity entity = new ExpenseEntity(null,
            Objects.requireNonNull(amount, "amount must not be null"),
            Objects.requireNonNullElse(description, ""),
            category,
            createdAt == null ? Instant.now() : createdAt);
        return expenseRepository.save(entity);
    }
}
