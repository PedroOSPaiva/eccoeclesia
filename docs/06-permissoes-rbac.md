# Matriz de Permissões RBAC e Segurança de Endpoints

## Propósito
Este documento mapeia o controle de acesso baseado em papéis (RBAC) do **EcoEcclesia**, confrontando o estado factual das rotas do inventário com o modelo alvo protegido declarativamente via Spring Security (`@PreAuthorize`).

**Data de revisão:** 17 de novembro de 2026  
**Status:** Vigente  

---

## 1. Matriz Role × Recurso × Ação (Atual vs. Alvo)

| Recurso | Ação | Papel `ADMIN` | Papel `FINANCE` | Papel `VOLUNTEER` | Anônimo (Sem Token) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth** | Login / Refresh / Reset | Atual: Público<br/>Alvo: Permitido | Atual: Público<br/>Alvo: Permitido | Atual: Público<br/>Alvo: Permitido | Atual: Público<br/>Alvo: Permitido |
| **Auth** | Obter Usuário (`/me`) | Atual: Manual<br/>Alvo: Permitido | Atual: Manual<br/>Alvo: Permitido | Atual: Manual<br/>Alvo: Permitido | Atual: Negado (400/401)<br/>Alvo: Negado (401) |
| **Users** | Listar / Criar Usuários | Atual: **Ausente (404)**<br/>Alvo: Permitido | Atual: **Ausente (404)**<br/>Alvo: Negado (403) | Atual: **Ausente (404)**<br/>Alvo: Negado (403) | Atual: **Ausente (404)**<br/>Alvo: Negado (401) |
| **Razão** | Listar Lançamentos (`GET`) | Atual: Manual (OK)<br/>Alvo: Permitido | Atual: Manual (OK)<br/>Alvo: Permitido | Atual: Manual (401)<br/>Alvo: Negado (403) | Atual: Manual (401)<br/>Alvo: Negado (401) |
| **Razão** | Criar Partida (`POST`) | Atual: Manual (OK)<br/>Alvo: Permitido | Atual: Manual (OK)<br/>Alvo: Permitido | Atual: Manual (401)<br/>Alvo: Negado (403) | Atual: Manual (401)<br/>Alvo: Negado (401) |
| **Relatórios** | Balancetes PDF/CSV | Atual: Manual (OK)<br/>Alvo: Permitido | Atual: Manual (OK)<br/>Alvo: Permitido | Atual: Manual (401)<br/>Alvo: Negado (403) | Atual: Manual (401)<br/>Alvo: Negado (401) |
| **Despesas** | Consultar / Deletar | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Negado (403) | Atual: **Público (Brecha)**<br/>Alvo: Negado (401) |
| **Despesas** | Criar Despesa | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Negado (403) | Atual: **Público (Brecha)**<br/>Alvo: Negado (401) |
| **Receitas** | Consultar / Deletar | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Negado (403) | Atual: **Público (Brecha)**<br/>Alvo: Negado (401) |
| **Receitas** | Criar Receita / Dízimo | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Negado (403) | Atual: **Público (Brecha)**<br/>Alvo: Negado (401) |
| **Inventário** | Consultar Itens e Alertas | Atual: Manual (OK)<br/>Alvo: Permitido | Atual: Manual (OK)<br/>Alvo: Permitido | Atual: Manual (OK)<br/>Alvo: Permitido | Atual: Manual (403)<br/>Alvo: Negado (401) |
| **Inventário** | Cadastrar Itens | Atual: Manual (OK)<br/>Alvo: Permitido | Atual: Manual (403)<br/>Alvo: Negado (403) | Atual: Manual (403)<br/>Alvo: Permitido (ou 403) | Atual: Manual (403)<br/>Alvo: Negado (401) |
| **Inventário** | Registrar Entrada / Saída | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público (Brecha)**<br/>Alvo: Negado (401) |
| **Pastoral** | Consultar Aniversários | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Negado (401) |
| **Pastoral** | Cadastrar Aniversariante | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público**<br/>Alvo: Negado (403) | Atual: **Público**<br/>Alvo: Permitido | Atual: **Público (Brecha)**<br/>Alvo: Negado (401) |

---

## 2. Inconsistências Críticas Identificadas no Código Atual

1. **Divergência de Status de Permissão (401 vs. 403):**
   * Em `LedgerApiController.java:62,78`, requisições com token válido mas sem role suficiente retornam `401 UNAUTHORIZED`.
   * Em `InventoryApiController.java:112,125,139,180`, requisições sob a mesma condição retornam `403 FORBIDDEN` (comportamento HTTP semanticamente correto).
2. **Endpoints de Escrita Críticos Totalmente Abertos ao Público:**
   * `ApiController.java:62,94` (`POST /api/expenses`, `DELETE /api/expenses/{id}`): qualquer cliente sem token consegue inserir e excluir despesas financeiras.
   * `ApiController.java:141,173` (`POST /api/revenues`, `DELETE /api/revenues/{id}`): qualquer cliente sem token consegue inserir e excluir receitas/dízimos.
   * `BirthdayApiController.java:34` (`POST /api/birthdays`): sem autenticação para inclusão de novos registros.
   * `InventoryApiController.java:206,218` (`POST /inventory/.../entries` e `/exits`): sem autenticação para movimentação de estoque.
