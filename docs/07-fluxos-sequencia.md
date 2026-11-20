# Fluxos de Sequência do Sistema (Sequence Diagrams)

## Propósito
Este documento modela os fluxos de execução fim a fim dos casos de uso críticos do **EcoEcclesia** a partir do inventário factual do código, contrastando as vulnerabilidades e comportamentos procedurais atuais (**HOJE**) com a arquitetura protegida e escopada (**ALVO**).

**Data de revisão:** 17 de novembro de 2026  
**Status:** Vigente  

---

## 1. Fluxo de Login, Validação de Sessão e Renovação de Token (JWT)

Mapeia a autenticação inicial (`/api/auth/login`), a consulta de perfil (`/api/auth/me`), a expiração do token de acesso (401) e o ciclo de renovação via refresh token (`/api/auth/refresh`).

```mermaid
sequenceDiagram
    autonumber
    actor User as Usuário
    participant UI as LoginPageComponent / AuthService
    participant Interceptor as ErrorInterceptor (Angular)
    participant Ctrl as AuthController
    participant Svc as AuthTokenService
    participant UserRepo as JdbcUserAccountRepository

    User->>UI: Informa email e senha
    UI->>Ctrl: POST /api/auth/login {email, password}
    Ctrl->>Svc: login(email, password)
    Svc->>UserRepo: findByEmail(email)
    UserRepo-->>Svc: UserAccount (hash senha, roles)
    Svc->>Svc: Valida senha (PasswordHasher.matches)
    Svc-->>Ctrl: AuthTokens (accessToken, refreshToken, role)
    Ctrl-->>UI: 200 OK (AuthTokens)
    UI->>UI: Armazena tokens em storage / Signals

    Note over UI,Ctrl: Validação da Sessão Ativa
    UI->>Ctrl: GET /api/auth/me (Header: Bearer accessToken)
    Ctrl->>Svc: accountFor(authorization)
    Svc-->>Ctrl: UserAccount
    Ctrl-->>UI: 200 OK (UserAccount)

    Note over UI,Ctrl: Cenário de Expiração de Token (Access Token Expirado)
    UI->>Ctrl: GET /api/ledger (Bearer accessToken expirado)
    Ctrl-->>UI: 401 Unauthorized
    UI->>Interceptor: Captura 401 (ErrorInterceptor)
    Interceptor->>Ctrl: POST /api/auth/refresh {refreshToken}
    Ctrl->>Svc: refresh(refreshToken)
    
    alt Refresh Token Válido
        Svc-->>Ctrl: Novos AuthTokens (novo accessToken)
        Ctrl-->>Interceptor: 200 OK (AuthTokens)
        Interceptor->>UI: Atualiza tokens e retenta requisição original
        UI->>Ctrl: GET /api/ledger (Bearer novo accessToken)
        Ctrl-->>UI: 200 OK (List<LedgerEntry>)
    else Refresh Token Expirado ou Inválido
        Svc-->>Ctrl: IllegalArgumentException ("Token inválido")
        Ctrl-->>Interceptor: 400 / 401 Unauthorized
        Interceptor->>UI: logout() e redireciona para /login
    end

    Note over Ctrl,Svc: HOJE: AuthController chama AuthTokenService procedimentalmente.<br/>ALVO: Interceptação padronizada no SecurityFilterChain.
```

---

## 2. Fluxo de Lançamento de Despesa com Entrada Espelho no Razão (Fim a Fim)

Mapeia a criação de despesa via `ExpensesPageComponent` (`POST /api/expenses`), o lançamento espelho no Razão Contábil (`LedgerService`), a validação de dados e o tratamento de erros.

