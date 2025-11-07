package com.ecoeclesia.revenue;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.EnumMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class RevenueService {

    private final RevenueRepository revenueRepository;
    private final Map<RevenueCategory, List<String>> classificationRules;

    public RevenueService(RevenueRepository revenueRepository) {
        this.revenueRepository = revenueRepository;
        classificationRules = new EnumMap<>(RevenueCategory.class);
        classificationRules.put(RevenueCategory.TITHES, List.of("dizimo", "dízimo", "tithe"));
        classificationRules.put(RevenueCategory.DONATIONS, List.of("doacao", "doação", "donation"));
        classificationRules.put(RevenueCategory.OFFERINGS, List.of("oferta", "offering"));
        classificationRules.put(RevenueCategory.EVENTS, List.of("evento", "event"));
        classificationRules.put(RevenueCategory.SERVICES, List.of("servico", "serviço", "service", "curso"));
    }

    public RevenueDocument registerRevenue(BigDecimal amount, String description) {
        RevenueCategory category = classifyRevenue(description);
        return saveRevenue(amount, description, category);
    }

    public RevenueDocument registerRevenue(BigDecimal amount, String description, String categoryName) {
        RevenueCategory category = parseCategory(categoryName);
        return saveRevenue(amount, description, category);
    }

    public List<RevenueDocument> listRevenues(Instant start, Instant end) {
        List<RevenueDocument> revenues;
        if (start != null && end != null) {
            revenues = revenueRepository.findAllByCreatedAtBetween(start, end);
        } else if (start != null) {
            revenues = revenueRepository.findAllByCreatedAtAfter(start);
        } else if (end != null) {
            revenues = revenueRepository.findAllByCreatedAtBefore(end);
        } else {
            revenues = revenueRepository.findAll();
        }
        return revenues.stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public RevenueDocument getRevenue(String id) {
        return revenueRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Revenue not found: " + id));
    }

    public RevenueDocument updateRevenue(String id, BigDecimal amount, String description, String categoryName) {
        RevenueDocument existing = getRevenue(id);
        RevenueCategory category = categoryName == null || categoryName.isBlank()
                ? classifyRevenue(description)
                : parseCategory(categoryName);
        existing.setAmount(Objects.requireNonNull(amount, "amount must not be null"));
        existing.setDescription(Objects.requireNonNullElse(description, ""));
        existing.setCategory(category);
        return revenueRepository.save(existing);
    }

    public void deleteRevenue(String id) {
        if (!revenueRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Revenue not found: " + id);
        }
        revenueRepository.deleteById(id);
    }

    public RevenueCategory classifyRevenue(String description) {
        String normalized = normalize(description);
        for (Map.Entry<RevenueCategory, List<String>> entry : classificationRules.entrySet()) {
            for (String keyword : entry.getValue()) {
                if (normalized.contains(keyword)) {
                    return entry.getKey();
                }
            }
        }
        return RevenueCategory.OTHER;
    }

    private RevenueDocument saveRevenue(BigDecimal amount, String description, RevenueCategory category) {
        RevenueDocument document = new RevenueDocument(null,
                Objects.requireNonNull(amount, "amount must not be null"),
                Objects.requireNonNullElse(description, ""),
                Objects.requireNonNull(category, "category must not be null"),
                Instant.now());
        return revenueRepository.save(document);
    }

    private RevenueCategory parseCategory(String categoryName) {
        Objects.requireNonNull(categoryName, "categoryName must not be null");
        try {
            return RevenueCategory.valueOf(categoryName.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoria inválida: " + categoryName, ex);
        }
    }

    private String normalize(String description) {
        return description == null ? "" : description.toLowerCase(Locale.ROOT);
    }
}
