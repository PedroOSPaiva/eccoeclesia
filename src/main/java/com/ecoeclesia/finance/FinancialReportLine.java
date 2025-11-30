package com.ecoeclesia.finance;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

public record FinancialReportLine(String accountCode,
                                  String accountName,
                                  List<String> referenceCodes,
                                  List<String> costCenters,
                                  BigDecimal total) {
    public FinancialReportLine {
        Objects.requireNonNull(accountCode, "accountCode");
        Objects.requireNonNull(accountName, "accountName");
        Objects.requireNonNull(referenceCodes, "referenceCodes");
        Objects.requireNonNull(costCenters, "costCenters");
        Objects.requireNonNull(total, "total");
    }
}
