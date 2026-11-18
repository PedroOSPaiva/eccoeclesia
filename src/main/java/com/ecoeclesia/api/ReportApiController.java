package com.ecoeclesia.api;

import com.ecoeclesia.finance.AuthTokenService;
import com.ecoeclesia.finance.FinancialReport;
import com.ecoeclesia.finance.FinancialReportFormatter;
import com.ecoeclesia.finance.FinancialReportGenerator;
import com.ecoeclesia.finance.FinancialReportPdfExporter;
import com.ecoeclesia.finance.FinancialReportSpreadsheetExporter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportApiController {

    private final FinancialReportGenerator reportGenerator;
    private final FinancialReportFormatter reportFormatter;
    private final FinancialReportPdfExporter pdfExporter;
    private final FinancialReportSpreadsheetExporter spreadsheetExporter;
    private final AuthTokenService authTokenService;

    public ReportApiController(
            FinancialReportGenerator reportGenerator,
            FinancialReportFormatter reportFormatter,
            FinancialReportPdfExporter pdfExporter,
            FinancialReportSpreadsheetExporter spreadsheetExporter,
            AuthTokenService authTokenService
    ) {
        this.reportGenerator = reportGenerator;
        this.reportFormatter = reportFormatter;
        this.pdfExporter = pdfExporter;
        this.spreadsheetExporter = spreadsheetExporter;
        this.authTokenService = authTokenService;
    }

    @GetMapping("/ledger")
    public ResponseEntity<Map<String, String>> getLedgerReport(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end
    ) {
        if (authorization != null && !authorization.isBlank() && !authTokenService.isAllowed(authorization, "finance:read")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        LocalDate startDate = parseDate(start, LocalDate.now().withDayOfMonth(1));
        LocalDate endDate = parseDate(end, LocalDate.now());

        FinancialReport report = reportGenerator.generate(startDate, endDate, BigDecimal.ZERO);
        String formatted = reportFormatter.render(report);

        return ResponseEntity.ok(Map.of("report", formatted));
    }

    @GetMapping("/ledger.pdf")
    public ResponseEntity<byte[]> downloadLedgerPdf(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end
    ) {
        if (authorization != null && !authorization.isBlank() && !authTokenService.isAllowed(authorization, "finance:read")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        LocalDate startDate = parseDate(start, LocalDate.now().withDayOfMonth(1));
        LocalDate endDate = parseDate(end, LocalDate.now());

        FinancialReport report = reportGenerator.generate(startDate, endDate, BigDecimal.ZERO);
        byte[] pdf = pdfExporter.render(report);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"relatorio-ledger.pdf\"")
                .body(pdf);
    }

    @GetMapping("/ledger.csv")
    public ResponseEntity<byte[]> downloadLedgerCsv(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end
    ) {
        if (authorization != null && !authorization.isBlank() && !authTokenService.isAllowed(authorization, "finance:read")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        LocalDate startDate = parseDate(start, LocalDate.now().withDayOfMonth(1));
        LocalDate endDate = parseDate(end, LocalDate.now());

        FinancialReport report = reportGenerator.generate(startDate, endDate, BigDecimal.ZERO);
        String csv = spreadsheetExporter.toCsv(report);
        byte[] data = csv.getBytes(StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("text/csv; charset=utf-8"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"relatorio-ledger.csv\"")
                .body(data);
    }

    private LocalDate parseDate(String value, LocalDate fallback) {
        if (value == null || value.isBlank()) {
            return fallback;
        }
        try {
            return LocalDate.parse(value.trim());
        } catch (Exception ex) {
            return fallback;
        }
    }
}
