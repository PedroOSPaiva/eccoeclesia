# Capabilidades atuais do módulo financeiro

 Este repositório já possui um razão estruturado com plano de contas, importação CSV e gerador de relatório textual. Agora também há API HTTP leve com autenticação por token, repositório JDBC/Postgres e exportação PDF/CSV para quem quiser testar o fluxo completo enquanto o backend oficial não chega.

## O que dá para executar agora

- **Registrar lançamentos com códigos de conta, referência e centro de custo** usando `LedgerService` + `ChartOfAccounts` com os repositórios `InMemoryLedgerRepository`, `FileLedgerRepository`, `DatabaseLedgerRepository` (persistência em arquivo) ou `SqlLedgerRepository` (JDBC/Postgres via `FINANCE_DB_URL`). O plano de contas pré-definido segue o glossário de `docs/chart-of-accounts-glossary.md` e pode ser consumido via `/api/ledger/chart`.
- **Importar extratos CSV** (receitas e despesas) com `FinancialStatementImportService`, que cria lançamentos já validados contra o plano de contas.
- **Consolidar períodos** com `FinancialReportGenerator`, que calcula saldo anterior, agrupamento por contas e saldo final.
- **Emitir relatório textual** via `FinancialReportFormatter` com áreas de assinatura e separador de contas.
- **Gerar PDF/CSV** com cabeçalho institucional via `FinancialReportPdfExporter` (PDF manual, sem libs externas) e `FinancialReportSpreadsheetExporter`, agora com tabela numerada de lançamentos, blocos de centro de custo/saldo e apêndice automático do plano de contas completo.
- **Servir endpoints HTTP** (`FinanceHttpServer`) em `/api/ledger`, `/api/reports/ledger`, `/api/reports/ledger.pdf` e `/api/reports/ledger.csv`, agora com filtros de período (`start`/`end`), protegidos por tokens emitidos em `/api/auth/login` e `/api/auth/refresh`.
- **Cobrir tudo com testes automatizados** já presentes em `src/test/java/com/ecoeclesia/finance/*` (persistência, consolidação e formatação).

## Como experimentar via código

```java
// Exemplo mínimo em um método main
var chart = ChartOfAccounts.defaultPlan();
var repo = new InMemoryLedgerRepository();
var ledger = new LedgerService(chart, repo);

ledger.recordRevenue("1.1", "Ofertas Domingo", "Culto", "REF-001", "100.00");
ledger.recordExpense("2.1", "Energia elétrica", "Manutenção", "REF-002", "60.00");

var report = new FinancialReportGenerator(chart, repo)
        .generateForPeriod(YearMonth.of(2025, 1));
System.out.println(new FinancialReportFormatter().format(report));
```

Para rodar algo parecido sem escrever código, você pode duplicar/adaptar os cenários de teste existentes (por exemplo `FinancialReportGeneratorTest`) ou apontar `FileLedgerRepository` para um caminho temporário e examinar o arquivo gerado.

## Próximos passos recomendados

1. **Persistência em banco**: agora aceita `FINANCE_DB_URL` ou `DATABASE_URL` em formato Postgres, aplica automaticamente o DDL evoluído (colunas de auditoria e índices) e tenta carregar o driver JDBC quando disponível.
2. **API HTTP**: autenticada com o mesmo modelo de usuários/roles do módulo de contas, com seed opcional configurado por `ECOECCLESIA_SEED_USERS`.
3. **Frontend**: tela financeira já filtra por período, mostra totais e usa os endpoints do backend; o próximo passo é apenas alinhar visual final com o design oficial quando estiver pronto.

Enquanto esses itens não chegam, o fluxo interno acima já permite testar a lógica contábil, validar o plano de contas e revisar o layout textual.
