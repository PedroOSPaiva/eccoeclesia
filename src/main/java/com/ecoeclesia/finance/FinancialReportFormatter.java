package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

public final class FinancialReportFormatter {

    private static final DateTimeFormatter DATE = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DecimalFormat MONEY = new DecimalFormat("#,##0.00");

    private final ChartOfAccounts chart;

    public FinancialReportFormatter() {
        this(ChartOfAccounts.defaultPlan());
    }

    public FinancialReportFormatter(ChartOfAccounts chart) {
        this.chart = Objects.requireNonNull(chart, "chart");
    }

    public String render(FinancialReport report) {
        StringBuilder builder = new StringBuilder();
        builder.append("Relatório Financeiro Consolidado\n");
        if (report.leadershipHeader() != null && !report.leadershipHeader().isBlank()) {
            builder.append(report.leadershipHeader()).append("\n");
        }
        builder.append("Período: ").append(DATE.format(report.start())).append(" a ").append(DATE.format(report.end())).append("\n\n");

        builder.append("Saldo anterior: R$ ").append(format(report.previousBalance())).append("\n");
        builder.append("Total de receitas: R$ ").append(format(report.totalIncome())).append("\n");
        builder.append("Total de despesas: R$ ").append(format(report.totalExpenses())).append("\n");
        builder.append("Saldo final: R$ ").append(format(report.closingBalance())).append("\n\n");

        if (!report.entries().isEmpty()) {
            builder.append("Centro(s) de custo: ")
                    .append(report.entries().stream().map(LedgerEntry::costCenter).distinct().reduce((a, b) -> a + ", " + b).orElse("Matriz"))
                    .append("\n\n");

            builder.append(String.format("%-4s %-10s %-34s %-18s %-15s %-24s %12s %12s\n",
                    "Nº", "Data", "Conta", "Centro de Custo", "Referência", "Histórico", "Entradas", "Saídas"));
            int idx = 1;
            for (LedgerEntry entry : report.entries()) {
                String income = entry.type() == LedgerEntryType.INCOME ? format(entry.amount()) : "";
                String expense = entry.type() == LedgerEntryType.EXPENSE ? format(entry.amount()) : "";
                String accountLabel = entry.accountCode() + " - " + chart.nameFor(entry.accountCode());
                builder.append(String.format(Locale.ROOT, "%-4d %-10s %-34s %-18s %-15s %-24s %12s %12s\n",
                        idx++,
                        entry.occurredOn().format(DATE),
                        abbreviate(accountLabel, 34),
                        abbreviate(entry.costCenter(), 18),
                        abbreviate(entry.referenceCode(), 15),
                        abbreviate(entry.description(), 24),
                        income,
                        expense));
            }
            builder.append("\n");
        }

        appendSection(builder, "Receitas", report.incomeLines());
        appendSection(builder, "Despesas", report.expenseLines());

        builder.append("Assinaturas\n");
        for (ReportSignature signature : report.signatures()) {
            builder.append("__________________________________________________\n");
            String name = signature.name();
            if (name == null || name.equalsIgnoreCase("Admin") || name.equalsIgnoreCase("Administrator")) {
                name = signature.role();
            }
            builder.append(name).append("\n");
            if (signature.role() != null && !name.toLowerCase().startsWith("tesoureiro") && !signature.role().equalsIgnoreCase(name)) {
                builder.append(signature.role()).append("\n");
            }
            builder.append("\n");
        }
        return builder.toString();
    }

    private void appendSection(StringBuilder builder, String title, List<FinancialReportLine> lines) {
        builder.append(title).append(":\n");
        for (FinancialReportLine line : lines) {
            builder.append("  ")
                    .append(line.accountCode())
                    .append(" ")
                    .append(line.accountName())
                    .append("  R$ ")
                    .append(format(line.total()))
                    .append("\n");
        }
        if (lines.isEmpty()) {
            builder.append("  (sem lançamentos)\n");
        }
        builder.append("\n");
    }

    private String abbreviate(String value, int max) {
        if (value == null) {
            return "";
        }
        if (value.length() <= max) {
            return value;
        }
        return value.substring(0, max - 1) + "…";
    }

    private String format(BigDecimal value) {
        MONEY.setDecimalSeparatorAlwaysShown(true);
        MONEY.setGroupingUsed(true);
        MONEY.setGroupingSize(3);
        MONEY.setMaximumFractionDigits(2);
        MONEY.setMinimumFractionDigits(2);
        MONEY.setDecimalFormatSymbols(java.text.DecimalFormatSymbols.getInstance(new Locale("pt", "BR")));
        return MONEY.format(value);
    }
}
