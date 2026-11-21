package com.ecoeclesia.finance;

import com.ecoeclesia.community.Community;
import com.ecoeclesia.community.CommunityRepository;
import com.ecoeclesia.leadership.ParishLeader;
import com.ecoeclesia.leadership.ParishLeadershipRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;

public final class FinancialReportGenerator {

    private final LedgerRepository repository;
    private final ChartOfAccounts chart;
    private final ParishLeadershipRepository leadershipRepository;
    private final CommunityRepository communityRepository;

    public FinancialReportGenerator(
            LedgerRepository repository,
            ChartOfAccounts chart,
            ParishLeadershipRepository leadershipRepository,
            CommunityRepository communityRepository
    ) {
        this.repository = Objects.requireNonNull(repository, "repository");
        this.chart = Objects.requireNonNull(chart, "chart");
        this.leadershipRepository = leadershipRepository;
        this.communityRepository = communityRepository;
    }

    public FinancialReportGenerator(LedgerRepository repository, ChartOfAccounts chart, ParishLeadershipRepository leadershipRepository) {
        this(repository, chart, leadershipRepository, null);
    }

    public FinancialReportGenerator(LedgerRepository repository, ChartOfAccounts chart) {
        this(repository, chart, null, null);
    }

    public FinancialReport generate(LocalDate start, LocalDate end, BigDecimal previousBalance) {
        return generate(start, end, previousBalance, (String) null, null);
    }

    public FinancialReport generate(LocalDate start, LocalDate end, BigDecimal previousBalance, String treasurerName) {
        return generate(start, end, previousBalance, treasurerName, null);
    }

    public FinancialReport generate(LocalDate start, LocalDate end, BigDecimal previousBalance, String treasurerName, String communityId) {
        Objects.requireNonNull(start, "start");
        Objects.requireNonNull(end, "end");
        Objects.requireNonNull(previousBalance, "previousBalance");

        List<LedgerEntry> rawEntries = repository.findByPeriod(start, end).stream()
                .sorted(Comparator.comparing(LedgerEntry::occurredOn).thenComparing(LedgerEntry::accountCode))
                .toList();

        // Garante que o Centro de Custo seja o nome da Comunidade ou "Matriz", e não o nome da conta
        List<LedgerEntry> allEntries = rawEntries.stream()
                .map(this::resolveEntryCommunityCostCenter)
                .toList();

        // Resolução de filtro de comunidade
        String filterCommunityName = null;
        String filterCommunityId = null;
        if (communityId != null && !communityId.isBlank()
                && !"ALL".equalsIgnoreCase(communityId)
                && !"TODAS".equalsIgnoreCase(communityId)
                && !"Todas (Consolidado)".equalsIgnoreCase(communityId)) {
            final String inputCodeOrId = communityId.trim();
            filterCommunityId = inputCodeOrId;
            if (communityRepository != null) {
                Community c = communityRepository.findById(inputCodeOrId)
                        .or(() -> communityRepository.findByCode(inputCodeOrId))
                        .orElse(null);
                if (c != null) {
                    filterCommunityName = c.name();
                    filterCommunityId = c.id();
                } else {
                    filterCommunityName = inputCodeOrId;
                }
            } else {
                filterCommunityName = inputCodeOrId;
            }
        }

        final String targetCommId = filterCommunityId;
        final String targetCommName = filterCommunityName;

        List<LedgerEntry> entries = allEntries;
        if (targetCommId != null) {
            entries = allEntries.stream()
                    .filter(e -> (e.communityId() != null && e.communityId().equalsIgnoreCase(targetCommId))
                            || (targetCommName != null && targetCommName.equalsIgnoreCase(e.costCenter())))
                    .toList();
        }

        List<FinancialReportLine> incomes = buildLines(entries, LedgerEntryType.INCOME);
        List<FinancialReportLine> expenses = buildLines(entries, LedgerEntryType.EXPENSE);

        BigDecimal totalIncome = sum(incomes);
        BigDecimal totalExpenses = sum(expenses);
        BigDecimal closing = previousBalance.add(totalIncome).subtract(totalExpenses);

        List<ParishLeader> activeLeaders = leadershipRepository != null ? leadershipRepository.findAllActive() : List.of();

        String leadershipHeader;
        if (!activeLeaders.isEmpty()) {
            leadershipHeader = activeLeaders.stream()
                    .map(l -> l.role() + ": " + l.name())
                    .collect(Collectors.joining("  |  "));
        } else {
            leadershipHeader = "Pároco: Pe. João Silva  |  Vigário: Pe. Antônio";
        }

        // 1. Busca Pároco
        ParishLeader parocoLeader = activeLeaders.stream()
                .filter(l -> l.role().toLowerCase().contains("pároco") || l.role().toLowerCase().contains("paroco"))
                .findFirst()
                .orElse(null);

        // 2. Busca Vigário
        ParishLeader vigarioLeader = activeLeaders.stream()
                .filter(l -> l.role().toLowerCase().contains("vigário") || l.role().toLowerCase().contains("vigario"))
                .findFirst()
                .orElse(null);

        String parocoName = parocoLeader != null ? parocoLeader.name() : "Pe. João Silva";
        String vigarioName = vigarioLeader != null ? vigarioLeader.name() : "Pe. Antônio";

        // 3. Busca Tesoureiro da tabela parish_leadership (onde role = 'Tesoureiro' ou 'Ecônomo')
        ParishLeader tesoureiroLeader = activeLeaders.stream()
                .filter(l -> {
                    String r = l.role().toLowerCase();
                    return r.contains("tesour") || r.contains("ecônom") || r.contains("econom");
                })
                .findFirst()
                .orElse(null);

        String resolvedTreasurer;
        if (tesoureiroLeader != null && tesoureiroLeader.name() != null && !tesoureiroLeader.name().isBlank()) {
            resolvedTreasurer = tesoureiroLeader.name();
        } else if (treasurerName != null && !treasurerName.isBlank()
                && !treasurerName.equalsIgnoreCase("Admin")
                && !treasurerName.equalsIgnoreCase("Administrator")
                && !treasurerName.equalsIgnoreCase("Tesoureiro(a) Paroquial")) {
            resolvedTreasurer = treasurerName;
        } else if (targetCommName != null && !targetCommName.isBlank()
                && !targetCommName.equalsIgnoreCase("Matriz")
                && !targetCommName.equalsIgnoreCase("Consolidado")
                && !targetCommName.toLowerCase().contains("todas")) {
            // 4. Caso não encontre na tabela, exibe "Tesoureiro(a) - [Nome da Comunidade]"
            resolvedTreasurer = "Tesoureiro(a) - " + targetCommName;
        } else {
            // Verifica se todas as entradas do relatório são de uma comunidade específica
            List<String> distinctCenters = entries.stream()
                    .map(LedgerEntry::costCenter)
                    .filter(c -> c != null && !c.isBlank() && !c.equalsIgnoreCase("Matriz") && !c.equalsIgnoreCase("Geral"))
                    .distinct()
                    .toList();
            if (targetCommId == null && distinctCenters.size() == 1) {
                resolvedTreasurer = "Tesoureiro(a) - " + distinctCenters.get(0);
            } else {
                // 5. Se a comunidade for "Todas (Consolidado)", exibe "Tesoureiro(a) Paroquial"
                resolvedTreasurer = "Tesoureiro(a) Paroquial";
            }
        }

        // Layout formal de 3 assinaturas independentes e não repetidas:
        // 1. Pároco | 2. Tesoureiro | 3. Vigário
        List<ReportSignature> signatures = List.of(
                new ReportSignature("Pároco", parocoName),
                new ReportSignature("Tesoureiro(a) Paroquial", resolvedTreasurer),
                new ReportSignature("Vigário Paroquial", vigarioName)
        );

        return new FinancialReport(start, end, previousBalance, totalIncome, totalExpenses, closing, incomes, expenses, signatures, entries, leadershipHeader);
    }

