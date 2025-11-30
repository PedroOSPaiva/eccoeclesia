package com.ecoeclesia.finance;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Gera um PDF manual (texto) sem dependências externas para espelhar o modelo
 * institucional. O documento contém cabeçalho, blocos de centro de custo e
 * saldos, grade de lançamentos numerados com colunas de entrada/saída, espaços
 * de assinatura, rodapé de emissão/página e um apêndice com o plano de contas.
 */
public final class FinancialReportPdfExporter {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final int LINE_HEIGHT = 12;
    private static final int LEFT = 40;
    private static final int TOP = 780;
    private static final int BOTTOM = 60;

    private final ChartOfAccounts chart;

    public FinancialReportPdfExporter() {
        this(ChartOfAccounts.defaultPlan());
    }

    public FinancialReportPdfExporter(ChartOfAccounts chart) {
        this.chart = Objects.requireNonNull(chart, "chart");
    }

    public byte[] render(FinancialReport report) {
        Objects.requireNonNull(report, "report");
        try {
            List<LedgerEntry> orderedEntries = report.entries().stream()
                    .sorted(Comparator.comparing(LedgerEntry::occurredOn).thenComparing(LedgerEntry::description))
                    .toList();

            MultiPagePdfBuilder pdf = new MultiPagePdfBuilder();

            BigDecimal runningBalance = report.previousBalance();
            int y = TOP;

            y = startLedgerPage(pdf, report);
            for (int i = 0; i < orderedEntries.size(); i++) {
                LedgerEntry entry = orderedEntries.get(i);
                if (y < BOTTOM + 4 * LINE_HEIGHT) {
                    y = startLedgerPage(pdf, report);
                }
                runningBalance = runningBalance.add(entry.type() == LedgerEntryType.INCOME ? entry.amount() : entry.amount().negate());
                addLedgerRow(pdf, i + 1, y, entry, runningBalance);
                y -= LINE_HEIGHT;
            }

            y -= LINE_HEIGHT;
            pdf.addText(LEFT, y, 10, String.format("Totais%-92s %12s %12s %12s", "", money(report.totalIncome()), money(report.totalExpenses()), money(report.closingBalance())));
            y -= (LINE_HEIGHT * 2);

            addSignatures(pdf, y, report.signatures());

            appendChartOfAccountsAppendix(pdf);

            pdf.addFooters("Emitido em " + DATE_FORMAT.format(LocalDate.now()) + " • Página %d de %d");

            ByteArrayOutputStream output = new ByteArrayOutputStream();
            pdf.build(output);
            return output.toByteArray();
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to generate PDF", ex);
        }
    }

    private int startLedgerPage(MultiPagePdfBuilder pdf, FinancialReport report) {
        pdf.newPage();
        int y = TOP;
        pdf.addText(LEFT, y, 12, "Paróquia EcoEcclesia – Prestação de Contas");
        y -= LINE_HEIGHT;
        pdf.addText(LEFT, y, 10, "Período: " + DATE_FORMAT.format(report.start()) + " a " + DATE_FORMAT.format(report.end()));
        y -= LINE_HEIGHT;
        String centers = report.entries().stream().map(LedgerEntry::costCenter).distinct()
                .collect(Collectors.joining(", "));
        pdf.addText(LEFT, y, 10, "Centro de Custo: " + (centers.isBlank() ? "Geral" : centers));
        y -= LINE_HEIGHT;

        pdf.addText(LEFT, y, 10, "Conta de movimento: 1 - Caixa");
        y -= LINE_HEIGHT;

        pdf.addText(LEFT, y, 10, "Saldo Anterior");
        pdf.addText(LEFT + 170, y, 10, "Entradas");
        pdf.addText(LEFT + 320, y, 10, "Saídas");
        pdf.addText(LEFT + 450, y, 10, "Saldo Atualizado");
        y -= LINE_HEIGHT;
        pdf.addText(LEFT, y, 10, "R$ " + money(report.previousBalance()));
        pdf.addText(LEFT + 170, y, 10, "R$ " + money(report.totalIncome()));
        pdf.addText(LEFT + 320, y, 10, "R$ " + money(report.totalExpenses()));
        pdf.addText(LEFT + 450, y, 10, "R$ " + money(report.closingBalance()));
        y -= (LINE_HEIGHT * 2);

        pdf.addText(LEFT, y, 10, "Nº  Data       Cód. Conta      Centro de Custo    Referência        Histórico                           Entradas      Saídas      Saldo");
        y -= LINE_HEIGHT;
        return y;
    }

