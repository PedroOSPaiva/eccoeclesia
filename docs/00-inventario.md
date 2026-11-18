# Inventário Factual do Código — EcoEcclesia

## Propósito
Este documento consolida o levantamento exaustivo e factual do código-fonte do **EcoEcclesia**, mapeando tabelas, endpoints, telas, uso de centros de custo, dados pastorais e lacunas arquiteturais.  
Ele serve como a fonte primária de verdade técnica para guiar a modelagem de domínio, segurança e evolução do banco de dados.

**Data de geração:** 17 de novembro de 2026  
**Fonte:** análise estática do repositório em 2026-11-17  

---

### Inventário Factual do Código

| Item | Onde está no código | Evidência (arquivo:linha ou nome) | Observação |
| :--- | :--- | :--- | :--- |
| **Tabela `users`** | Migration Flyway V1 | `V1__initialize_schema.sql:1-5` | Colunas: `id` (UUID PK), `email` (VARCHAR UK), `password` (VARCHAR hash). Sem campos de auditoria (`created_at`). |
| **Tabela `user_roles`** | Migration Flyway V1 | `V1__initialize_schema.sql:7-11` | Colunas: `user_id` (UUID FK), `role` (VARCHAR). Chave composta `(user_id, role)`. |
| **Seed de Usuários Padrão** | Migration Flyway V2 | `V2__insert_default_users.sql:1-57` | Seeds para roles `ADMIN`, `FINANCE` e `VOLUNTEER`. Senha inicial: `Senhainicial123`. |
| **Tabela `expenses`** | Migration Flyway V1 | `V1__initialize_schema.sql:13-19` | Colunas: `id` (UUID PK), `amount` (NUMERIC 19,2), `description`, `category`, `created_at`. Sem vínculo com `cost_center` nem `community_id`. |
| **Tabela `revenues`** | Migration Flyway V1 | `V1__initialize_schema.sql:21-27` | Colunas: `id` (UUID PK), `amount` (NUMERIC 19,2), `description`, `category`, `created_at`. Sem vínculo com dizimista nem comunidade. |
| **Tabela `inventory_items`** | Migration Flyway V1 | `V1__initialize_schema.sql:29-38` | Colunas: `id` (UUID PK), `item_type`, `name`, `description`, `quantity`, `minimum_quantity`, `expiration_date`, `warranty_months`. |
| **Tabela `ledger_entries`** | Inicialização JDBC DDL | `JdbcLedgerGateway.java:33-43` e `infra/sql/ledger-postgres.sql:1-12` | **Não está no Flyway!** DDL executado via `CREATE TABLE IF NOT EXISTS` no gateway. Contém `cost_center VARCHAR(64)`. |
| **Fonte `birthdays`** | Arquivo CSV legado | `data/birthdays.csv:1-6` e `CsvBirthdayRepository.java:13-50` | Arquivo texto com colunas: `id, name, birthDate, ministry, contact`. Não é tabela no PostgreSQL. |
| **Endpoint `POST /api/auth/login`** | `AuthController` | `AuthController.java:27-33` | Público. Autentica e gera `AuthTokens`. |
| **Endpoint `POST /api/auth/refresh`** | `AuthController` | `AuthController.java:35-41` | Público. Renova access token a partir do refresh token. |
| **Endpoint `POST /api/auth/forgot-password`** | `AuthController` | `AuthController.java:43-49` | Público. Gera token de recuperação de senha. |
| **Endpoint `POST /api/auth/reset-password`** | `AuthController` | `AuthController.java:51-61` | Público. Redefine a senha com o token fornecido. |
| **Endpoint `GET /api/auth/me`** | `AuthController` | `AuthController.java:63-70` | Requer header `Authorization`. Valida sessão via `authTokenService.accountFor(header)`. |
| **Endpoint `GET /api/ledger/accounts`** | `LedgerApiController` | `LedgerApiController.java:50-53` | Público. Retorna a listagem do plano de contas contábil padrão. |
| **Endpoint `GET /api/ledger`** | `LedgerApiController` | `LedgerApiController.java:55-70` | Requer `finance:read`. Validação manual via `authTokenService.isAllowed()`. Aceita filtros `start` e `end`. |
| **Endpoint `POST /api/ledger`** | `LedgerApiController` | `LedgerApiController.java:72-132` | Requer `finance:write`. Validação manual de token. Grava no Razão e sincroniza com `revenueService`/`expenseService`. |
| **Endpoint `GET /api/reports/ledger`** | `ReportApiController` | `ReportApiController.java:44-61` | Requer `finance:read` se header estiver presente. Gera prévia formatada em JSON. |
| **Endpoint `GET /api/reports/ledger.pdf`** | `ReportApiController` | `ReportApiController.java:63-83` | Requer `finance:read`. Gera e baixa PDF do balancete/relatório analítico. |
| **Endpoint `GET /api/reports/ledger.csv`** | `ReportApiController` | `ReportApiController.java:85-103` | Requer `finance:read`. Gera e baixa arquivo CSV tabular. |
| **Endpoint `GET /inventory` e `/api/inventory`** | `InventoryApiController` | `InventoryApiController.java:107-118` | Requer `inventory:read` (retorna 403 se falhar). Lista itens do patrimônio/almoxarifado. |
| **Endpoint `GET /inventory/alerts`** | `InventoryApiController` | `InventoryApiController.java:120-131` | Requer `inventory:read`. Lista itens com saldo abaixo do estoque mínimo. |
| **Endpoint `POST /inventory/consumables`** | `InventoryApiController` | `InventoryApiController.java:133-172` | Requer `inventory:write` (retorna 403 se falhar). Cadastra item de consumo. |
| **Endpoint `POST /inventory/durables`** | `InventoryApiController` | `InventoryApiController.java:174-204` | Requer `inventory:write` (retorna 403 se falhar). Cadastra bem durável patrimonial. |
| **Endpoint `POST /inventory/{type}/{id}/entries`** | `InventoryApiController` | `InventoryApiController.java:206-216` | **Sem verificação de role/token.** Registra entrada de estoque. |
| **Endpoint `POST /inventory/{type}/{id}/exits`** | `InventoryApiController` | `InventoryApiController.java:218-228` | **Sem verificação de role/token.** Registra saída de estoque. |
| **Endpoint `GET /api/birthdays`** | `BirthdayApiController` | `BirthdayApiController.java:29-32` | **Público (sem auth).** Retorna aniversariantes ordenados por proximidade. |
| **Endpoint `POST /api/birthdays`** | `BirthdayApiController` | `BirthdayApiController.java:34-61` | **Público (sem auth).** Registra novo aniversariante gravando no CSV. |
| **Endpoint `GET /api/expenses`** | `ApiController` | `ApiController.java:55-60` | **Público (sem auth).** Lista despesas do repositório em memória. |
| **Endpoint `POST /api/expenses`** | `ApiController` | `ApiController.java:62-92` | **Público (sem auth).** Cria despesa e repassa para `ledgerService.recordExpense` com `costCenter` = "Geral". |
| **Endpoint `DELETE /api/expenses/{id}`** | `ApiController` | `ApiController.java:94-98` | **Público (sem auth).** Exclui despesa em memória. |
| **Endpoint `GET /api/revenues`** | `ApiController` | `ApiController.java:124-139` | **Público (sem auth).** Lista receitas com filtro opcional de período. |
| **Endpoint `POST /api/revenues`** | `ApiController` | `ApiController.java:141-171` | **Público (sem auth).** Cria receita e sincroniza no Razão com `costCenter` = "Geral". |
| **Endpoint `DELETE /api/revenues/{id}`** | `ApiController` | `ApiController.java:173-177` | **Público (sem auth).** Exclui receita em memória. |
| **Tela / Rota `/login`** | `LoginPageComponent` | `app.routes.ts:18-22` e `login-page.component.ts` | Standalone. Formulário de login (e-mail e senha). |
| **Tela / Rota `/forgot-password`** | `ForgotPasswordPageComponent` | `app.routes.ts:24-27` e `forgot-password-page.component.ts` | Standalone. Solicitação de recuperação de senha por e-mail. |
| **Tela / Rota `/reset-password`** | `PasswordResetPageComponent` | `app.routes.ts:29-32` e `password-reset-page.component.ts` | Standalone. Redefinição com token e nova senha. |
| **Tela / Rota `/dashboard`** | `DashboardPageComponent` | `app.routes.ts:41-45` e `dashboard-page.component.ts` | Standalone (`authGuard`). Resumo contábil, gráficos Donut SVG e modal de lançamento. |
| **Tela / Rota `/ledger`** | `LedgerPageComponent` | `app.routes.ts:47-51` e `ledger-page.component.ts` | Standalone (`authGuard`). Tabela de auditoria do Razão, filtros e novo lançamento. |
| **Tela / Rota `/reports`** | `ReportsPageComponent` | `app.routes.ts:53-57` e `reports-page.component.ts` | Standalone (`authGuard`). Painel de emissão e download de PDF e CSV. |
| **Tela / Rota `/expenses`** | `ExpensesPageComponent` | `app.routes.ts:59-63` e `expenses-page.component.ts` | Standalone (`authGuard`). Listagem e cadastro de despesas. |
| **Tela / Rota `/revenues`** | `RevenuesPageComponent` | `app.routes.ts:65-69` e `revenues-page.component.ts` | Standalone (`authGuard`). Listagem e cadastro de receitas/dízimos. |
| **Tela / Rota `/inventory`** | `InventoryPageComponent` | `app.routes.ts:71-75` e `inventory-page.component.ts` | Standalone (`authGuard`). Gestão de bens duráveis e almoxarifado com alertas. |
| **Tela / Rota `/birthdays`** | `BirthdaysPageComponent` | `app.routes.ts:77-81` e `birthdays-page.component.ts` | Standalone (`authGuard`). Aniversariantes com destaque para "Hoje" e próximos 7 dias. |
| **Tela / Rota `/users`** | `UsersPageComponent` | `app.routes.ts:83-87` e `users-page.component.ts` | Standalone (`authGuard`). Gestão de contas e papéis. **(Endpoint backend 404)**. |
| **Tela / Rota `/about` e `/sobre`** | `AboutPageComponent` | `app.routes.ts:89-97` e `about-page.component.ts` | Standalone (Público). História, padroeiro Dom Bosco, In Memoriam e agradecimentos. |
| **Componente `DomBosquinhoState`** | `DomBosquinhoStateComponent` | `dom-bosquinho-state.component.ts:1-240` | Standalone compartilhado. Mascote São João Bosco em SVG para feedback de erro e loading. |
| **Componente `FinanceChart`** | `FinanceChartComponent` | `finance-chart.component.ts:1-170` | Standalone compartilhado. Gráfico Donut em SVG puro (Receitas vs Despesas). |
| **Componente `ToastContainer`** | `ToastContainerComponent` | `toast-container.component.ts:1-105` | Standalone compartilhado. Notificações flutuantes disparadas pelo `ToastService`. |
| **Uso de `cost_center` (SQL DDL)** | Banco de Dados | `infra/sql/ledger-postgres.sql:5` e `JdbcLedgerGateway.java:37` | Coluna `cost_center VARCHAR(64)` em `ledger_entries` (sem foreign key). |
| **Uso de `cost_center` (Gateway/Repo)** | Backend Finance | `JdbcLedgerGateway.java:55,58,64,111` | Gravado e recuperado como `String` no banco de dados. |
| **Uso de `cost_center` (Entidade)** | Backend Finance | `LedgerEntry.java:10,20` | Campo do record: `String costCenter`. |
| **Uso de `cost_center` (Service)** | Backend Finance | `LedgerService.java:25,29,33,38,42,46` | Argumento de `recordIncome` e `recordExpense`. Sanitizado para evitar nulo. |
| **Uso de `cost_center` (Controller)** | Backend API | `LedgerApiController.java:46,108,120` | Recebido no payload JSON e repassado ao `LedgerService`. |
| **Uso de `cost_center` (Relatórios)** | Backend Finance | `FinancialReportGenerator.java:68-69` e `FinancialReportPdfExporter.java:87,116` | Agrupado e impresso como texto nos relatórios e no PDF. |
| **Uso de `cost_center` (Model TS)** | Frontend Core | `ledger.model.ts:7,17` | Propriedade `costCenter: string` nas interfaces TypeScript. |
| **Uso de `cost_center` (Dashboard UI)** | Frontend Pages | `dashboard-page.component.ts:49,103` e `dashboard-page.component.html:91,251` | Campo de formulário (default `'Geral'`) e coluna da tabela de lançamentos. |
| **Uso de `cost_center` (Razão UI)** | Frontend Pages | `ledger-page.component.ts:95,209,322,331` | Campo no form, coluna na tabela e filtro na busca rápida por texto. |
| **Conceito de Aniversariante (Armazenamento)** | Backend Birthday | `data/birthdays.csv:1-6` | Armazenado em disco como CSV (`id,name,birthDate,ministry,contact`). |
| **Conceito de Aniversariante (Entidade)** | Backend Birthday | `BirthdayPerson.java:10-21` | Record imutável: `(id, name, birthDate, ministry, contact)`. |
| **Conceito de Aniversariante (Regra/Cálculo)** | Backend Birthday | `BirthdayService.java:31-68` | Ordena aniversariantes calculando `daysUntilBirthday` e próxima data em relação a um `Clock`. |
| **Conceito de Aniversariante (Consulta HTTP)** | Backend API | `BirthdayApiController.java:29-32` | Rota `GET /api/birthdays` retorna `List<BirthdaySummary>`. |
| **Conceito de Aniversariante (Frontend Service)** | Frontend Core | `birthday.service.ts:17-18` | Signal computado `thisMonthBirthdays` filtra itens com `daysUntilBirthday <= 30`. |
| **Conceito de Aniversariante (Frontend Tela)** | Frontend Pages | `birthdays-page.component.ts:116-134` | Tabela com badges visuais: `Hoje!`, `Em X dia(s)` e formulário de cadastro. |
| **Anotação `@PreAuthorize`** | Backend Security | **Totalmente ausente em todo o projeto** | Nenhuma rota utiliza Spring Security method security. |
| **Anotação `@Valid`** | Backend Validation | **Totalmente ausente em todo o projeto** | Nenhum `@RequestBody` utiliza `@Valid` ou Bean Validation (`jakarta.validation.*`). |
| **Anotação `@ControllerAdvice`** | Backend API | `GlobalExceptionHandler.java:11` | Anotado com `@RestControllerAdvice`. Trata `IllegalArgumentException`, `MethodArgumentNotValidException` e `Exception`. |
| **Auditoria (`@CreatedDate`, `@CreatedBy`)** | Backend Persistence | **Totalmente ausente em todo o projeto** | Não há Spring Data Auditing. Tabelas `users`, `user_roles` e `inventory_items` não têm data de criação. Nenhuma tabela tem `created_by` ou `updated_by`. |

