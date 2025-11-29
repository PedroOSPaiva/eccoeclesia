# Capabilidades atuais do módulo financeiro

 Este repositório já possui um razão estruturado com plano de contas, importação CSV e gerador de relatório textual. Agora também há API HTTP leve com autenticação por token, repositório JDBC/Postgres e exportação PDF/CSV para quem quiser testar o fluxo completo enquanto o backend oficial não chega.

## O que dá para executar agora

- **Registrar lançamentos com códigos de conta, referência e centro de custo** usando `LedgerService` + `ChartOfAccounts` com os repositórios `InMemoryLedgerRepository`, `FileLedgerRepository`, `DatabaseLedgerRepository` (persistência em arquivo) ou `SqlLedgerRepository` (JDBC/Postgres via `FINANCE_DB_URL`).
- **Importar extratos CSV** (receitas e despesas) com `FinancialStatementImportService`, que cria lançamentos já validados contra o plano de contas.
- **Consolidar períodos** com `FinancialReportGenerator`, que calcula saldo anterior, agrupamento por contas e saldo final.
- **Emitir relatório textual** via `FinancialReportFormatter` com áreas de assinatura e separador de contas.
- **Gerar PDF/CSV** com cabeçalho institucional via `FinancialReportPdfExporter` (PDF manual, sem libs externas) e `FinancialReportSpreadsheetExporter`.
- **Servir endpoints HTTP** (`FinanceHttpServer`) em `/api/ledger`, `/api/reports/ledger`, `/api/reports/ledger.pdf` e `/api/reports/ledger.csv`, protegidos por tokens emitidos em `/api/auth/login` e `/api/auth/refresh`.
- **Cobrir tudo com testes automatizados** já presentes em `src/test/java/com/ecoeclesia/finance/*` (persistência, consolidação e formatação).

## Como experimentar via código

```java
// Exemplo mínimo em um método main
var chart = ChartOfAccounts.defaultAccounts();
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

1. **Persistência em banco**: está disponível via JDBC simples, faltando apenas apontar para um Postgres real com as credenciais de produção e, se necessário, evoluir o DDL em `infra/sql/ledger-postgres.sql` para chaves e relacionamentos.
2. **API HTTP**: já autenticada via token; os próximos passos são portar para o stack oficial (Spring/segurança padrão) e trocar o emissor de tokens pelo provedor real.
3. **Frontend**: agora respeita permissões para exibir o módulo Financeiro; resta alinhar o layout final e conectar ao backend oficial assim que ele existir.

Enquanto esses itens não chegam, o fluxo interno acima já permite testar a lógica contábil, validar o plano de contas e revisar o layout textual.
