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
                new ChartOfAccount("1.1.01", "Receitas Ordinárias", "Receita", "Dízimos", AccountNature.INCOME),
                new ChartOfAccount("1.1.02", "Receitas Ordinárias", "Receita", "Ofertas de missa", AccountNature.INCOME),
                new ChartOfAccount("1.1.03", "Receitas Ordinárias", "Receita", "Contribuição mensal de fiéis", AccountNature.INCOME),
                new ChartOfAccount("1.1.04", "Receitas Ordinárias", "Receita", "Campanhas paroquiais", AccountNature.INCOME),
                new ChartOfAccount("1.1.05", "Receitas Ordinárias", "Receita", "Intenções de missa", AccountNature.INCOME),
                new ChartOfAccount("1.1.06", "Receitas Ordinárias", "Receita", "Batizados", AccountNature.INCOME),
                new ChartOfAccount("1.1.07", "Receitas Ordinárias", "Receita", "Casamentos", AccountNature.INCOME),
                new ChartOfAccount("1.1.08", "Receitas Ordinárias", "Receita", "Catequese e inscrições", AccountNature.INCOME),
                new ChartOfAccount("1.1.09", "Receitas Ordinárias", "Receita", "Coletas especiais", AccountNature.INCOME),
                new ChartOfAccount("1.1.10", "Receitas Ordinárias", "Receita", "Doações diversas", AccountNature.INCOME),
                new ChartOfAccount("1.2.01", "Receitas Extraordinárias", "Receita", "Festas, quermesses e bingos", AccountNature.INCOME),
                new ChartOfAccount("1.2.02", "Receitas Extraordinárias", "Receita", "Almoços, jantares e lanches", AccountNature.INCOME),
                new ChartOfAccount("1.2.03", "Receitas Extraordinárias", "Receita", "Eventos e encontros paroquiais", AccountNature.INCOME),
                new ChartOfAccount("1.2.04", "Receitas Extraordinárias", "Receita", "Cursos, formações e retiros", AccountNature.INCOME),
                new ChartOfAccount("1.2.05", "Receitas Extraordinárias", "Receita", "Rifas e bazares", AccountNature.INCOME),
                new ChartOfAccount("1.3.01", "Receitas Patrimoniais", "Receita", "Aluguéis e cessão de uso", AccountNature.INCOME),
                new ChartOfAccount("1.3.02", "Receitas Patrimoniais", "Receita", "Juros e rendimentos", AccountNature.INCOME),
                new ChartOfAccount("1.3.03", "Receitas Patrimoniais", "Receita", "Venda de bens móveis e imóveis", AccountNature.INCOME),
                new ChartOfAccount("1.4.01", "Subvenções e Doações", "Receita", "Subvenções públicas", AccountNature.INCOME),
                new ChartOfAccount("1.4.02", "Subvenções e Doações", "Receita", "Doações de entidades/empresas", AccountNature.INCOME),
                new ChartOfAccount("1.4.03", "Subvenções e Doações", "Receita", "Projetos sociais financiados", AccountNature.INCOME),
                new ChartOfAccount("1.5.01", "Receitas Pastorais", "Receita", "Serviços pastorais (exéquias, bênçãos)", AccountNature.INCOME),
                new ChartOfAccount("1.5.02", "Receitas Pastorais", "Receita", "Materiais e publicações pastorais", AccountNature.INCOME),
                new ChartOfAccount("1.5.03", "Receitas Pastorais", "Receita", "Ofertas direcionadas a pastorais", AccountNature.INCOME),
                new ChartOfAccount("1.6.01", "Receitas de Projetos", "Receita", "Projetos de ação social", AccountNature.INCOME),
                new ChartOfAccount("1.6.02", "Receitas de Projetos", "Receita", "Projetos de juventude e catequese", AccountNature.INCOME),
                new ChartOfAccount("1.6.03", "Receitas de Projetos", "Receita", "Projetos de infraestrutura", AccountNature.INCOME),
                new ChartOfAccount("1.7.01", "Outras Receitas", "Receita", "Indenizações e ressarcimentos", AccountNature.INCOME),
                new ChartOfAccount("1.7.02", "Outras Receitas", "Receita", "Receitas financeiras eventuais", AccountNature.INCOME),
                new ChartOfAccount("1.7.03", "Outras Receitas", "Receita", "Ajustes e estornos", AccountNature.INCOME),

                new ChartOfAccount("2.1.01", "Despesas Administrativas", "Despesa", "Água, luz, internet e utilidades", AccountNature.EXPENSE),
                new ChartOfAccount("2.1.02", "Despesas Administrativas", "Despesa", "Material de escritório e impressos", AccountNature.EXPENSE),
                new ChartOfAccount("2.1.03", "Despesas Administrativas", "Despesa", "Serviços bancários e tarifas", AccountNature.EXPENSE),
                new ChartOfAccount("2.1.04", "Despesas Administrativas", "Despesa", "Licenças, softwares e suporte", AccountNature.EXPENSE),
                new ChartOfAccount("2.1.05", "Despesas Administrativas", "Despesa", "Correios, transporte de valores", AccountNature.EXPENSE),
                new ChartOfAccount("2.2.01", "Despesas com Pessoal", "Despesa", "Salários e pró-labore", AccountNature.EXPENSE),
                new ChartOfAccount("2.2.02", "Despesas com Pessoal", "Despesa", "Encargos sociais e trabalhistas", AccountNature.EXPENSE),
                new ChartOfAccount("2.2.03", "Despesas com Pessoal", "Despesa", "Benefícios (vale, alimentação)", AccountNature.EXPENSE),
                new ChartOfAccount("2.2.04", "Despesas com Pessoal", "Despesa", "Capacitação e formação de equipe", AccountNature.EXPENSE),
                new ChartOfAccount("2.3.01", "Liturgia e Pastoral", "Despesa", "Materiais litúrgicos", AccountNature.EXPENSE),
                new ChartOfAccount("2.3.02", "Liturgia e Pastoral", "Despesa", "Pastoral litúrgica e música", AccountNature.EXPENSE),
                new ChartOfAccount("2.3.03", "Liturgia e Pastoral", "Despesa", "Catequese e evangelização", AccountNature.EXPENSE),
                new ChartOfAccount("2.3.04", "Liturgia e Pastoral", "Despesa", "Comunicação e mídia paroquial", AccountNature.EXPENSE),
                new ChartOfAccount("2.3.05", "Liturgia e Pastoral", "Despesa", "Missões e visitas pastorais", AccountNature.EXPENSE),
                new ChartOfAccount("2.4.01", "Ação Social e Caridade", "Despesa", "Cestas básicas e auxílio direto", AccountNature.EXPENSE),
                new ChartOfAccount("2.4.02", "Ação Social e Caridade", "Despesa", "Projetos sociais e parcerias", AccountNature.EXPENSE),
                new ChartOfAccount("2.4.03", "Ação Social e Caridade", "Despesa", "Campanhas solidárias", AccountNature.EXPENSE),
                new ChartOfAccount("2.5.01", "Manutenção e Infraestrutura", "Despesa", "Manutenção predial e pequenos reparos", AccountNature.EXPENSE),
                new ChartOfAccount("2.5.02", "Manutenção e Infraestrutura", "Despesa", "Limpeza, jardinagem e segurança", AccountNature.EXPENSE),
                new ChartOfAccount("2.5.03", "Manutenção e Infraestrutura", "Despesa", "Equipamentos e mobiliário", AccountNature.EXPENSE),
                new ChartOfAccount("2.5.04", "Manutenção e Infraestrutura", "Despesa", "Seguros de bens e instalações", AccountNature.EXPENSE),
                new ChartOfAccount("2.6.01", "Transportes", "Despesa", "Combustível e deslocamentos pastorais", AccountNature.EXPENSE),
                new ChartOfAccount("2.6.02", "Transportes", "Despesa", "Manutenção de veículos", AccountNature.EXPENSE),
                new ChartOfAccount("2.6.03", "Transportes", "Despesa", "Aluguel de transporte", AccountNature.EXPENSE),
                new ChartOfAccount("2.7.01", "Eventos e Festividades", "Despesa", "Custos de eventos e quermesses", AccountNature.EXPENSE),
                new ChartOfAccount("2.7.02", "Eventos e Festividades", "Despesa", "Alimentos e bebidas para eventos", AccountNature.EXPENSE),
                new ChartOfAccount("2.7.03", "Eventos e Festividades", "Despesa", "Materiais de divulgação de eventos", AccountNature.EXPENSE),
                new ChartOfAccount("2.8.01", "Tributos e Obrigações", "Despesa", "Impostos, taxas e registros", AccountNature.EXPENSE),
                new ChartOfAccount("2.8.02", "Tributos e Obrigações", "Despesa", "Honorários contábeis e jurídicos", AccountNature.EXPENSE),
                new ChartOfAccount("2.8.03", "Tributos e Obrigações", "Despesa", "Licenças, alvarás e documentos", AccountNature.EXPENSE),
                new ChartOfAccount("2.9.01", "Obras e Investimentos", "Despesa", "Construções e reformas", AccountNature.EXPENSE),
                new ChartOfAccount("2.9.02", "Obras e Investimentos", "Despesa", "Projetos e arquitetura", AccountNature.EXPENSE),
                new ChartOfAccount("2.9.03", "Obras e Investimentos", "Despesa", "Equipamentos permanentes", AccountNature.EXPENSE),
                new ChartOfAccount("2.10.01", "Comunicação e Marketing", "Despesa", "Materiais gráficos e anúncios", AccountNature.EXPENSE),
                new ChartOfAccount("2.10.02", "Comunicação e Marketing", "Despesa", "Ferramentas digitais e site", AccountNature.EXPENSE),
                new ChartOfAccount("2.11.01", "Formação e Capacitação", "Despesa", "Formação de lideranças", AccountNature.EXPENSE),
                new ChartOfAccount("2.11.02", "Formação e Capacitação", "Despesa", "Encontros e retiros de formação", AccountNature.EXPENSE),
                new ChartOfAccount("2.12.01", "Saúde e Assistência", "Despesa", "Assistência à saúde e apoio", AccountNature.EXPENSE),
                new ChartOfAccount("2.12.02", "Saúde e Assistência", "Despesa", "Seguro de vida/saúde", AccountNature.EXPENSE)
        ));
    }

    public Optional<ChartOfAccount> findByCode(String code) {
        return Optional.ofNullable(byCode.get(code));
    }

    public String nameFor(String code) {
        return findByCode(code)
                .map(ChartOfAccount::description)
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