---

### Lacunas Óbvias (O que não foi encontrado no código)

1. **Rota `/api/users` não implementada no Spring Boot:**
   * O frontend Angular possui a tela `/users` e o serviço `user.service.ts` chamando `GET/POST /api/users`.
   * No backend, essa rota existia apenas no `FinanceHttpServer.java` (servidor HTTP embutido legado que não sobe no Spring). No Spring MVC (`com.ecoeclesia.api`), **não existe um `UserApiController`**. A rota retorna `404` se acessada no Spring Boot.
2. **Tabela `ledger_entries` fora do Flyway:**
   * O Flyway possui apenas `V1__initialize_schema.sql` e `V2__insert_default_users.sql`. A tabela `ledger_entries` depende de execução DDL em tempo de execução via `JdbcLedgerGateway.java:33-43` ou do arquivo solto `infra/sql/ledger-postgres.sql`.
3. **Persistência de Despesas e Receitas ainda em memória no `AppConfig`:**
   * Embora o Flyway V1 crie as tabelas `expenses` e `revenues` no PostgreSQL, o `AppConfig.java:35,46` ainda injeta `InMemoryExpenseRepository` e `InMemoryRevenueRepository`. Os dados de despesas e receitas criados via `ApiController` são perdidos se o backend for reiniciado.
