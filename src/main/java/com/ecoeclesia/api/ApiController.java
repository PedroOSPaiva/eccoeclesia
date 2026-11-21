package com.ecoeclesia.api;

import com.ecoeclesia.expense.ExpenseDocument;
import com.ecoeclesia.expense.ExpenseService;
import com.ecoeclesia.finance.LedgerService;
import com.ecoeclesia.member.MemberRepository;
import com.ecoeclesia.revenue.RevenueEntity;
import com.ecoeclesia.revenue.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private final MemberRepository memberRepository;
    private final com.ecoeclesia.community.CommunityRepository communityRepository;

    @Autowired
    public ApiController(ExpenseService expenseService, RevenueService revenueService, LedgerService ledgerService, MemberRepository memberRepository, com.ecoeclesia.community.CommunityRepository communityRepository) {
        this.expenseService = expenseService;
        this.revenueService = revenueService;
        this.ledgerService = ledgerService;
        this.memberRepository = memberRepository;
        this.communityRepository = communityRepository;
    }

    public ApiController(ExpenseService expenseService, RevenueService revenueService, LedgerService ledgerService, MemberRepository memberRepository) {
        this(expenseService, revenueService, ledgerService, memberRepository, null);
    }

    public ApiController(ExpenseService expenseService, RevenueService revenueService, LedgerService ledgerService) {
        this(expenseService, revenueService, ledgerService, null, null);
    }

    // --- EXPENSES ---

    public record ExpenseRequestDto(BigDecimal amount, String description, String category, String communityId) {}

    public record ExpenseResponseDto(
            String id,
            String communityId,
            BigDecimal amount,
            String description,
            String category,
            Instant createdAt
    ) {
        public static ExpenseResponseDto from(ExpenseDocument doc) {
            return new ExpenseResponseDto(
                    doc.getId(),
                    doc.getCommunityId(),
                    doc.getAmount(),
                    doc.getDescription(),
                    doc.getCategory() != null ? doc.getCategory().name() : null,
                    doc.getCreatedAt()
            );
        }
    }

    @GetMapping("/expenses")
    @PreAuthorize("isAuthenticated()")
    public List<ExpenseResponseDto> listExpenses() {
        return expenseService.listExpenses().stream()
                .map(ExpenseResponseDto::from)
                .toList();
    }

    @PostMapping("/expenses")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")
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
                doc = expenseService.registerExpense(request.category(), request.description(), request.amount().toPlainString(), request.communityId());
            } catch (IllegalArgumentException ex) {
                // ASSUNÇÃO: Se categoria informada não bater com enum do domínio, faz fallback para classificação heurística
                doc = expenseService.registerExpense(request.amount(), request.description() + " " + request.category(), request.communityId());
            }
        } else {
            doc = expenseService.registerExpense(request.amount(), request.description(), request.communityId());
        }

        // Sincroniza automaticamente com o Razão Contábil (Unificação com o Razão)
        try {
            String accountCode = resolveExpenseAccountCode(request.category());
            String ref = "EXP-" + (doc.getId() != null ? doc.getId().substring(0, Math.min(8, doc.getId().length())) : "001");
            String costCenter = resolveCommunityName(request.communityId());
            ledgerService.recordExpense(accountCode, request.amount(), request.description(), ref, costCenter, LocalDate.now(), request.communityId());
        } catch (Exception ignored) {
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(ExpenseResponseDto.from(doc));
    }

    @DeleteMapping("/expenses/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")
    public ResponseEntity<Void> deleteExpense(@PathVariable String id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    // --- REVENUES ---

    public record RevenueRequestDto(BigDecimal amount, String description, String category, String communityId, String memberId) {
        public RevenueRequestDto(BigDecimal amount, String description, String category, String communityId) {
            this(amount, description, category, communityId, null);
        }
    }

    public record RevenueResponseDto(
            String id,
            String communityId,
            String memberId,
            BigDecimal amount,
            String description,
            String category,
            Instant receivedAt,
            Instant createdAt
    ) {
        public static RevenueResponseDto from(RevenueEntity entity) {
            return new RevenueResponseDto(
                    entity.id(),
                    entity.communityId(),
                    entity.memberId(),
                    entity.amount(),
                    entity.description(),
                    entity.category() != null ? entity.category().name() : null,
                    entity.receivedAt(),
                    entity.receivedAt()
            );
        }
    }

    @GetMapping("/revenues")
    @PreAuthorize("isAuthenticated()")
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
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")
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
                entity = revenueService.registerRevenue(request.amount(), request.description(), request.category(), request.communityId(), request.memberId());
            } catch (IllegalArgumentException ex) {
                // ASSUNÇÃO: Se nome da categoria não for o enum puro (ex: "Dízimo" vs "TITHES"), usa heurística do domínio
                entity = revenueService.registerRevenue(request.amount(), request.description() + " " + request.category(), null, request.communityId(), request.memberId());
            }
        } else {
            entity = revenueService.registerRevenue(request.amount(), request.description(), null, request.communityId(), request.memberId());
        }

        // Sincroniza automaticamente com o Razão Contábil (Unificação com o Razão)
        try {
            String accountCode = resolveRevenueAccountCode(request.category());
            String ref = "REC-" + (entity.id() != null ? entity.id().substring(0, Math.min(8, entity.id().length())) : "001");
            String ledgerDesc = request.description();
            if (request.memberId() != null && !request.memberId().isBlank() && memberRepository != null) {
                memberRepository.findById(request.memberId()).ifPresent(m -> {
                    // Descrição já preservada; se desejado, o razão tem o member_id nativo e o vínculo
                });
            }
            String costCenter = resolveCommunityName(request.communityId());
            ledgerService.recordIncome(accountCode, request.amount(), ledgerDesc, ref, costCenter, LocalDate.now(), request.communityId(), request.memberId());
        } catch (Exception ignored) {
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(RevenueResponseDto.from(entity));
    }

    @DeleteMapping("/revenues/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")
    public ResponseEntity<Void> deleteRevenue(@PathVariable String id) {
        revenueService.deleteRevenue(id);
        return ResponseEntity.noContent().build();
    }

    private String resolveCommunityName(String communityId) {
        if (communityId != null && !communityId.isBlank() && communityRepository != null) {
            return communityRepository.findById(communityId)
                    .map(com.ecoeclesia.community.Community::name)
                    .orElse("Matriz");
        }
        if (communityRepository != null) {
            return communityRepository.findMainParish()
                    .map(com.ecoeclesia.community.Community::name)
                    .orElse("Matriz");
        }
        return "Matriz";
    }

    private String resolveExpenseAccountCode(String category) {
        if (category == null) return "2.1.01";
        String lower = category.toLowerCase(Locale.ROOT);
        if (lower.contains("água") || lower.contains("agua") || lower.contains("energia") || lower.contains("luz") || lower.contains("utilidade") || lower.contains("telefone") || lower.contains("internet") || lower.contains("gás") || lower.contains("gas") || lower.contains("consumo")) return "2.1.01";
        if (lower.contains("pessoal") || lower.contains("salár") || lower.contains("salar") || lower.contains("folha") || lower.contains("encargo") || lower.contains("pró-labore") || lower.contains("pro-labore")) return "2.2.01";
        if (lower.contains("liturg") || lower.contains("pastoral") || lower.contains("música") || lower.contains("musica") || lower.contains("culto") || lower.contains("catequese") || lower.contains("hóstia") || lower.contains("hostia")) return "2.3.01";
        if (lower.contains("social") || lower.contains("caridade") || lower.contains("cesta") || lower.contains("pobre")) return "2.4.01";
        if (lower.contains("manut") || lower.contains("conserva") || lower.contains("infra") || lower.contains("reparo") || lower.contains("limpeza") || lower.contains("conserto")) return "2.5.01";
        if (lower.contains("transp") || lower.contains("combust") || lower.contains("veículo") || lower.contains("veiculo")) return "2.6.01";
        if (lower.contains("evento") || lower.contains("festa") || lower.contains("quermesse") || lower.contains("bingo") || lower.contains("cantina")) return "2.7.01";
        if (lower.contains("tributo") || lower.contains("taxa") || lower.contains("alvará") || lower.contains("alvara")) return "2.8.01";
        if (lower.contains("obra") || lower.contains("reforma") || lower.contains("pintura")) return "2.9.01";
        if (lower.contains("comunicação") || lower.contains("comunicacao") || lower.contains("pascom") || lower.contains("site")) return "2.10.01";
        return "2.1.01";
    }

    private String resolveRevenueAccountCode(String category) {
        if (category == null) return "1.1.01";
        String lower = category.toLowerCase(Locale.ROOT);
        if (lower.contains("dízimo") || lower.contains("dizimo") || lower.contains("tithe")) return "1.1.01";
        if (lower.contains("oferta") || lower.contains("coleta")) return "1.1.02";
        if (lower.contains("contribui") || lower.contains("mensal")) return "1.1.03";
        if (lower.contains("doação") || lower.contains("doacao") || lower.contains("campanha")) return "1.1.04";
        if (lower.contains("intenç") || lower.contains("intenc")) return "1.1.05";
        if (lower.contains("batiz")) return "1.1.06";
        if (lower.contains("casamento") || lower.contains("matrim")) return "1.1.07";
        if (lower.contains("catequese")) return "1.1.08";
        if (lower.contains("evento") || lower.contains("festa") || lower.contains("quermesse") || lower.contains("bingo")) return "1.2.01";
        if (lower.contains("almoço") || lower.contains("almoco") || lower.contains("jantar") || lower.contains("cantina")) return "1.2.02";
        if (lower.contains("aluguel") || lower.contains("cessão") || lower.contains("cessao") || lower.contains("patrim")) return "1.3.01";
        if (lower.contains("subven")) return "1.4.01";
        if (lower.contains("serviço") || lower.contains("servico") || lower.contains("bênção") || lower.contains("bencao") || lower.contains("exéquias") || lower.contains("exequias")) return "1.5.01";
        return "1.1.01";
    }
}
