package com.ecoeclesia.expense;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Lightweight facade used by the tests to exercise the module in a
 * request/response style without depending on an HTTP stack.
 */
public final class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = Objects.requireNonNull(service);
    }

    public ExpenseResponse createExpense(ExpenseRequest request) {
        ExpenseDocument document;
        if (request.category() == null || request.category().isBlank()) {
            document = service.registerExpense(request.amount(), request.description());
        } else {
            document = service.registerExpense(request.category(), request.description(), request.amount().toPlainString());
        }
        return ExpenseResponse.from(document);
    }

    public List<ExpenseResponse> listExpenses() {
        return service.listExpenses().stream().map(ExpenseResponse::from).collect(Collectors.toList());
    }
}