    private LedgerEntry resolveEntryCommunityCostCenter(LedgerEntry entry) {
        String communityName = null;
        if (entry.communityId() != null && !entry.communityId().isBlank() && communityRepository != null) {
            communityName = communityRepository.findById(entry.communityId())
                    .map(Community::name)
                    .orElse(null);
        }

        if (communityName == null || communityName.isBlank()) {
            String current = entry.costCenter();
            if (current == null || current.isBlank() || isGenericOrAccountName(current)) {
                if (communityRepository != null) {
                    communityName = communityRepository.findMainParish()
                            .map(Community::name)
                            .orElse("Matriz");
                } else {
                    communityName = "Matriz";
                }
            } else {
                communityName = current;
            }
        }

        return new LedgerEntry(
                entry.id(),
                entry.communityId(),
                entry.memberId(),
                entry.accountCode(),
                entry.referenceCode(),
                communityName,
                entry.description(),
                entry.amount(),
                entry.type(),
                entry.occurredOn()
        );
    }

    private boolean isGenericOrAccountName(String value) {
        String trimmed = value.trim();
        if (trimmed.equalsIgnoreCase("Geral") || trimmed.equalsIgnoreCase("N/A") || trimmed.equalsIgnoreCase("null")) {
            return true;
        }
        if (chart.findByCode(trimmed).isPresent()) {
            return true;
        }
        String lower = trimmed.toLowerCase();
        return chart.all().stream().anyMatch(a ->
                a.description().equalsIgnoreCase(trimmed) ||
                a.classification().equalsIgnoreCase(trimmed) ||
                lower.contains("água") || lower.contains("energia") || lower.contains("dízimo") || lower.contains("salário")
        );
    }

    private List<FinancialReportLine> buildLines(List<LedgerEntry> entries, LedgerEntryType type) {
        Map<String, List<LedgerEntry>> grouped = new TreeMap<>();
        for (LedgerEntry entry : entries) {
            if (entry.type() != type) {
                continue;
            }
            grouped.computeIfAbsent(entry.accountCode(), ignored -> new ArrayList<>()).add(entry);
        }

        return grouped.entrySet().stream()
                .map(entry -> {
                    String code = entry.getKey();
                    String accountName = chart.nameFor(code);
                    BigDecimal total = entry.getValue().stream()
                            .map(LedgerEntry::amount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    Set<String> references = entry.getValue().stream()
                            .map(LedgerEntry::referenceCode)
                            .collect(Collectors.toCollection(java.util.LinkedHashSet::new));
                    Set<String> costCenters = entry.getValue().stream()
                            .map(LedgerEntry::costCenter)
                            .collect(Collectors.toCollection(java.util.LinkedHashSet::new));
                    return new FinancialReportLine(code, accountName, List.copyOf(references), List.copyOf(costCenters), total);
                })
                .sorted(Comparator.comparing(FinancialReportLine::accountCode))
                .collect(Collectors.toList());
    }

    private BigDecimal sum(List<FinancialReportLine> lines) {
        return lines.stream()
                .map(FinancialReportLine::total)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
