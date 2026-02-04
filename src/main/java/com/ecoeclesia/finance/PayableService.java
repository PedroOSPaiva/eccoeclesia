package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public final class PayableService {

    private final PayableRepository repository;

    public PayableService(PayableRepository repository) {
        this.repository = Objects.requireNonNull(repository);
    }

    public PayableEntry create(String description, BigDecimal amount, LocalDate dueDate,
                               String costCenter, String recurrence, List<String> attachments,
                               String createdBy) {
        validate(description, amount, dueDate);
        PayableEntry entry = PayableEntry.open(description.trim(), amount, dueDate,
                costCenter, recurrence, attachments, createdBy);
        return repository.save(entry);
    }

    public PayableEntry updateStatus(String id, PayableStatus status, String updatedBy) {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(status, "status");
        return repository.updateStatus(id, status, updatedBy);
    }

    public List<PayableEntry> list() {
        return repository.list();
    }

    private void validate(String description, BigDecimal amount, LocalDate dueDate) {
        if (description == null || description.isBlank()) {
            throw new IllegalArgumentException("Descrição é obrigatória");
        }
        if (amount == null || amount.signum() <= 0) {
            throw new IllegalArgumentException("Valor deve ser positivo");
        }
        if (dueDate == null) {
            throw new IllegalArgumentException("Data de vencimento é obrigatória");
        }
    }
}
