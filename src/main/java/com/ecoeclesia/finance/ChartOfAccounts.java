package com.ecoeclesia.finance;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

public final class ChartOfAccounts {

    private final Map<String, ChartOfAccount> byCode;

    public ChartOfAccounts(Collection<ChartOfAccount> accounts) {
        Objects.requireNonNull(accounts, "accounts");
        this.byCode = new LinkedHashMap<>();
        for (ChartOfAccount account : accounts) {
            byCode.put(account.code(), account);
        }
    }

    public static ChartOfAccounts defaultPlan() {
        return new ChartOfAccounts(List.of(
                new ChartOfAccount("1.1.01", "Dízimos e Ofertas", AccountNature.INCOME),
                new ChartOfAccount("1.1.02", "Doações externas", AccountNature.INCOME),
                new ChartOfAccount("1.1.03", "Eventos e retiros", AccountNature.INCOME),
                new ChartOfAccount("1.1.04", "Vendas e bazares", AccountNature.INCOME),
                new ChartOfAccount("2.1.01", "Manutenção predial e equipamentos", AccountNature.EXPENSE),
                new ChartOfAccount("2.1.02", "Água, luz, internet e utilidades", AccountNature.EXPENSE),
                new ChartOfAccount("2.1.03", "Ação social e caridade", AccountNature.EXPENSE),
                new ChartOfAccount("2.1.04", "Alimentação e cozinha", AccountNature.EXPENSE),
                new ChartOfAccount("2.1.05", "Material litúrgico e pastoral", AccountNature.EXPENSE),
                new ChartOfAccount("2.1.06", "Transporte e deslocamentos", AccountNature.EXPENSE)
        ));
    }

    public Optional<ChartOfAccount> findByCode(String code) {
        return Optional.ofNullable(byCode.get(code));
    }

    public String nameFor(String code) {
        return findByCode(code)
                .map(ChartOfAccount::name)
                .orElse("Conta " + code);
    }

    public void assertMatches(String code, AccountNature expected) {
        ChartOfAccount account = findByCode(code)
                .orElseThrow(() -> new IllegalArgumentException("Conta inexistente: " + code));
        if (account.nature() != expected) {
            throw new IllegalArgumentException("Conta %s não aceita lançamentos do tipo %s".formatted(code, expected));
        }
    }

    public Collection<ChartOfAccount> all() {
        return byCode.values();
    }
}
