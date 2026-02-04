package com.ecoeclesia.finance;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class InMemoryReceivableRepository implements ReceivableRepository {

    private final Map<String, ReceivableEntry> storage = new LinkedHashMap<>();

    @Override
    public ReceivableEntry save(ReceivableEntry entry) {
        storage.put(entry.id(), entry);
        return entry;
    }

    @Override
    public ReceivableEntry updateStatus(String id, ReceivableStatus status, String updatedBy) {
        ReceivableEntry entry = storage.get(id);
        if (entry == null) {
            throw new IllegalArgumentException("Receivable not found: " + id);
        }
        ReceivableEntry updated = entry.withStatus(status, updatedBy);
        storage.put(id, updated);
        return updated;
    }

    @Override
    public List<ReceivableEntry> list() {
        return new ArrayList<>(storage.values());
    }
}
