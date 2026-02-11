package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public final class CashflowService {

    private final PayableService payableService;
    private final ReceivableService receivableService;

    public CashflowService(PayableService payableService, ReceivableService receivableService) {
        this.payableService = Objects.requireNonNull(payableService);
        this.receivableService = Objects.requireNonNull(receivableService);
    }

    public CashflowSnapshot snapshot(LocalDate start, LocalDate end,
                                     PayableStatus payableStatus, ReceivableStatus receivableStatus,
                                     String costCenter) {
        List<PayableEntry> payables = payableService.list().stream()
                .filter(entry -> payableStatus == null || entry.status() == payableStatus)
                .filter(entry -> costCenter == null
                        || (entry.costCenter() != null && costCenter.equalsIgnoreCase(entry.costCenter())))
                .filter(entry -> start == null || !entry.dueDate().isBefore(start))
                .filter(entry -> end == null || !entry.dueDate().isAfter(end))
                .toList();
        List<ReceivableEntry> receivables = receivableService.list().stream()
                .filter(entry -> receivableStatus == null || entry.status() == receivableStatus)
                .filter(entry -> start == null || !entry.dueDate().isBefore(start))
                .filter(entry -> end == null || !entry.dueDate().isAfter(end))
                .toList();

        BigDecimal totalPayables = payables.stream()
                .map(PayableEntry::amount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalReceivables = receivables.stream()
                .map(ReceivableEntry::amount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal netBalance = totalReceivables.subtract(totalPayables);

        return new CashflowSnapshot(totalPayables, totalReceivables, netBalance, payables, receivables);
    }
}
