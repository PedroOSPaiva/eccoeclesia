package com.ecoeclesia.revenue;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.EnumSet;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

public final class RevenueService {

    private final RevenueRepository repository;

    public RevenueService(RevenueRepository repository) {
        this.repository = Objects.requireNonNull(repository);
    }

    public RevenueEntity registerRevenue(BigDecimal amount, String description) {
        RevenueCategory category = classifyRevenue(description);
        RevenueEntity entity = new RevenueEntity(amount, description, category);
        return repository.save(entity);
    }

    public RevenueEntity registerRevenue(BigDecimal amount, String description, String categoryName) {
        RevenueCategory category = parseCategory(categoryName);
        RevenueEntity entity = new RevenueEntity(amount, description, category);
        return repository.save(entity);
    }

    public List<RevenueEntity> listRevenues(Instant start, Instant end) {
        if (start != null && end != null) {
            return repository.findByPeriod(start, end);
        }
        return repository.findAll();
    }

    public RevenueCategory classifyRevenue(String description) {
        String normalized = description.toLowerCase(Locale.ROOT);
        if (normalized.contains("dizimo") || normalized.contains("dízimo")) {
            return RevenueCategory.TITHES;
        }
        if (normalized.contains("oferta")) {
            return RevenueCategory.OFFERINGS;
        }
        if (normalized.contains("evento") || normalized.contains("retiro")) {
            return RevenueCategory.EVENTS;
        }
        if (normalized.contains("doação") || normalized.contains("doacao")) {
            return RevenueCategory.DONATIONS;
        }
        return RevenueCategory.OTHER;
    }

    private RevenueCategory parseCategory(String categoryName) {
        return EnumSet.allOf(RevenueCategory.class).stream()
                .filter(category -> category.name().equalsIgnoreCase(categoryName))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown revenue category: " + categoryName));
    }
}
