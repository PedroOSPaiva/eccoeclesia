package com.ecoeclesia.finance;

import java.util.List;

public interface ReceivableRepository {
    ReceivableEntry save(ReceivableEntry entry);

    ReceivableEntry updateStatus(String id, ReceivableStatus status);

    List<ReceivableEntry> list();
}