```mermaid
sequenceDiagram
    autonumber
    actor User as Tesoureiro / FINANCE
    participant UI as ExpensesPageComponent
    participant Ctrl as ApiController
    participant Handler as GlobalExceptionHandler
    participant ExpSvc as ExpenseService
    participant ExpRepo as InMemoryExpenseRepository
    participant LedgerSvc as LedgerService
    participant LedgerRepo as SqlLedgerRepository

    User->>UI: Preenche formulário (valor, descrição, categoria)
    UI->>Ctrl: POST /api/expenses {amount, description, category}

    Note over Ctrl: HOJE: Endpoint é 100% PÚBLICO (sem token nem role).<br/>ALVO: Exige @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')") e @Valid.

    alt Payload Inválido (Ex: amount <= 0 ou description vazia)
        Ctrl->>Handler: Lança IllegalArgumentException / MethodArgumentNotValidException
        Handler-->>UI: 400 Bad Request {"error": "Descrição é obrigatória"}
        UI->>User: Exibe notificação Toast amigável
    else Payload Válido e Autorizado
        Ctrl->>ExpSvc: registerExpense(amount, description, category)
        ExpSvc->>ExpRepo: save(ExpenseDocument)
        Note over ExpRepo: HOJE: InMemoryExpenseRepository no AppConfig (volátil).<br/>ALVO: JdbcExpenseRepository grava na tabela expenses com community_id.
        ExpRepo-->>ExpSvc: ExpenseDocument (id, createdAt)
        ExpSvc-->>Ctrl: ExpenseDocument

        Note over Ctrl,LedgerSvc: Sincronização Automática com o Livro Razão (ApiController.java:87)
        Ctrl->>Ctrl: resolveExpenseAccountCode(category) -> ex: "2.1.01"
        Ctrl->>LedgerSvc: recordExpense(accountCode, amount, description, ref, costCenter)
        Note over LedgerSvc: HOJE: costCenter recebe categoria ou "Geral".<br/>ALVO: Recebe community_id formal (Migration V8/V9).
        LedgerSvc->>LedgerRepo: save(LedgerEntry)
        LedgerRepo-->>LedgerSvc: LedgerEntry
        LedgerSvc-->>Ctrl: LedgerEntry

        Ctrl-->>UI: 201 Created (ExpenseResponseDto)
        UI->>User: Toast de sucesso e atualiza tabela de despesas
    end
```

---

## 3. Fluxo de Emissão de Relatórios Contábeis (JSON, PDF e CSV)

Mapeia a geração e exportação de balancetes a partir do `ReportsPageComponent` chamando `ReportApiController` (`/api/reports/ledger`, `.pdf`, `.csv`), destacando a checagem de permissão e formatos suportados.

```mermaid
sequenceDiagram
    autonumber
    actor User as Operador Financeiro (FINANCE ou ADMIN)
    participant UI as ReportsPageComponent
    participant Ctrl as ReportApiController
    participant AuthSvc as AuthTokenService
    participant Gen as FinancialReportGenerator
    participant LedgerRepo as SqlLedgerRepository
    participant Formatter as FinancialReportFormatter
    participant PdfExp as FinancialReportPdfExporter
    participant CsvExp as FinancialReportSpreadsheetExporter

    User->>UI: Seleciona período (start, end) e clica em Visualizar/Download
    
    alt Usuário Sem Permissão finance:read
        UI->>Ctrl: GET /api/reports/ledger?start=...&end=... (Header: Bearer token_invalido)
        Ctrl->>AuthSvc: isAllowed(authorization, "finance:read")
        AuthSvc-->>Ctrl: false
        Note over Ctrl: HOJE: Retorna 401 Unauthorized procedimental.<br/>ALVO: Retorna 403 Forbidden padronizado (@PreAuthorize).
        Ctrl-->>UI: 401 / 403 Forbidden
        UI->>User: Toast "Acesso não autorizado para emissão de relatórios"
    else Usuário Autorizado
        alt Formato Prévia em Tela (JSON)
            UI->>Ctrl: GET /api/reports/ledger?start=...&end=...
            Ctrl->>Gen: generate(startDate, endDate, balance)
            Gen->>LedgerRepo: findByPeriod(startDate, endDate)
            LedgerRepo-->>Gen: List<LedgerEntry>
            Gen-->>Ctrl: FinancialReport (linhas consolidadas por conta)
            Ctrl->>Formatter: render(FinancialReport)
            Formatter-->>Ctrl: String texto prévia
            Ctrl-->>UI: 200 OK {"report": "..."}
            UI->>User: Renderiza prévia textual do balancete
        else Formato Documento Oficial (PDF)
            UI->>Ctrl: GET /api/reports/ledger.pdf?start=...&end=...
            Ctrl->>Gen: generate(startDate, endDate, balance)
            Gen->>LedgerRepo: findByPeriod(startDate, endDate)
            LedgerRepo-->>Gen: List<LedgerEntry>
            Gen-->>Ctrl: FinancialReport
            Ctrl->>PdfExp: render(FinancialReport)
            PdfExp-->>Ctrl: byte[] (PDF binário)
            Ctrl-->>UI: 200 OK (Content-Type: application/pdf)
            UI->>User: Download automático de "relatorio-ledger.pdf"
        else Formato Tabular Planilha (CSV)
            UI->>Ctrl: GET /api/reports/ledger.csv?start=...&end=...
            Ctrl->>Gen: generate(startDate, endDate, balance)
            Gen->>LedgerRepo: findByPeriod(startDate, endDate)
            LedgerRepo-->>Gen: List<LedgerEntry>
            Gen-->>Ctrl: FinancialReport
            Ctrl->>CsvExp: toCsv(FinancialReport)
            CsvExp-->>Ctrl: byte[] (CSV UTF-8)
            Ctrl-->>UI: 200 OK (Content-Type: text/csv)
            UI->>User: Download de "relatorio-ledger.csv"
        end
    end
```

