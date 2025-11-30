package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import com.ecoeclesia.finance.LedgerEntry;
import com.ecoeclesia.finance.LedgerEntryType;

public final class FinancialReportFormatter {

    private static final DateTimeFormatter DATE = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DecimalFormat MONEY = new DecimalFormat("#,##0.00");

    public String render(FinancialReport report) {
        StringBuilder builder = new StringBuilder();
        builder.append("Relatório Financeiro Consolidado\n");
        builder.append("Período: ").append(DATE.format(report.start())).append(" a ").append(DATE.format(report.end())).append("\n\n");

        builder.append("Saldo anterior: R$ ").append(format(report.previousBalance())).append("\n");
        builder.append("Total de receitas: R$ ").append(format(report.totalIncome())).append("\n");
        builder.append("Total de despesas: R$ ").append(format(report.totalExpenses())).append("\n");
        builder.append("Saldo final: R$ ").append(format(report.closingBalance())).append("\n\n");

        if (!report.entries().isEmpty()) {
            builder.append("Centro(s) de custo: ")
                    .append(report.entries().stream().map(LedgerEntry::costCenter).distinct().reduce((a, b) -> a + ", " + b).orElse(""))
                    .append("\n\n");

            builder.append(String.format("%-4s %-10s %-12s %-18s %-18s %-24s %12s %12s\n",
                    "Nº", "Data", "Conta", "Centro de Custo", "Referência", "Histórico", "Entradas", "Saídas"));
            int idx = 1;
            for (LedgerEntry entry : report.entries()) {
                String income = entry.type() == LedgerEntryType.INCOME ? format(entry.amount()) : "";
                String expense = entry.type() == LedgerEntryType.EXPENSE ? format(entry.amount()) : "";
                builder.append(String.format(Locale.ROOT, "%-4d %-10s %-12s %-18s %-18s %-24s %12s %12s\n",
                        idx++, entry.occurredOn().format(DATE), entry.accountCode(),
                        entry.costCenter(), entry.referenceCode(), abbreviate(entry.description(), 24), income, expense));
            }
            builder.append("\n");
        }

        appendSection(builder, "Receitas", report.incomeLines());
        appendSection(builder, "Despesas", report.expenseLines());

        builder.append("Assinaturas\n");
        for (ReportSignature signature : report.signatures()) {
            builder.append("__________________________________  ").append(signature.role());
            if (signature.name() != null && !signature.name().isBlank()) {
                builder.append(" - ").append(signature.name());
            }
            builder.append("\n");
        }
        return builder.toString();
    }

    private void appendSection(StringBuilder builder, String title, List<FinancialReportLine> lines) {
        builder.append(title).append("\n");
        for (FinancialReportLine line : lines) {
            builder.append("  ").append(line.accountCode()).append(" ").append(line.accountName())
                    .append("  R$ ").append(format(line.total())).append("\n");
            builder.append("    Referências: ").append(String.join(", ", line.referenceCodes())).append("\n");
            builder.append("    Centros de custo: ").append(String.join(", ", line.costCenters())).append("\n");
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
