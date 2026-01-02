package com.ecoeclesia.finance;

import java.util.List;

public interface PayableRepository {
    PayableEntry save(PayableEntry entry);

    PayableEntry updateStatus(String id, PayableStatus status);

    List<PayableEntry> list();
}
