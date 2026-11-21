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
import java.util.Locale;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Gera um PDF manual (texto) sem dependências externas para espelhar o modelo
 * institucional. O documento contém cabeçalho com a liderança paroquial,
 * blocos de centro de custo e saldos, grade de lançamentos numerados com
 * colunas de conta (Código - Nome da Conta), centro de custo, referência,
 * histórico e valores, resumo contábil inferior por conta, e 3 linhas
 * independentes de assinatura (Pároco, Tesoureiro e Vigário).
 */
public final class FinancialReportPdfExporter {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final int LINE_HEIGHT = 12;
    private static final int LEFT = 35;
    private static final int TOP = 780;
    private static final int BOTTOM = 55;

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
            pdf.addText(LEFT, y, 8, String.format("Totais%-96s %11s %11s %11s", "", money(report.totalIncome()), money(report.totalExpenses()), money(report.closingBalance())));
            y -= (LINE_HEIGHT * 2);

            // Agrupamento inferior de Receitas e Despesas
            y = appendGroupedSections(pdf, y, report);

            // 3 Linhas independentes de assinatura no rodapé: Pároco, Tesoureiro e Vigário
            addSignatures(pdf, y, report.signatures());

            appendChartOfAccountsAppendix(pdf);

            pdf.addFooters("Emitido em " + DATE_FORMAT.format(LocalDate.now()) + " - Pagina %d de %d");

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
        pdf.addText(LEFT, y, 12, "Paroquia EcoEcclesia - Prestacao de Contas");
        y -= LINE_HEIGHT;

        if (report.leadershipHeader() != null && !report.leadershipHeader().isBlank()) {
            pdf.addText(LEFT, y, 9, report.leadershipHeader());
            y -= LINE_HEIGHT;
        }

        pdf.addText(LEFT, y, 9, "Período: " + DATE_FORMAT.format(report.start()) + " a " + DATE_FORMAT.format(report.end()));
        y -= LINE_HEIGHT;
        String centers = report.entries().stream().map(LedgerEntry::costCenter).distinct()
                .collect(Collectors.joining(", "));
        pdf.addText(LEFT, y, 9, "Centro de Custo: " + (centers.isBlank() ? "Matriz" : centers));
        y -= LINE_HEIGHT;

        pdf.addText(LEFT, y, 9, "Conta de movimento: 1 - Caixa");
        y -= LINE_HEIGHT;

        pdf.addText(LEFT, y, 9, "Saldo Anterior");
        pdf.addText(LEFT + 170, y, 9, "Entradas");
        pdf.addText(LEFT + 320, y, 9, "Saídas");
        pdf.addText(LEFT + 450, y, 9, "Saldo Atualizado");
        y -= LINE_HEIGHT;
        pdf.addText(LEFT, y, 9, "R$ " + money(report.previousBalance()));
        pdf.addText(LEFT + 170, y, 9, "R$ " + money(report.totalIncome()));
        pdf.addText(LEFT + 320, y, 9, "R$ " + money(report.totalExpenses()));
        pdf.addText(LEFT + 450, y, 9, "R$ " + money(report.closingBalance()));
        y -= (LINE_HEIGHT * 2);

