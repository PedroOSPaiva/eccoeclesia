package com.ecoeclesia.revenue;

import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;

@RestController
@RequestMapping("/api/revenues")
public class RevenueController {

    private final RevenueService revenueService;

    public RevenueController(RevenueService revenueService) {
        this.revenueService = revenueService;
    }

    @PostMapping
    public ResponseEntity<RevenueResponse> createRevenue(@Valid @RequestBody RevenueRequest request) {
        RevenueDocument document = request.category() == null || request.category().isBlank()
                ? revenueService.registerRevenue(request.amount(), request.description())
                : revenueService.registerRevenue(request.amount(), request.description(), request.category());
        return ResponseEntity.status(HttpStatus.CREATED).body(RevenueResponse.fromDocument(document));
    }

    @GetMapping
    public List<RevenueResponse> listRevenues(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        Instant start = toStartInstant(startDate);
        Instant end = toEndInstant(endDate);
        return revenueService.listRevenues(start, end)
                .stream()
                .map(RevenueResponse::fromDocument)
                .toList();
    }

    @GetMapping("/{id}")
    public RevenueResponse getRevenue(@PathVariable String id) {
        RevenueDocument document = revenueService.getRevenue(id);
        return RevenueResponse.fromDocument(document);
    }

    @PutMapping("/{id}")
    public RevenueResponse updateRevenue(@PathVariable String id, @Valid @RequestBody RevenueRequest request) {
        RevenueDocument document = revenueService.updateRevenue(
                id,
                request.amount(),
                request.description(),
                request.category()
        );
        return RevenueResponse.fromDocument(document);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRevenue(@PathVariable String id) {
        revenueService.deleteRevenue(id);
        return ResponseEntity.noContent().build();
    }

    private Instant toStartInstant(LocalDate date) {
        if (date == null) {
            return null;
        }
        return date.atStartOfDay(ZoneOffset.UTC).toInstant();
    }

    private Instant toEndInstant(LocalDate date) {
        if (date == null) {
            return null;
        }
        return date.plusDays(1).atStartOfDay(ZoneOffset.UTC).toInstant();
    }
}
