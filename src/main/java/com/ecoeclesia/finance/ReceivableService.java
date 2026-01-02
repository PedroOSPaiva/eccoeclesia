package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public final class ReceivableService {

    private final ReceivableRepository repository;

    public ReceivableService(ReceivableRepository repository) {
        this.repository = Objects.requireNonNull(repository);
    }

    public ReceivableEntry create(String description, BigDecimal amount, LocalDate dueDate) {
        validate(description, amount, dueDate);
        ReceivableEntry entry = ReceivableEntry.open(description.trim(), amount, dueDate);
        return repository.save(entry);
    }

    public ReceivableEntry updateStatus(String id, ReceivableStatus status) {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(status, "status");
        return repository.updateStatus(id, status);
    }

    public List<ReceivableEntry> list() {
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
