package com.ecoeclesia.api;

import com.ecoeclesia.expense.ExpenseService;
import com.ecoeclesia.finance.AuthTokenService;
import com.ecoeclesia.finance.ChartOfAccount;
import com.ecoeclesia.finance.ChartOfAccounts;
import com.ecoeclesia.finance.LedgerEntry;
import com.ecoeclesia.finance.LedgerService;
import com.ecoeclesia.revenue.RevenueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/ledger")
public class LedgerApiController {

    private final LedgerService ledgerService;
    private final AuthTokenService authTokenService;
    private final ExpenseService expenseService;
    private final RevenueService revenueService;

    public LedgerApiController(
            LedgerService ledgerService,
            AuthTokenService authTokenService,
            ExpenseService expenseService,
            RevenueService revenueService
    ) {
        this.ledgerService = ledgerService;
        this.authTokenService = authTokenService;
        this.expenseService = expenseService;
        this.revenueService = revenueService;
    }

    public record CreateLedgerEntryRequest(
            String type,
            String accountCode,
            String description,
            BigDecimal amount,
            String referenceCode,
            String costCenter,
            String occurredOn
    ) {}

    @GetMapping("/accounts")
    public ResponseEntity<Collection<ChartOfAccount>> listAccounts() {
        return ResponseEntity.ok(ChartOfAccounts.defaultPlan().all());
    }

    @GetMapping
    public ResponseEntity<List<LedgerEntry>> listEntries(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end
    ) {
        if (!authTokenService.isAllowed(authorization, "finance:read")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<LedgerEntry> entries = (start != null && !start.isBlank() && end != null && !end.isBlank())
                ? ledgerService.findByPeriod(LocalDate.parse(start.trim()), LocalDate.parse(end.trim()))
                : ledgerService.listAll();

        return ResponseEntity.ok(entries);
    }

    @PostMapping
    public ResponseEntity<LedgerEntry> createEntry(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestBody CreateLedgerEntryRequest request
    ) {
        if (!authTokenService.isAllowed(authorization, "finance:write")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (request == null) {
            throw new IllegalArgumentException("Corpo da requisição é obrigatório");
        }
        if (request.type() == null || request.type().isBlank()) {
            throw new IllegalArgumentException("type must be INCOME or EXPENSE");
        }
        if (request.accountCode() == null || request.accountCode().isBlank()) {
            throw new IllegalArgumentException("accountCode é obrigatório");
        }
        if (request.amount() == null || request.amount().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("amount deve ser maior ou igual a zero");
        }
        if (request.description() == null || request.description().isBlank()) {
            throw new IllegalArgumentException("description é obrigatória");
        }

        LocalDate date = (request.occurredOn() != null && !request.occurredOn().isBlank())
                ? LocalDate.parse(request.occurredOn().trim())
                : LocalDate.now();

        LedgerEntry entry;
        if ("INCOME".equalsIgnoreCase(request.type())) {
            entry = ledgerService.recordIncome(
                    request.accountCode(),
                    request.amount(),
                    request.description(),
                    request.referenceCode(),
                    request.costCenter(),
                    date
            );
            try {
                revenueService.registerRevenue(request.amount(), request.description(), request.costCenter());
            } catch (Exception ignored) {
            }
        } else if ("EXPENSE".equalsIgnoreCase(request.type())) {
            entry = ledgerService.recordExpense(
                    request.accountCode(),
                    request.amount(),
                    request.description(),
                    request.referenceCode(),
                    request.costCenter(),
                    date
            );
            try {
                expenseService.registerExpense(request.amount(), request.description());
            } catch (Exception ignored) {
            }
        } else {
            throw new IllegalArgumentException("type must be INCOME or EXPENSE");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(entry);
    }
}