---

## 4. Fluxo de Consulta do Razão com Filtros e Escopo de Comunidade (ALVO)

Mapeia a listagem analítica do Livro Razão (`LedgerPageComponent` / `DashboardPageComponent`) aplicando filtros de período e isolamento por comunidade (`community_id`), diferenciando o escopo restrito de capela da visão consolidada da Matriz.

```mermaid
sequenceDiagram
    autonumber
    actor User as Operador (ADMIN ou FINANCE)
    participant UI as LedgerPageComponent (Angular 18)
    participant Ctrl as LedgerApiController
    participant Svc as LedgerService
    participant Repo as SqlLedgerRepository
    participant DB as PostgreSQL (ledger_entries)

    User->>UI: Seleciona comunidade no Header e define datas (start, end)
    Note over UI: ALVO: Angular lê o Signal activeCommunityId()<br/>e injeta como query param na requisição.
    
    UI->>Ctrl: GET /api/ledger?start=2026-01-01&end=2026-01-31&community_id=UUID (Bearer token)

    Note over Ctrl: HOJE: Backend aceita apenas start e end.<br/>cost_center é texto livre não filtrado na query.<br/>ALVO: Recebe community_id (Migration V8/V9).

    Ctrl->>Ctrl: Valida permissão (@PreAuthorize) e extrai role do token

    alt Role FINANCE / Operador Local (Escopo Obrigatório)
        Note over Ctrl,Svc: Filtra estritamente pelos lançamentos da comunidade vinculada
        Ctrl->>Svc: findByPeriodAndCommunity(start, end, communityId)
        Svc->>Repo: findByPeriodAndCommunity(start, end, communityId)
        Repo->>DB: SELECT * FROM ledger_entries WHERE occurred_on BETWEEN ? AND ? AND community_id = ?
        DB-->>Repo: ResultSet (partidas dobradas da capela)
        Repo-->>Svc: List<LedgerEntry>
        Svc-->>Ctrl: List<LedgerEntry>
    else Role ADMIN (Visão Consolidada Paroquial)
        Note over Ctrl,Svc: Se community_id for omitido/nulo, busca todas as capelas
        Ctrl->>Svc: findByPeriod(start, end)
        Svc->>Repo: findByPeriod(start, end)
        Repo->>DB: SELECT * FROM ledger_entries WHERE occurred_on BETWEEN ? AND ? ORDER BY occurred_on ASC
        DB-->>Repo: ResultSet (todas as capelas + Matriz)
        Repo-->>Svc: List<LedgerEntry>
        Svc-->>Ctrl: List<LedgerEntry>
    end

    Ctrl-->>UI: 200 OK (List<LedgerEntry>)
    UI->>User: Exibe tabela auditável com badge da comunidade e saldo calculado
```

---

## Pendências / A confirmar

1. **Assinatura do JWT com Claim de Comunidade:** Confirmar se o payload do access token emitido pelo `AuthTokenService` deve incluir a claim `community_id` padrão do usuário para evitar passagem redundante de query params.
2. **Fallback da Entrada Espelho de Despesa:** No `ApiController.java:88`, a chamada `ledgerService.recordExpense` está envolvida em bloco `try { ... } catch (Exception ignored) {}`. Confirmar se uma falha no Razão deve realizar rollback transacional (`@Transactional`) da despesa gravada para garantir integridade contábil estrita.
3. **Formato do Retorno de Relatório JSON:** O endpoint `GET /api/reports/ledger` retorna `{ "report": String }` (texto formatado com quebras de linha monoespaçadas). Confirmar se o frontend continuará exibindo em bloco `<pre>` ou se o relatório deve ser estruturado em objeto JSON com nós analíticos de contas e totais.
