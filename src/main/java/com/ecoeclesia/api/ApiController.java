package com.ecoeclesia.api;

import com.ecoeclesia.expense.ExpenseDocument;
import com.ecoeclesia.expense.ExpenseService;
import com.ecoeclesia.finance.LedgerService;
import com.ecoeclesia.revenue.RevenueEntity;
import com.ecoeclesia.revenue.RevenueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final ExpenseService expenseService;
    private final RevenueService revenueService;
    private final LedgerService ledgerService;

    public ApiController(ExpenseService expenseService, RevenueService revenueService, LedgerService ledgerService) {
        this.expenseService = expenseService;
        this.revenueService = revenueService;
        this.ledgerService = ledgerService;
    }

    // --- EXPENSES ---

    public record ExpenseRequestDto(BigDecimal amount, String description, String category) {}

    public record ExpenseResponseDto(
            String id,
            BigDecimal amount,
            String description,
            String category,
            Instant createdAt
    ) {
        public static ExpenseResponseDto from(ExpenseDocument doc) {
            return new ExpenseResponseDto(
                    doc.getId(),
                    doc.getAmount(),
                    doc.getDescription(),
                    doc.getCategory() != null ? doc.getCategory().name() : null,
                    doc.getCreatedAt()
            );
        }
    }

    @GetMapping("/expenses")
    public List<ExpenseResponseDto> listExpenses() {
        return expenseService.listExpenses().stream()
                .map(ExpenseResponseDto::from)
                .toList();
    }

    @PostMapping("/expenses")
    public ResponseEntity<ExpenseResponseDto> createExpense(@RequestBody ExpenseRequestDto request) {
        if (request.amount() == null) {
            throw new IllegalArgumentException("Valor é obrigatório");
        }
        if (request.description() == null || request.description().isBlank()) {
            throw new IllegalArgumentException("Descrição é obrigatória");
        }

        ExpenseDocument doc;
        if (request.category() != null && !request.category().isBlank()) {
            try {
                doc = expenseService.registerExpense(request.category(), request.description(), request.amount().toPlainString());
            } catch (IllegalArgumentException ex) {
                // ASSUNÇÃO: Se categoria informada não bater com enum do domínio, faz fallback para classificação heurística
                doc = expenseService.registerExpense(request.amount(), request.description() + " " + request.category());
            }
        } else {
            doc = expenseService.registerExpense(request.amount(), request.description());
        }

        // Sincroniza automaticamente com o Razão Contábil
        try {
            String accountCode = resolveExpenseAccountCode(request.category());
            String ref = "EXP-" + (doc.getId() != null ? doc.getId().substring(0, Math.min(8, doc.getId().length())) : "001");
            ledgerService.recordExpense(accountCode, request.amount(), request.description(), ref, request.category() != null ? request.category() : "Geral");
        } catch (Exception ignored) {
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(ExpenseResponseDto.from(doc));
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable String id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    // --- REVENUES ---

    public record RevenueRequestDto(BigDecimal amount, String description, String category) {}

    public record RevenueResponseDto(
            String id,
            BigDecimal amount,
            String description,
            String category,
            Instant receivedAt,
            Instant createdAt // ASSUNÇÃO: Duplicado para compatibilidade direta com Angular template (item.createdAt)
    ) {
        public static RevenueResponseDto from(RevenueEntity entity) {
            return new RevenueResponseDto(
                    entity.id(),
                    entity.amount(),
                    entity.description(),
                    entity.category() != null ? entity.category().name() : null,
                    entity.receivedAt(),
                    entity.receivedAt()
            );
        }
    }

    @GetMapping("/revenues")
    public List<RevenueResponseDto> listRevenues(
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end
    ) {
        Instant startInstant = (start != null && !start.isBlank())
                ? LocalDate.parse(start).atStartOfDay(ZoneId.systemDefault()).toInstant()
                : null;
        Instant endInstant = (end != null && !end.isBlank())
                ? LocalDate.parse(end).atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant()
                : null;

        return revenueService.listRevenues(startInstant, endInstant).stream()
                .map(RevenueResponseDto::from)
                .toList();
    }

    @PostMapping("/revenues")
    public ResponseEntity<RevenueResponseDto> createRevenue(@RequestBody RevenueRequestDto request) {
        if (request.amount() == null) {
            throw new IllegalArgumentException("Valor é obrigatório");
        }
        if (request.description() == null || request.description().isBlank()) {
            throw new IllegalArgumentException("Descrição é obrigatória");
        }

        RevenueEntity entity;
        if (request.category() != null && !request.category().isBlank()) {
            try {
                entity = revenueService.registerRevenue(request.amount(), request.description(), request.category());
            } catch (IllegalArgumentException ex) {
                // ASSUNÇÃO: Se nome da categoria não for o enum puro (ex: "Dízimo" vs "TITHES"), usa heurística do domínio
                entity = revenueService.registerRevenue(request.amount(), request.description() + " " + request.category());
            }
        } else {
            entity = revenueService.registerRevenue(request.amount(), request.description());
        }

        // Sincroniza automaticamente com o Razão Contábil
        try {
            String accountCode = resolveRevenueAccountCode(request.category());
            String ref = "REC-" + (entity.id() != null ? entity.id().toString().substring(0, Math.min(8, entity.id().toString().length())) : "001");
            ledgerService.recordIncome(accountCode, request.amount(), request.description(), ref, request.category() != null ? request.category() : "Geral");
        } catch (Exception ignored) {
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(RevenueResponseDto.from(entity));
    }

    @DeleteMapping("/revenues/{id}")
    public ResponseEntity<Void> deleteRevenue(@PathVariable String id) {
        revenueService.deleteRevenue(id);
        return ResponseEntity.noContent().build();
    }

    private String resolveExpenseAccountCode(String category) {
        if (category == null) return "2.1.01";
        String lower = category.toLowerCase(Locale.ROOT);
        if (lower.contains("manut") || lower.contains("infra") || lower.contains("reparo")) return "2.5.01";
        if (lower.contains("pessoal") || lower.contains("salár") || lower.contains("folha")) return "2.2.01";
        if (lower.contains("liturg") || lower.contains("música") || lower.contains("culto")) return "2.3.01";
        if (lower.contains("social") || lower.contains("caridade") || lower.contains("cesta")) return "2.4.01";
        if (lower.contains("transp") || lower.contains("combust")) return "2.6.01";
        if (lower.contains("evento") || lower.contains("festa") || lower.contains("quermesse")) return "2.7.01";
        if (lower.contains("obra") || lower.contains("reforma")) return "2.9.01";
        return "2.1.01";
    }

    private String resolveRevenueAccountCode(String category) {
        if (category == null) return "1.1.01";
        String lower = category.toLowerCase(Locale.ROOT);
        if (lower.contains("dízimo") || lower.contains("dizimo") || lower.contains("tithe")) return "1.1.01";
        if (lower.contains("oferta")) return "1.1.02";
        if (lower.contains("evento") || lower.contains("festa") || lower.contains("quermesse")) return "1.2.01";
        if (lower.contains("aluguel") || lower.contains("patrim")) return "1.3.01";
        if (lower.contains("doação") || lower.contains("doacao") || lower.contains("campanha")) return "1.1.04";
        return "1.1.01";
    }
}
