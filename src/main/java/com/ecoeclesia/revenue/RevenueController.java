package com.ecoeclesia.revenue;

import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public final class RevenueController {

    private final RevenueService service;

    public RevenueController(RevenueService service) {
        this.service = Objects.requireNonNull(service);
    }

    public RevenueResponse createRevenue(RevenueRequest request) {
        RevenueEntity entity;
        if (request.category() == null || request.category().isBlank()) {
            entity = service.registerRevenue(request.amount(), request.description());
        } else {
            entity = service.registerRevenue(request.amount(), request.description(), request.category());
        }
        return RevenueResponse.from(entity);
    }

    public List<RevenueResponse> listRevenues(Instant start, Instant end) {
        return service.listRevenues(start, end).stream().map(RevenueResponse::from).collect(Collectors.toList());
    }
}
