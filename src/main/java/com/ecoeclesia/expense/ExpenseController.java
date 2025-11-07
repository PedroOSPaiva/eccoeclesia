package com.ecoeclesia.expense;

import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<ExpenseResponse> createExpense(@Valid @RequestBody ExpenseRequest request) {
        ExpenseDocument document = request.category() == null || request.category().isBlank()
            ? expenseService.registerExpense(request.amount(), request.description())
            : expenseService.registerExpense(request.amount(), request.description(), request.category());
        return ResponseEntity.status(HttpStatus.CREATED).body(ExpenseResponse.fromDocument(document));
    }

    @GetMapping
    public List<ExpenseResponse> listExpenses(
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        Instant start = toStartInstant(startDate);
        Instant end = toEndInstant(endDate);
        return expenseService.listExpenses(start, end)
            .stream()
            .map(ExpenseResponse::fromDocument)
            .toList();
    }

    @GetMapping("/{id}")
    public ExpenseResponse getExpense(@PathVariable String id) {
        ExpenseDocument document = expenseService.getExpense(id);
        return ExpenseResponse.fromDocument(document);
    }

    @PutMapping("/{id}")
    public ExpenseResponse updateExpense(@PathVariable String id, @Valid @RequestBody ExpenseRequest request) {
        ExpenseDocument document = expenseService.updateExpense(
            id,
            request.amount(),
            request.description(),
            request.category()
        );
        return ExpenseResponse.fromDocument(document);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable String id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    private Instant toStartInstant(LocalDate date) {
        if (date == null) {
            return null;
        }
        return date.atStartOfDay(ZoneOffset.UTC).toInstant();
    }

    private Instant toEndInstant(LocalDate date) {
        if (date == null) {
            return null;
        }
        return date.plusDays(1).atStartOfDay(ZoneOffset.UTC).toInstant();
    }
}
