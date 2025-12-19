package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

record FinanceLedgerRequest(String type, String accountCode, String description, String amount,
                            String referenceCode, String costCenter, String occurredOn) {

    LedgerEntry toEntry(LedgerService service) {
        BigDecimal value = new BigDecimal(amount);
        LocalDate date = occurredOn == null || occurredOn.isBlank() ? LocalDate.now() : LocalDate.parse(occurredOn);
        if (LedgerEntryType.INCOME.name().equalsIgnoreCase(type)) {
            return service.recordIncome(accountCode, value, description, referenceCode, costCenter, date);
        }
        if (LedgerEntryType.EXPENSE.name().equalsIgnoreCase(type)) {
            return service.recordExpense(accountCode, value, description, referenceCode, costCenter, date);
        }
        throw new IllegalArgumentException("type must be INCOME or EXPENSE");
    }

    static FinanceLedgerRequest parse(String json) {
        Map<String, String> values = FinanceSimpleJsonParser.parse(json);
        return new FinanceLedgerRequest(
                values.getOrDefault("type", ""),
                values.getOrDefault("accountCode", ""),
                values.getOrDefault("description", ""),
                values.getOrDefault("amount", "0"),
                values.getOrDefault("referenceCode", ""),
                values.getOrDefault("costCenter", ""),
                values.getOrDefault("occurredOn", "")
        );
    }
}
