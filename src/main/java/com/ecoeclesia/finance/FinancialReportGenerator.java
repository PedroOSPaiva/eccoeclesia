package com.ecoeclesia.finance;

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

    public FinancialReportGenerator(LedgerRepository repository, ChartOfAccounts chart) {
        this.repository = Objects.requireNonNull(repository);
        this.chart = Objects.requireNonNull(chart);
    }

    public FinancialReport generate(LocalDate start, LocalDate end, BigDecimal previousBalance) {
        Objects.requireNonNull(start, "start");
        Objects.requireNonNull(end, "end");
        Objects.requireNonNull(previousBalance, "previousBalance");

        List<LedgerEntry> entries = repository.findByPeriod(start, end).stream()
                .sorted(Comparator.comparing(LedgerEntry::occurredOn).thenComparing(LedgerEntry::accountCode))
                .toList();

        List<FinancialReportLine> incomes = buildLines(entries, LedgerEntryType.INCOME);
        List<FinancialReportLine> expenses = buildLines(entries, LedgerEntryType.EXPENSE);

        BigDecimal totalIncome = sum(incomes);
        BigDecimal totalExpenses = sum(expenses);
        BigDecimal closing = previousBalance.add(totalIncome).subtract(totalExpenses);

        List<ReportSignature> signatures = List.of(
                new ReportSignature("Tesoureiro(a)", "Maria Helena Souza"),
                new ReportSignature("Pároco", "Pe. João Batista"),
                new ReportSignature("Conselho Fiscal", "Comissão Financeira")
        );

        return new FinancialReport(start, end, previousBalance, totalIncome, totalExpenses, closing, incomes, expenses, signatures, entries);
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
