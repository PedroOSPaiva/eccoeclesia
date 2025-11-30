package com.ecoeclesia.expense;

import static com.ecoeclesia.testing.Assertions.assertEquals;
import static com.ecoeclesia.testing.Assertions.assertThrows;

import com.ecoeclesia.testing.Test;
import java.math.BigDecimal;

public final class ExpenseServiceTest {

    private final ExpenseService service = new ExpenseService(new InMemoryExpenseRepository());

    @Test("classifies supermarkets as groceries")
    public void classifiesGroceries() {
        ExpenseCategory category = service.classifyExpense("Compra no supermercado central");
        assertEquals(ExpenseCategory.GROCERIES, category);
    }

    @Test("registers expenses without explicit category")
    public void registersExpenseWithoutCategory() {
        var document = service.registerExpense(new BigDecimal("42.50"), "Uber até o retiro");
        assertEquals(ExpenseCategory.TRANSPORT, document.getCategory());
    }

    @Test("validates invalid category names")
    public void rejectsInvalidCategory() {
        assertThrows(IllegalArgumentException.class,
                () -> service.registerExpense("invalid", "Compra genérica", "10.00"));
    }

    @Test("accepts lower-case visitor category")
    public void acceptsVisitorCategory() {
        ExpenseDocument document = service.registerExpense("visitantes", "Almoço da equipe", "100.00");
        assertEquals(ExpenseCategory.VISITORS, document.getCategory());
    }
}
