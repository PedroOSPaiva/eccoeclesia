package com.ecoeclesia.finance;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

/**
 * Gera um PDF simples (texto) sem dependências externas para espelhar o modelo
 * institucional. O documento contém cabeçalho, resumo, linhas por conta e
 * espaços de assinatura.
 */
public final class FinancialReportPdfExporter {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public byte[] render(FinancialReport report) {
        Objects.requireNonNull(report, "report");
        try {
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            PdfBuilder builder = new PdfBuilder();
            builder.addText(50, 770, "Paróquia EcoEcclesia");
            builder.addText(50, 750, "Demonstrativo Financeiro – " + DATE_FORMAT.format(report.start()) + " a " + DATE_FORMAT.format(report.end()));

            int y = 720;
            builder.addText(50, y, "Saldo anterior: R$ " + money(report.previousBalance()));
            builder.addText(50, y - 15, "Entradas: R$ " + money(report.totalIncome()));
            builder.addText(50, y - 30, "Saídas: R$ " + money(report.totalExpenses()));
            builder.addText(50, y - 45, "Saldo final: R$ " + money(report.closingBalance()));

            y = 660;
            y = writeSection(builder, y, "Receitas", report.incomeLines());
            y = writeSection(builder, y - 10, "Despesas", report.expenseLines());

            int sigY = Math.max(120, y - 40);
            for (ReportSignature signature : report.signatures()) {
                builder.addText(60, sigY, "_____________________________");
                builder.addText(60, sigY - 12, signature.role() + ": " + (signature.name() == null ? "________________" : signature.name()));
                sigY -= 50;
            }

            builder.build(output);
            return output.toByteArray();
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to generate PDF", ex);
        }
    }

    private int writeSection(PdfBuilder builder, int y, String title, List<FinancialReportLine> lines) {
        builder.addText(50, y, title);
        y -= 14;
        for (FinancialReportLine line : lines) {
            builder.addText(60, y, line.accountCode() + " – " + line.accountName());
            builder.addText(60, y - 12, "Total: R$ " + money(line.total()));
            y -= 24;
        }
        return y;
    }

    private String money(BigDecimal value) {
        return value.setScale(2, java.math.RoundingMode.HALF_UP).toPlainString();
    }

    private static final class PdfBuilder {
        private final StringBuilder content = new StringBuilder();

        void addText(int x, int y, String text) {
            content.append("BT /F1 12 Tf ").append(x).append(' ').append(y).append(" Td (")
                    .append(escape(text)).append(") Tj ET\n");
        }

        void build(ByteArrayOutputStream output) throws IOException {
            byte[] stream = content.toString().getBytes(StandardCharsets.UTF_8);
            List<String> objects = List.of(
                    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n",
                    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n",
                    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n",
                    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n",
                    "4 0 obj << /Length " + stream.length + " >> stream\n" + new String(stream, StandardCharsets.UTF_8) + "\nendstream\nendobj\n"
            );

            output.write("%PDF-1.4\n".getBytes(StandardCharsets.UTF_8));
            List<Integer> offsets = new java.util.ArrayList<>();
            int position = "%PDF-1.4\n".length();
            for (String obj : objects) {
                offsets.add(position);
                byte[] data = obj.getBytes(StandardCharsets.UTF_8);
                output.write(data);
                position += data.length;
            }

            int xrefOffset = position;
            StringBuilder xref = new StringBuilder();
            xref.append("xref\n0 6\n");
            xref.append("0000000000 65535 f \n");
            for (int offset : offsets) {
                xref.append(String.format("%010d 00000 n \n", offset));
            }
            output.write(xref.toString().getBytes(StandardCharsets.UTF_8));
            String trailer = "trailer << /Size 6 /Root 1 0 R >>\nstartxref\n" + xrefOffset + "\n%%EOF";
            output.write(trailer.getBytes(StandardCharsets.UTF_8));
        }

        private String escape(String text) {
            return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)");
        }
    }
}
