package com.ecoeclesia.finance;

import java.util.Objects;

public record ChartOfAccount(String code, String name, AccountNature nature) {

    public ChartOfAccount {
        Objects.requireNonNull(code, "code");
        Objects.requireNonNull(name, "name");
        Objects.requireNonNull(nature, "nature");
    }
}
