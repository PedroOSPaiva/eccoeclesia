package com.ecoeclesia.finance;

import java.util.List;

public record StatementImportResult(
        int expensesImported,
        int revenuesImported,
        int skipped,
        List<String> errors
) {
    public StatementImportResult {
        errors = List.copyOf(errors);
    }
}
