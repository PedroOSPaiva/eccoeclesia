package com.ecoeclesia.finance;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class InMemoryPayableRepository implements PayableRepository {

    private final Map<String, PayableEntry> storage = new LinkedHashMap<>();

    @Override
    public PayableEntry save(PayableEntry entry) {
        storage.put(entry.id(), entry);
        return entry;
    }

    @Override
    public PayableEntry updateStatus(String id, PayableStatus status) {
        PayableEntry entry = storage.get(id);
        if (entry == null) {
            throw new IllegalArgumentException("Payable not found: " + id);
        }
        PayableEntry updated = entry.withStatus(status);
        storage.put(id, updated);
        return updated;
    }

    @Override
    public List<PayableEntry> list() {
        return new ArrayList<>(storage.values());
    }
}