4. **Ausência de autorização em endpoints de modificação:**
   * `ApiController.java` (`POST /api/expenses`, `DELETE /api/expenses/{id}`, `POST /api/revenues`, `DELETE /api/revenues/{id}`) é 100% público e não valida tokens.
   * `BirthdayApiController.java` (`POST /api/birthdays`) é 100% público.
   * `InventoryApiController.java` (`POST /inventory/{type}/{id}/entries` e `/exits`) não possui checagem de autorização.
5. **Inconsistência de Segurança (401 vs 403):**
   * `LedgerApiController` retorna `401 Unauthorized` quando o token não possui a permissão requerida.
   * `InventoryApiController` retorna `403 Forbidden` sob a mesma circunstância.
6. **Falta de validação declarativa (`@Valid`):**
   * Todas as validações são feitas manualmente com `if (request == null) throw new IllegalArgumentException(...)`, gerando código redundante e propenso a campos esquecidos.
7. **Ausência de chave estrangeira entre `expenses`/`revenues` e `ledger_entries`:**
   * Quando uma despesa é criada em `ApiController.java:87`, o sistema tenta criar uma entrada espelho no Razão chamando `ledgerService.recordExpense()`. No entanto, não há ID cruzado persistido no banco ligando a despesa ao lançamento contábil.
8. **Inexistência de `communities` e `members` no banco:**
   * Não existe nenhuma tabela, model ou repositório para `communities`, `members` ou `stewards` no código atual. O escopo geográfico/administrativo é 100% sustentado pelo campo de texto livre `cost_center` em `ledger_entries`.
