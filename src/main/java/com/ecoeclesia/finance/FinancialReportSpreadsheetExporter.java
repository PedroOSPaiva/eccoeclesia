package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.util.Objects;

/**
 * Generates a CSV representation of the consolidated report so it can be
 * imported into spreadsheets while keeping the official headers used in the
 * PDF.
 */
public final class FinancialReportSpreadsheetExporter {

    public String toCsv(FinancialReport report) {
        Objects.requireNonNull(report, "report");
        StringBuilder builder = new StringBuilder();
        builder.append("Organizacao,Periodo Inicio,Periodo Fim,Saldo Anterior,Entradas,Saidas,Saldo Final\n");
        builder.append(String.join(",",
                quote("Paroquia EcoEcclesia"),
                quote(report.start().toString()),
                quote(report.end().toString()),
                quote(money(report.previousBalance())),
                quote(money(report.totalIncome())),
                quote(money(report.totalExpenses())),
                quote(money(report.closingBalance())))).append("\n\n");

        builder.append("Tipo,Codigo,Descricao,Total,Centro de Custo,Referencia\n");
        report.incomeLines().forEach(line -> builder.append(lineToCsv("Receita", line)));
        report.expenseLines().forEach(line -> builder.append(lineToCsv("Despesa", line)));
        return builder.toString();
    }

    private String lineToCsv(String type, FinancialReportLine line) {
        return String.join(",",
                        quote(type),
                        quote(line.accountCode()),
                        quote(line.accountName()),
                        quote(money(line.total())),
                        quote(String.join("|", line.costCenters())),
                        quote(String.join("|", line.referenceCodes())))
                + "\n";
    }

    private String money(BigDecimal value) {
        return value.setScale(2, java.math.RoundingMode.HALF_UP).toPlainString();
    }

    private String quote(String value) {
        return '"' + value.replace("\"", "''") + '"';
    }
}