3. **Lacuna Estrutural do Módulo de Usuários:**
   * A rota `/api/users` chamada pelo Angular (`user.service.ts`) não foi implementada sob o Spring Boot (`404 Not Found`).

---

## 3. Mapeamento de `@PreAuthorize` Proposto para Cada Endpoint

| Método + Path | Controller | Anotação `@PreAuthorize` Alvo | Justificativa de Domínio |
| :--- | :--- | :--- | :--- |
| `POST /api/auth/login` | `AuthController` | `@PermitAll` | Endpoint aberto para autenticação inicial. |
| `POST /api/auth/refresh` | `AuthController` | `@PermitAll` | Renovação de sessão expirada. |
| `POST /api/auth/forgot-password` | `AuthController` | `@PermitAll` | Recuperação pública de acesso. |
| `POST /api/auth/reset-password` | `AuthController` | `@PermitAll` | Definição de nova credencial com token. |
| `GET /api/auth/me` | `AuthController` | `@PreAuthorize("isAuthenticated()")` | Leitura do perfil e permissões do usuário logado. |
| `GET /api/users` | `UserApiController` (Novo) | `@PreAuthorize("hasRole('ADMIN')")` | Apenas pároco/administrador visualiza usuários. |
| `POST /api/users` | `UserApiController` (Novo) | `@PreAuthorize("hasRole('ADMIN')")` | Criação de novos operadores e atribuição de roles. |
| `GET /api/ledger/accounts` | `LedgerApiController` | `@PreAuthorize("isAuthenticated()")` | Leitura do catálogo do plano de contas contábil. |
| `GET /api/ledger` | `LedgerApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | Auditoria analítica das partidas contábeis. |
| `POST /api/ledger` | `LedgerApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | Escrituração de débitos e créditos no Razão. |
| `GET /api/reports/ledger` | `ReportApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | Acesso aos demonstrativos e balancetes da paróquia. |
| `GET /api/reports/ledger.pdf` | `ReportApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | Emissão de relatórios fiscais oficiais. |
| `GET /api/reports/ledger.csv` | `ReportApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | Exportação de balancetes para contabilidade externa. |
| `GET /inventory`, `/alerts` | `InventoryApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE', 'VOLUNTEER')")` | Consulta de estoque e conferência física de bens. |
| `POST /inventory/consumables` | `InventoryApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'VOLUNTEER')")` | Entrada e gestão de materiais litúrgicos e consumo. |
| `POST /inventory/durables` | `InventoryApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | Gestão de patrimônio permanente da igreja. |
| `POST /inventory/.../entries` | `InventoryApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'VOLUNTEER')")` | Ajuste de entrada de estoque no almoxarifado. |
| `POST /inventory/.../exits` | `InventoryApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'VOLUNTEER')")` | Baixa de consumo para celebrações e eventos. |
| `GET /api/birthdays` | `BirthdayApiController` | `@PreAuthorize("isAuthenticated()")` | Consulta de comemorações da comunidade pastoral. |
| `POST /api/birthdays` | `BirthdayApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'VOLUNTEER')")` | Inclusão pastoral de fiéis e agentes de pastorais. |
| `GET /api/expenses` | `ApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | Consulta do fluxo de despesas e comprovantes. |
| `POST /api/expenses` | `ApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | Registro de pagamentos e despesas paroquiais. |
| `DELETE /api/expenses/{id}` | `ApiController` | `@PreAuthorize("hasRole('ADMIN')")` | Estorno ou cancelamento de despesa extraordinária. |
| `GET /api/revenues` | `ApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | Consulta de dízimos arrecadados e coletas. |
| `POST /api/revenues` | `ApiController` | `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | Lançamento de arrecadações e doações comunitárias. |
| `DELETE /api/revenues/{id}` | `ApiController` | `@PreAuthorize("hasRole('ADMIN')")` | Estorno de receita lançada incorretamente. |

---

## 4. Pendências / A confirmar

1. **Permissão de Voluntários no Inventário:** Confirmar se o perfil `VOLUNTEER` deve ter autorização para cadastrar novos bens duráveis (`POST /inventory/durables`) ou se o patrimônio permanente fica restrito ao `FINANCE` e `ADMIN`.
2. **Implementação de Spring Security Filter Chain:** Avaliar se a aplicação adotará `SecurityFilterChain` com `BearerTokenAuthenticationFilter` e `@EnableMethodSecurity`, dispensando o código procedural de checagem manual de token em cada controlador.
3. **Auditoria de Tentativas de Acesso Negado:** Definir se acessos não autorizados a rotas financeiras devem ser registrados em log estruturado de segurança.
