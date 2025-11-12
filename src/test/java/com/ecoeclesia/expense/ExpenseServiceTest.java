package com.ecoeclesia.expense;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @InjectMocks
    private ExpenseService expenseService;

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
            ExpenseEntity saved = new ExpenseEntity();
            saved.setCategory(ExpenseCategory.ENTERTAINMENT);
            saved.setAmount(new BigDecimal("125.80"));
            saved.setDescription("Concert tickets");
            when(expenseRepository.save(any(ExpenseEntity.class))).thenReturn(saved);

            ExpenseEntity expense = expenseService.registerExpense(new BigDecimal("125.80"), "Concert tickets", "entertainment");

            assertEquals(ExpenseCategory.ENTERTAINMENT, expense.getCategory());
            assertEquals("Concert tickets", expense.getDescription());
            verify(expenseRepository).save(any(ExpenseEntity.class));
        }

        @Test
        @DisplayName("should reject invalid category name")
        void shouldRejectInvalidCategory() {
            assertThrows(ResponseStatusException.class, () ->
                expenseService.registerExpense(new BigDecimal("25.00"), "Coffee with friends", "invalid-category")
            );
        }

        @Test
        @DisplayName("should classify and persist expense when category is missing")
        void shouldClassifyAndPersistExpense() {
            ArgumentCaptor<ExpenseEntity> entityCaptor = ArgumentCaptor.forClass(ExpenseEntity.class);
            when(expenseRepository.save(any(ExpenseEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

            ExpenseEntity entity = expenseService.registerExpense(new BigDecimal("45.00"), "Uber ride downtown");

            assertEquals(ExpenseCategory.TRANSPORT, entity.getCategory());
            verify(expenseRepository).save(entityCaptor.capture());
            assertEquals("Uber ride downtown", entityCaptor.getValue().getDescription());
        }
    }
}
