package com.ecoeclesia.expense;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ExpenseServiceTest {

    private ExpenseService expenseService;

    @BeforeEach
    void setUp() {
        expenseService = new ExpenseService();
    }

    @Nested
    @DisplayName("classifyExpense")
    class ClassifyExpense {

        @Test
        @DisplayName("should categorize supermarket purchases as groceries")
        void shouldCategorizeGroceries() {
            ExpenseCategory category = expenseService.classifyExpense("Monthly supermarket run");

            assertEquals(ExpenseCategory.GROCERIES, category);
        }

        @Test
        @DisplayName("should categorize transport related expenses correctly")
        void shouldCategorizeTransport() {
            ExpenseCategory category = expenseService.classifyExpense("Uber ride to the airport");

            assertEquals(ExpenseCategory.TRANSPORT, category);
        }

        @Test
        @DisplayName("should fallback to OTHER when no keywords match")
        void shouldFallbackToOther() {
            ExpenseCategory category = expenseService.classifyExpense("Donation to local community");

            assertEquals(ExpenseCategory.OTHER, category);
        }
    }

    @Nested
    @DisplayName("registerExpense")
    class RegisterExpense {

        @Test
        @DisplayName("should register expense with valid category name")
        void shouldRegisterWithValidCategory() {
            Expense expense = expenseService.registerExpense(new BigDecimal("125.80"), "Concert tickets", "entertainment");

            assertEquals(ExpenseCategory.ENTERTAINMENT, expense.getCategory());
            assertEquals("Concert tickets", expense.getDescription());
        }

        @Test
        @DisplayName("should reject invalid category name")
        void shouldRejectInvalidCategory() {
            assertThrows(IllegalArgumentException.class, () ->
                expenseService.registerExpense(new BigDecimal("25.00"), "Coffee with friends", "invalid-category")
            );
        }
    }
}