    private void addLedgerRow(MultiPagePdfBuilder pdf, int index, int y, LedgerEntry entry, BigDecimal runningBalance) {
        String income = entry.type() == LedgerEntryType.INCOME ? money(entry.amount()) : "";
        String expense = entry.type() == LedgerEntryType.EXPENSE ? money(entry.amount()) : "";
        String row = String.format("%3d %-10s %-13s %-18s %-16s %-32s %12s %12s %12s",
                index, DATE_FORMAT.format(entry.occurredOn()), entry.accountCode(),
                truncate(entry.costCenter(), 18), truncate(entry.referenceCode(), 16), truncate(entry.description(), 32),
                income, expense, money(runningBalance));
        pdf.addText(LEFT, y, 9, row);
    }

    private void addSignatures(MultiPagePdfBuilder pdf, int y, List<ReportSignature> signatures) {
        int sigY = Math.max(y, 140);
        for (ReportSignature signature : signatures) {
            pdf.addText(LEFT + 20, sigY, 10, "_____________________________");
            pdf.addText(LEFT + 20, sigY - LINE_HEIGHT, 10,
                    signature.role() + ": " + (signature.name() == null ? "________________" : signature.name()));
            sigY -= (LINE_HEIGHT * 4);
        }
    }

    private void appendChartOfAccountsAppendix(MultiPagePdfBuilder pdf) {
        pdf.newPage();
        int y = TOP;
        pdf.addText(LEFT, y, 12, "Plano de Contas Paroquial (Apêndice)");
        y -= (LINE_HEIGHT * 2);
        pdf.addText(LEFT, y, 10, "Código    Classificação            Tipo        Descrição                                             Natureza");
        y -= LINE_HEIGHT;

        for (ChartOfAccount account : chart.all()) {
            if (y < BOTTOM + LINE_HEIGHT) {
                pdf.newPage();
                y = TOP;
                pdf.addText(LEFT, y, 12, "Plano de Contas Paroquial (continuação)");
                y -= (LINE_HEIGHT * 2);
                pdf.addText(LEFT, y, 10, "Código    Classificação            Tipo        Descrição                                             Natureza");
                y -= LINE_HEIGHT;
            }
            String row = String.format("%-8s %-24s %-11s %-52s %-8s",
                    account.code(), truncate(account.classification(), 24), truncate(account.type(), 11), truncate(account.description(), 52),
                    account.nature());
            pdf.addText(LEFT, y, 9, row);
            y -= LINE_HEIGHT;
        }
    }

    private String money(BigDecimal value) {
        return value.setScale(2, java.math.RoundingMode.HALF_UP).toPlainString();
    }

    private String truncate(String value, int max) {
        if (value == null) {
            return "";
        }
        if (value.length() <= max) {
            return value;
        }
        return value.substring(0, max - 1) + "…";
    }

    private static final class MultiPagePdfBuilder {
        private final List<Page> pages = new ArrayList<>();
        private Page current;

        void newPage() {
            current = new Page();
            pages.add(current);
        }

        void addText(int x, int y, int fontSize, String text) {
            ensurePage();
            current.content.add(new TextOp(x, y, fontSize, text));
        }

