package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.util.List;

public record CashflowSnapshot(BigDecimal totalPayables, BigDecimal totalReceivables, BigDecimal netBalance,
                               List<PayableEntry> payables, List<ReceivableEntry> receivables) {
}
