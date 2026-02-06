package com.ecoeclesia.finance;

import com.ecoeclesia.birthday.BirthdayPerson;
import com.ecoeclesia.inventory.ConsumableItem;
import com.ecoeclesia.inventory.DurableItem;
import com.ecoeclesia.inventory.InventoryItem;
import com.ecoeclesia.revenue.RevenueEntity;
import com.ecoeclesia.user.UserAccountResponse;
import com.ecoeclesia.expense.ExpenseDocument;
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


    String passwordResetToken(PasswordResetToken token) {
        return new StringBuilder("{")
                .append("\"status\":\"ok\",")
                .append("\"resetToken\":\"").append(escape(token.token())).append("\",")
                .append("\"expiresAt\":\"").append(escape(token.expiresAt())).append("\"")
                .append("}")
                .toString();
    }

    String tokens(AuthTokens tokens) {
        return new StringBuilder("{")
                .append("\"accessToken\":\"").append(escape(tokens.accessToken())).append("\",")
                .append("\"refreshToken\":\"").append(escape(tokens.refreshToken())).append("\",")
                .append("\"tokenType\":\"").append(tokens.tokenType()).append("\",")
                .append("\"role\":\"").append(tokens.role()).append("\",")
                .append("\"mustChangePassword\":").append(tokens.mustChangePassword()).append(",")
                .append("\"daysUntilPasswordExpiry\":").append(tokens.daysUntilPasswordExpiry()).append(",")
                .append("\"passwordExpiresAt\":\"").append(tokens.passwordExpiresAt()).append("\",")
                .append("\"permissions\":[")
                .append(String.join(",", tokens.permissions().stream().map(p -> "\"" + escape(p) + "\"").toList()))
                .append("]}")
                .toString();
    }

    String birthdays(List<BirthdayPerson> people) {
        StringJoiner joiner = new StringJoiner(",", "[", "]");
        for (BirthdayPerson person : people) {
            joiner.add(birthday(person));
        }
        return joiner.toString();
    }

    String birthday(BirthdayPerson person) {
        return new StringBuilder("{")
                .append("\"id\":\"").append(escape(person.id())).append("\",")
                .append("\"name\":\"").append(escape(person.name())).append("\",")
                .append("\"birthDate\":\"").append(person.birthDate()).append("\",")
                .append("\"ministry\":").append(nullable(person.ministry())).append(",")
                .append("\"contact\":").append(nullable(person.contact()))
                .append("}")
                .toString();
    }

    String users(List<UserAccountResponse> users) {
        StringJoiner joiner = new StringJoiner(",", "{\"items\":[", "]}");
        for (UserAccountResponse user : users) {
            joiner.add(user(user));
        }
        return joiner.toString();
    }

    String user(UserAccountResponse user) {
        return new StringBuilder("{")
                .append("\"id\":\"").append(escape(user.id())).append("\",")
                .append("\"email\":\"").append(escape(user.email())).append("\",")
                .append("\"fullName\":").append(nullable(user.fullName())).append(",")
                .append("\"birthDate\":").append(nullable(user.birthDate())).append(",")
                .append("\"address\":").append(nullable(user.address())).append(",")
                .append("\"photoUrl\":").append(nullable(user.photoUrl())).append(",")
                .append("\"roles\":[")
                .append(String.join(",", user.roles().stream().map(role -> "\"" + escape(role.name()) + "\"").toList()))
                .append("],")
                .append("\"authorities\":[")
                .append(String.join(",", user.authorities().stream().map(value -> "\"" + escape(value) + "\"").toList()))
                .append("],")
                .append("\"updatedAt\":\"").append(user.updatedAt()).append("\"")
                .append("}")
                .toString();
    }

    private String nullable(String value) {
        if (value == null) {
            return "null";
        }
        return "\"" + escape(value) + "\"";
    }

    String payables(List<PayableEntry> entries) {
        StringJoiner joiner = new StringJoiner(",", "{\"items\":[", "]}");
        for (PayableEntry entry : entries) {
            joiner.add(payable(entry));
        }
        return joiner.toString();
    }

    String payable(PayableEntry entry) {
        String attachments = entry.attachments().stream()
                .map(value -> "\"" + escape(value) + "\"")
                .collect(java.util.stream.Collectors.joining(","));
        return new StringBuilder("{")
                .append("\"id\":\"").append(escape(entry.id())).append("\",")
                .append("\"description\":\"").append(escape(entry.description())).append("\",")
                .append("\"amount\":\"").append(entry.amount().toPlainString()).append("\",")
                .append("\"dueDate\":\"").append(entry.dueDate()).append("\",")
                .append("\"costCenter\":").append(nullable(entry.costCenter())).append(",")
                .append("\"recurrence\":").append(nullable(entry.recurrence())).append(",")
                .append("\"attachments\":[").append(attachments).append("],")
                .append("\"status\":\"").append(entry.status().name()).append("\",")
                .append("\"createdAt\":\"").append(entry.createdAt()).append("\",")
                .append("\"createdBy\":").append(nullable(entry.createdBy())).append(",")
                .append("\"updatedAt\":\"").append(entry.updatedAt()).append("\",")
                .append("\"updatedBy\":").append(nullable(entry.updatedBy()))
                .append("}")
                .toString();
    }

    String receivables(List<ReceivableEntry> entries) {
        StringJoiner joiner = new StringJoiner(",", "{\"items\":[", "]}");
        for (ReceivableEntry entry : entries) {
            joiner.add(receivable(entry));
        }
        return joiner.toString();
    }

    String receivable(ReceivableEntry entry) {
        return new StringBuilder("{")
                .append("\"id\":\"").append(escape(entry.id())).append("\",")
                .append("\"description\":\"").append(escape(entry.description())).append("\",")
                .append("\"amount\":\"").append(entry.amount().toPlainString()).append("\",")
                .append("\"dueDate\":\"").append(entry.dueDate()).append("\",")
                .append("\"origin\":").append(nullable(entry.origin())).append(",")
                .append("\"category\":").append(nullable(entry.category())).append(",")
                .append("\"project\":").append(nullable(entry.project())).append(",")
                .append("\"status\":\"").append(entry.status().name()).append("\",")
                .append("\"createdAt\":\"").append(entry.createdAt()).append("\",")
                .append("\"createdBy\":").append(nullable(entry.createdBy())).append(",")
                .append("\"updatedAt\":\"").append(entry.updatedAt()).append("\",")
                .append("\"updatedBy\":").append(nullable(entry.updatedBy()))
                .append("}")
                .toString();
    }

    String cashflow(CashflowSnapshot snapshot) {
        String payables = snapshot.payables().stream()
                .map(this::payable)
                .collect(java.util.stream.Collectors.joining(","));
        String receivables = snapshot.receivables().stream()
                .map(this::receivable)
                .collect(java.util.stream.Collectors.joining(","));
        return new StringBuilder("{")
                .append("\"totalPayables\":\"").append(snapshot.totalPayables().toPlainString()).append("\",")
                .append("\"totalReceivables\":\"").append(snapshot.totalReceivables().toPlainString()).append("\",")
                .append("\"netBalance\":\"").append(snapshot.netBalance().toPlainString()).append("\",")
                .append("\"payables\":[").append(payables).append("],")
                .append("\"receivables\":[").append(receivables).append("]")
                .append("}")
                .toString();
    }

    String expenses(List<ExpenseDocument> expenses) {
        StringJoiner joiner = new StringJoiner(",", "[", "]");
        for (ExpenseDocument expense : expenses) {
            joiner.add(expense(expense));
        }
        return joiner.toString();
    }

    String expense(ExpenseDocument expense) {
        return new StringBuilder("{")
                .append("\"id\":\"").append(escape(expense.getId())).append("\",")
                .append("\"amount\":\"").append(expense.getAmount().toPlainString()).append("\",")
                .append("\"description\":\"").append(escape(expense.getDescription())).append("\",")
                .append("\"category\":\"").append(expense.getCategory().name()).append("\",")
                .append("\"createdAt\":\"").append(expense.getCreatedAt()).append("\"")
                .append("}")
                .toString();
    }

    String revenues(List<RevenueEntity> revenues) {
        StringJoiner joiner = new StringJoiner(",", "[", "]");
        for (RevenueEntity revenue : revenues) {
            joiner.add(revenue(revenue));
        }
        return joiner.toString();
    }

    String revenue(RevenueEntity revenue) {
        return new StringBuilder("{")
                .append("\"id\":\"").append(escape(revenue.id())).append("\",")
                .append("\"amount\":\"").append(revenue.amount().toPlainString()).append("\",")
                .append("\"description\":\"").append(escape(revenue.description())).append("\",")
                .append("\"category\":\"").append(revenue.category().name()).append("\",")
                .append("\"receivedAt\":\"").append(revenue.receivedAt()).append("\"")
                .append("}")
                .toString();
    }

    String inventoryItems(List<InventoryItem> items) {
        StringJoiner joiner = new StringJoiner(",", "[", "]");
        for (InventoryItem item : items) {
            joiner.add(inventoryItem(item));
        }
        return joiner.toString();
    }

    String inventoryItem(InventoryItem item) {
        StringBuilder builder = new StringBuilder("{")
                .append("\"id\":\"").append(escape(item.getId())).append("\",")
                .append("\"name\":\"").append(escape(item.getName())).append("\",")
                .append("\"description\":\"").append(escape(item.getDescription())).append("\",")
                .append("\"quantity\":").append(item.getQuantity()).append(",")
                .append("\"minimumQuantity\":").append(item.getMinimumStock()).append(",")
                .append("\"lastUpdated\":\"").append(item.getLastUpdated()).append("\",");
        if (item instanceof ConsumableItem consumable) {
            builder.append("\"type\":\"CONSUMABLE\",")
                    .append("\"expirationDate\":\"").append(consumable.getExpirationDate()).append("\"");
        } else if (item instanceof DurableItem durable) {
            builder.append("\"type\":\"DURABLE\",")
                    .append("\"warrantyMonths\":").append(durable.getWarrantyMonths());
        } else {
            builder.append("\"type\":\"UNKNOWN\"");
        }
        return builder.append("}").toString();
    }

    String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n");
    }
}
