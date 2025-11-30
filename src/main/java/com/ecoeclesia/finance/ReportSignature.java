package com.ecoeclesia.finance;

import java.util.Objects;

public record ReportSignature(String role, String name) {
    public ReportSignature {
        Objects.requireNonNull(role, "role");
    }
}
