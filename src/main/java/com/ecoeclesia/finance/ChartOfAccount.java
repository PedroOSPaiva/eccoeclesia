package com.ecoeclesia.finance;

import java.util.Objects;

public record ChartOfAccount(String code, String classification, String type, String description, AccountNature nature) {

    public ChartOfAccount {
        Objects.requireNonNull(code, "code");
        Objects.requireNonNull(classification, "classification");
        Objects.requireNonNull(type, "type");
        Objects.requireNonNull(description, "description");
        Objects.requireNonNull(nature, "nature");
    }
}
