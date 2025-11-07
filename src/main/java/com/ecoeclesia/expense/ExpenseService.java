package com.ecoeclesia.expense;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.EnumMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

/**
 * Service responsible for registering expenses and classifying them into categories based on
 * simple keyword rules. The rules are intentionally deterministic to keep unit testing simple.
 */
@Service
public class ExpenseService {

    private final Map<ExpenseCategory, List<String>> classificationRules;

    public ExpenseService() {
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
    public Expense registerExpense(BigDecimal amount, String description, String categoryName) {
        ExpenseCategory category = parseCategory(categoryName);
        return new Expense(amount, description, category);
    }

    /**
     * Registers an expense by automatically classifying it based on the description.
     */
    public Expense registerExpense(BigDecimal amount, String description) {
        ExpenseCategory category = classifyExpense(description);
        return new Expense(amount, description, category);
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
            throw new IllegalArgumentException("Categoria inválida: " + categoryName, ex);
        }
    }

    private String normalize(String description) {
        return description == null ? "" : description.toLowerCase(Locale.ROOT);
    }
}
