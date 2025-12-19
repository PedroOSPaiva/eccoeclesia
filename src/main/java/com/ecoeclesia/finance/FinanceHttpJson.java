package com.ecoeclesia.finance;

import java.util.Collection;
import java.util.List;
import java.util.StringJoiner;

final class FinanceHttpJson {

    String ledgerEntries(List<LedgerEntry> entries) {
        StringJoiner joiner = new StringJoiner(",", "{\"items\":[", "]}");
        for (LedgerEntry entry : entries) {
            joiner.add(ledgerEntry(entry));
        }
        return joiner.toString();
    }

    String chart(Collection<ChartOfAccount> accounts) {
        StringJoiner joiner = new StringJoiner(",", "{\"accounts\":[", "]}");
        for (ChartOfAccount account : accounts) {
            joiner.add(new StringBuilder("{")
                    .append("\"code\":\"").append(escape(account.code())).append("\",")
                    .append("\"classification\":\"").append(escape(account.classification())).append("\",")
                    .append("\"type\":\"").append(escape(account.type())).append("\",")
                    .append("\"description\":\"").append(escape(account.description())).append("\",")
                    .append("\"nature\":\"").append(account.nature().name()).append("\"")
                    .append("}").toString());
        }
        return joiner.toString();
    }

    String ledgerEntry(LedgerEntry entry) {
        return new StringBuilder("{")
                .append("\"id\":\"").append(escape(entry.id())).append("\",")
                .append("\"accountCode\":\"").append(escape(entry.accountCode())).append("\",")
                .append("\"referenceCode\":\"").append(escape(entry.referenceCode())).append("\",")
                .append("\"costCenter\":\"").append(escape(entry.costCenter())).append("\",")
                .append("\"description\":\"").append(escape(entry.description())).append("\",")
                .append("\"amount\":\"").append(entry.amount().toPlainString()).append("\",")
                .append("\"type\":\"").append(entry.type().name()).append("\",")
                .append("\"occurredOn\":\"").append(entry.occurredOn()).append("\"")
                .append("}")
                .toString();
    }

    String tokens(AuthTokens tokens) {
        return new StringBuilder("{")
                .append("\"accessToken\":\"").append(escape(tokens.accessToken())).append("\",")
                .append("\"refreshToken\":\"").append(escape(tokens.refreshToken())).append("\",")
                .append("\"tokenType\":\"").append(tokens.tokenType()).append("\",")
                .append("\"role\":\"").append(tokens.role()).append("\",")
                .append("\"permissions\":[")
                .append(String.join(",", tokens.permissions().stream().map(p -> "\"" + escape(p) + "\"").toList()))
                .append("]}")
                .toString();
    }

    String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n");
    }
}