        pdf.addText(LEFT, y, 8, "Nº  Data       Conta                              Centro de Custo    Referência      Histórico               Entradas      Saídas      Saldo");
        y -= LINE_HEIGHT;
        return y;
    }

    private void addLedgerRow(MultiPagePdfBuilder pdf, int index, int y, LedgerEntry entry, BigDecimal runningBalance) {
        String income = entry.type() == LedgerEntryType.INCOME ? money(entry.amount()) : "";
        String expense = entry.type() == LedgerEntryType.EXPENSE ? money(entry.amount()) : "";
        String accountLabel = entry.accountCode() + " - " + chart.nameFor(entry.accountCode());
        String row = String.format("%3d %-10s %-34s %-18s %-15s %-23s %11s %11s %11s",
                index,
                DATE_FORMAT.format(entry.occurredOn()),
                truncate(accountLabel, 34),
                truncate(entry.costCenter(), 18),
                truncate(entry.referenceCode(), 15),
                truncate(entry.description(), 23),
                income,
                expense,
                money(runningBalance));
        pdf.addText(LEFT, y, 8, row);
    }

    private int appendGroupedSections(MultiPagePdfBuilder pdf, int y, FinancialReport report) {
        if (y < BOTTOM + 200) {
            pdf.newPage();
            y = TOP - 40;
        }

        pdf.addText(LEFT, y, 10, "Resumo por Conta Contábil (Receitas e Despesas)");
        y -= (int)(LINE_HEIGHT * 1.5);

        pdf.addText(LEFT, y, 9, "Receitas:");
        y -= LINE_HEIGHT;
        for (FinancialReportLine line : report.incomeLines()) {
            if (y < BOTTOM + 160) {
                pdf.newPage();
                y = TOP - 40;
            }
            String lineText = String.format("  %-8s %-42s R$ %12s", line.accountCode(), truncate(line.accountName(), 42), money(line.total()));
            pdf.addText(LEFT, y, 8, lineText);
            y -= LINE_HEIGHT;
        }
        if (report.incomeLines().isEmpty()) {
            pdf.addText(LEFT, y, 8, "  (sem lançamentos)");
            y -= LINE_HEIGHT;
        }

        y -= LINE_HEIGHT;
        pdf.addText(LEFT, y, 9, "Despesas:");
        y -= LINE_HEIGHT;
        for (FinancialReportLine line : report.expenseLines()) {
            if (y < BOTTOM + 160) {
                pdf.newPage();
                y = TOP - 40;
            }
            String lineText = String.format("  %-8s %-42s R$ %12s", line.accountCode(), truncate(line.accountName(), 42), money(line.total()));
            pdf.addText(LEFT, y, 8, lineText);
            y -= LINE_HEIGHT;
        }
        if (report.expenseLines().isEmpty()) {
            pdf.addText(LEFT, y, 8, "  (sem lançamentos)");
            y -= LINE_HEIGHT;
        }

        y -= (LINE_HEIGHT * 2);
        return y;
    }

    private void addSignatures(MultiPagePdfBuilder pdf, int y, List<ReportSignature> signatures) {
        ReportSignature paroco = signatures.stream()
                .filter(s -> s.role().toLowerCase().contains("pároco") || s.role().toLowerCase().contains("paroco"))
                .findFirst()
                .orElse(new ReportSignature("Pároco", "Pe. João Silva"));

        ReportSignature tesoureiro = signatures.stream()
                .filter(s -> s.role().toLowerCase().contains("tesour") || s.role().toLowerCase().contains("ecônom") || s.role().toLowerCase().contains("econom"))
                .findFirst()
                .orElse(new ReportSignature("Tesoureiro(a) Paroquial", "Tesoureiro(a) Paroquial"));

        ReportSignature vigario = signatures.stream()
                .filter(s -> s.role().toLowerCase().contains("vigário") || s.role().toLowerCase().contains("vigario"))
                .findFirst()
                .orElse(new ReportSignature("Vigário Paroquial", "Pe. Antônio"));

        int requiredHeight = 150;
        int sigY = y;
        if (sigY < BOTTOM + requiredHeight) {
            pdf.newPage();
            sigY = TOP - 50;
        }

        // 1. Linha para assinatura do Pároco
        pdf.addText(LEFT + 30, sigY, 10, "__________________________________________________");
        pdf.addText(LEFT + 30, sigY - LINE_HEIGHT, 10, paroco.name());
        pdf.addText(LEFT + 30, sigY - (LINE_HEIGHT * 2), 10, "Pároco");

        sigY -= (LINE_HEIGHT * 4);

        // 2. Linha para assinatura do Tesoureiro
        String treasurerLine = tesoureiro.name();
        if (treasurerLine == null || treasurerLine.isBlank() || treasurerLine.equalsIgnoreCase("Admin") || treasurerLine.equalsIgnoreCase("Administrator")) {
            treasurerLine = "Tesoureiro(a) Paroquial";
        }

        pdf.addText(LEFT + 30, sigY, 10, "__________________________________________________");
        pdf.addText(LEFT + 30, sigY - LINE_HEIGHT, 10, treasurerLine);
        if (!treasurerLine.toLowerCase().startsWith("tesoureiro")) {
            pdf.addText(LEFT + 30, sigY - (LINE_HEIGHT * 2), 10, "Tesoureiro(a) Paroquial");
        }

        sigY -= (LINE_HEIGHT * 4);

        // 3. Linha para assinatura do Vigário
        pdf.addText(LEFT + 30, sigY, 10, "__________________________________________________");
        pdf.addText(LEFT + 30, sigY - LINE_HEIGHT, 10, vigario.name());
        pdf.addText(LEFT + 30, sigY - (LINE_HEIGHT * 2), 10, "Vigário Paroquial");
    }

    private void appendChartOfAccountsAppendix(MultiPagePdfBuilder pdf) {
        pdf.newPage();
        int y = TOP;
        pdf.addText(LEFT, y, 12, "Plano de Contas Paroquial (Apêndice)");
        y -= (LINE_HEIGHT * 2);
        pdf.addText(LEFT, y, 9, "Código    Classificação            Tipo        Descrição                                             Natureza");
        y -= LINE_HEIGHT;

        for (ChartOfAccount account : chart.all()) {
            if (y < BOTTOM + LINE_HEIGHT) {
                pdf.newPage();
                y = TOP;
                pdf.addText(LEFT, y, 12, "Plano de Contas Paroquial (continuação)");
                y -= (LINE_HEIGHT * 2);
                pdf.addText(LEFT, y, 9, "Código    Classificação            Tipo        Descrição                                             Natureza");
                y -= LINE_HEIGHT;
            }
            String row = String.format("%-8s %-24s %-11s %-52s %-8s",
                    account.code(), truncate(account.classification(), 24), truncate(account.type(), 11), truncate(account.description(), 52),
                    account.nature());
            pdf.addText(LEFT, y, 8, row);
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
        if (max > 3) {
            return value.substring(0, max - 3) + "...";
        }
        return value.substring(0, max);
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
                pages.get(i).footers.add(new TextOp(LEFT, 40, 8, template.formatted(i + 1, total)));
            }
        }

        void build(ByteArrayOutputStream output) throws IOException {
            int numPages = pages.size();
            List<Integer> offsets = new ArrayList<>();
            int position = 0;

            byte[] headerBytes = "%PDF-1.4\n".getBytes(StandardCharsets.US_ASCII);
            output.write(headerBytes);
            position += headerBytes.length;

            int firstPageId = 3;
            int firstContentId = firstPageId + numPages;
            int fontId = firstContentId + numPages;

            // 1. Catalog (Object 1)
            offsets.add(position);
            byte[] catalogBytes = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n".getBytes(StandardCharsets.US_ASCII);
            output.write(catalogBytes);
            position += catalogBytes.length;

            // 2. Pages (Object 2)
            StringBuilder kidsBuilder = new StringBuilder();
            for (int i = 0; i < numPages; i++) {
                kidsBuilder.append(firstPageId + i).append(" 0 R ");
            }
            String kids = kidsBuilder.toString().trim();
            offsets.add(position);
            byte[] pagesBytes = ("2 0 obj\n<< /Type /Pages /Kids [" + kids + "] /Count " + numPages + " >>\nendobj\n")
                    .getBytes(StandardCharsets.US_ASCII);
            output.write(pagesBytes);
            position += pagesBytes.length;

            // 3. Page objects (Objects 3 to 2 + numPages)
            for (int i = 0; i < numPages; i++) {
                int pageId = firstPageId + i;
                int contentId = firstContentId + i;
                String pageObj = "%d 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents %d 0 R /Resources << /Font << /F1 %d 0 R >> >> >>\nendobj\n"
                        .formatted(pageId, contentId, fontId);
                offsets.add(position);
                byte[] bytes = pageObj.getBytes(StandardCharsets.US_ASCII);
                output.write(bytes);
                position += bytes.length;
            }

            // 4. Content streams (Objects firstContentId to firstContentId + numPages - 1)
            for (int i = 0; i < numPages; i++) {
                Page page = pages.get(i);
                StringBuilder content = new StringBuilder();
                for (TextOp op : page.content) {
                    content.append("BT /F1 ").append(op.fontSize()).append(" Tf ")
                            .append(op.x()).append(' ').append(op.y()).append(" Td (")
                            .append(sanitizeAndEscape(op.text())).append(") Tj ET\n");
                }
                for (TextOp op : page.footers) {
                    content.append("BT /F1 ").append(op.fontSize()).append(" Tf ")
                            .append(op.x()).append(' ').append(op.y()).append(" Td (")
                            .append(sanitizeAndEscape(op.text())).append(") Tj ET\n");
                }
                byte[] streamBytes = content.toString().getBytes(StandardCharsets.ISO_8859_1);
                int contentId = firstContentId + i;

                offsets.add(position);
                String streamHeader = "%d 0 obj\n<< /Length %d >>\nstream\n".formatted(contentId, streamBytes.length);
                byte[] headerObjBytes = streamHeader.getBytes(StandardCharsets.US_ASCII);
                output.write(headerObjBytes);
                position += headerObjBytes.length;

                output.write(streamBytes);
                position += streamBytes.length;

                byte[] streamFooterBytes = "\nendstream\nendobj\n".getBytes(StandardCharsets.US_ASCII);
                output.write(streamFooterBytes);
                position += streamFooterBytes.length;
            }

            // 5. Font object (Object fontId)
            offsets.add(position);
            String fontObj = "%d 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>\nendobj\n"
                    .formatted(fontId);
            byte[] fontBytes = fontObj.getBytes(StandardCharsets.US_ASCII);
            output.write(fontBytes);
            position += fontBytes.length;

            // 6. Xref table
            int xrefOffset = position;
            StringBuilder xref = new StringBuilder();
            xref.append("xref\n");
            xref.append("0 ").append(offsets.size() + 1).append("\n");
            xref.append("0000000000 65535 f \r\n");
            for (int offset : offsets) {
                xref.append(String.format(Locale.ROOT, "%010d 00000 n \r\n", offset));
            }
            xref.append("trailer\n");
            xref.append("<< /Size ").append(offsets.size() + 1).append(" /Root 1 0 R >>\n");
            xref.append("startxref\n");
            xref.append(xrefOffset).append("\n");
            xref.append("%%EOF\n");

            byte[] xrefBytes = xref.toString().getBytes(StandardCharsets.US_ASCII);
            output.write(xrefBytes);
        }

        private void ensurePage() {
            if (current == null) {
                newPage();
            }
        }

        private String sanitizeAndEscape(String text) {
            if (text == null) {
                return "";
            }
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < text.length(); i++) {
                char ch = text.charAt(i);
                if (ch == '\\') {
                    sb.append("\\\\");
                } else if (ch == '(') {
                    sb.append("\\(");
                } else if (ch == ')') {
                    sb.append("\\)");
                } else if (ch == '\u2013' || ch == '\u2014') { // en-dash, em-dash
                    sb.append('-');
                } else if (ch == '\u2022') { // bullet
                    sb.append('*');
                } else if (ch == '\u2026') { // ellipsis
                    sb.append("...");
                } else if (ch >= 32 && ch <= 126) {
                    sb.append(ch);
                } else if (ch >= 160 && ch <= 255) {
                    // WinAnsi characters (á, à, ã, é, í, ó, ú, ç, etc.)
                    sb.append(ch);
                } else if (ch > 255) {
                    // Normalize standard accents if encoded above 255
                    String norm = java.text.Normalizer.normalize(String.valueOf(ch), java.text.Normalizer.Form.NFD);
                    for (char nch : norm.toCharArray()) {
                        if (nch >= 32 && nch <= 126) {
                            sb.append(nch);
                            break;
                        }
                    }
                }
            }
            return sb.toString();
        }

        private static final class Page {
            private final List<TextOp> content = new ArrayList<>();
            private final List<TextOp> footers = new ArrayList<>();
        }

        private record TextOp(int x, int y, int fontSize, String text) {
        }
    }
}
