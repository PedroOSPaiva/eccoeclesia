package com.ecoeclesia.finance;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

final class FinanceSimpleJsonParser {

    static Map<String, String> parse(String json) {
        String trimmed = json.trim();
        if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
            trimmed = trimmed.substring(1, trimmed.length() - 1);
        }
        List<String> tokens = splitRespectingQuotes(trimmed);
        Map<String, String> values = new HashMap<>();
        for (String token : tokens) {
            String[] kv = token.split(":", 2);
            if (kv.length != 2) continue;
            String key = stripQuotes(kv[0]);
            String value = stripQuotes(kv[1]);
            values.put(key, value);
        }
        return values;
    }

    private static List<String> splitRespectingQuotes(String input) {
        List<String> parts = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;
        for (char ch : input.toCharArray()) {
            if (ch == '"') {
                inQuotes = !inQuotes;
            }
            if (ch == ',' && !inQuotes) {
                parts.add(current.toString());
                current.setLength(0);
            } else {
                current.append(ch);
            }
        }
        if (current.length() > 0) {
            parts.add(current.toString());
        }
        return parts;
    }

    private static String stripQuotes(String token) {
        String trimmed = token.trim();
        if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
            return trimmed.substring(1, trimmed.length() - 1);
        }
        return trimmed;
    }

    private FinanceSimpleJsonParser() {
    }
}