        void addFooters(String template) {
            int total = pages.size();
            for (int i = 0; i < pages.size(); i++) {
                pages.get(i).footers.add(new TextOp(LEFT, 40, 9, template.formatted(i + 1, total)));
            }
        }

        void build(ByteArrayOutputStream output) throws IOException {
            output.write("%PDF-1.4\n".getBytes(StandardCharsets.UTF_8));
            List<Integer> offsets = new ArrayList<>();
            int position = "%PDF-1.4\n".length();

            int firstPageId = 3;
            int firstContentId = firstPageId + pages.size();
            int fontId = firstContentId + pages.size();

            // catalog
            position = writeObject(output, offsets, position, "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n");

            // pages
            StringBuilder kidsBuilder = new StringBuilder();
            for (int i = 0; i < pages.size(); i++) {
                kidsBuilder.append(firstPageId + i).append(" 0 R ");
            }
            String kids = kidsBuilder.toString().trim();
            position = writeObject(output, offsets, position,
                    "2 0 obj << /Type /Pages /Kids [" + kids + "] /Count " + pages.size() + " >> endobj\n");

            // page objects
            for (int i = 0; i < pages.size(); i++) {
                int pageId = firstPageId + i;
                int contentId = firstContentId + i;
                String pageObj = "%d 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents %d 0 R /Resources << /Font << /F1 %d 0 R >> >> >> endobj\n".formatted(pageId, contentId, fontId);
                position = writeObject(output, offsets, position, pageObj);
            }

            // font
            position = writeObject(output, offsets, position,
                    "%d 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n".formatted(fontId));

            // content streams
            for (int i = 0; i < pages.size(); i++) {
                Page page = pages.get(i);
                StringBuilder content = new StringBuilder();
                for (TextOp op : page.content) {
                    content.append("BT /F1 ").append(op.fontSize()).append(" Tf ")
                            .append(op.x()).append(' ').append(op.y()).append(" Td (")
                            .append(escape(op.text())).append(") Tj ET\n");
                }
                for (TextOp op : page.footers) {
                    content.append("BT /F1 ").append(op.fontSize()).append(" Tf ")
                            .append(op.x()).append(' ').append(op.y()).append(" Td (")
                            .append(escape(op.text())).append(") Tj ET\n");
                }
                byte[] data = content.toString().getBytes(StandardCharsets.UTF_8);
                int contentId = firstContentId + i;
                String obj = "%d 0 obj << /Length %d >> stream\n%s\nendstream\nendobj\n".formatted(contentId, data.length, content);
                position = writeObject(output, offsets, position, obj);
            }

            int xrefOffset = position;
            output.write("xref\n".getBytes(StandardCharsets.UTF_8));
            output.write(("0 " + (offsets.size() + 1) + "\n").getBytes(StandardCharsets.UTF_8));
            output.write("0000000000 65535 f \n".getBytes(StandardCharsets.UTF_8));
            for (int offset : offsets) {
                output.write(String.format("%010d 00000 n \n", offset).getBytes(StandardCharsets.UTF_8));
            }
            String trailer = "trailer << /Size " + (offsets.size() + 1) + " /Root 1 0 R >>\nstartxref\n" + xrefOffset + "\n%%EOF";
            output.write(trailer.getBytes(StandardCharsets.UTF_8));
        }

        private int writeObject(ByteArrayOutputStream output, List<Integer> offsets, int position, String object) throws IOException {
            offsets.add(position);
            byte[] bytes = object.getBytes(StandardCharsets.UTF_8);
            output.write(bytes);
            return position + bytes.length;
        }

        private void ensurePage() {
            if (current == null) {
                newPage();
            }
        }

        private String escape(String text) {
            return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)");
        }

        private static final class Page {
            private final List<TextOp> content = new ArrayList<>();
            private final List<TextOp> footers = new ArrayList<>();
        }

        private record TextOp(int x, int y, int fontSize, String text) {
        }
    }
}
