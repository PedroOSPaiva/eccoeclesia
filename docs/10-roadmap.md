# Roadmap Estratégico de Evolução Técnica (Impacto × Esforço)

## Propósito
Este documento consolida o plano de implementação priorizado do **EcoEcclesia**, agrupando as melhorias em fases ordenadas por criticidade técnica, impacto operacional na paróquia e esforço estimado de engenharia.

**Data de revisão:** 19 de novembro de 2026  
**Status:** Vigente  

---

## 1. Matriz de Priorização por Fases

| Fase | Item / Iniciativa | Migration | Arquivos Afetados | Impacto | Esforço |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Fase A: Segurança** | Criar `UserApiController` no Spring MVC para eliminar o erro 404 de `/api/users` | N/A | [00-inventario.md](00-inventario.md)<br/>`UserApiController.java`, `AppConfig.java`, `user.service.ts` | **Alto** | **Baixo** |
| **Fase A: Segurança** | Fechar rotas públicas de mutação com `@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE')")` | N/A | [06-permissoes-rbac.md](06-permissoes-rbac.md)<br/>`ApiController.java:62,141`, `BirthdayApiController.java:34`, `InventoryApiController.java:206` | **Alto** | **Baixo** |
| **Fase A: Segurança** | Padronizar retorno de permissão negada para `403 Forbidden` (em vez de `401`) | N/A | [06-permissoes-rbac.md](06-permissoes-rbac.md)<br/>`LedgerApiController.java:62,78`, `ReportApiController.java:51,70` | **Médio** | **Baixo** |
| **Fase A: Segurança** | Ativar validação declarativa com anotações `@Valid` e Jakarta Bean Validation | N/A | [00-inventario.md](00-inventario.md)<br/>Controllers e DTOs de request | **Médio** | **Baixo** |
| **Fase A: Segurança** | Impor troca de senha obrigatória no 1º login quando `mustChangePassword: true` | N/A | [09-mapa-telas.md](09-mapa-telas.md)<br/>`auth.service.ts`, `auth.guard.ts`, `login-page.component.ts` | **Médio** | **Baixo** |
| **Fase B: Persistência** | Oficializar a tabela `ledger_entries` sob controle do Flyway | `V3` | [04-modelo-er.md](04-modelo-er.md), [05-migracoes-flyway.md](05-migracoes-flyway.md)<br/>`V3__create_ledger_entries.sql`, `JdbcLedgerGateway.java:33-43` | **Alto** | **Baixo** |
| **Fase B: Persistência** | Substituir `InMemoryExpenseRepository` e `InMemoryRevenueRepository` por JDBC | N/A | [03-c4-containers.md](03-c4-containers.md)<br/>`JdbcExpenseRepository.java`, `JdbcRevenueRepository.java`, `AppConfig.java:35,46` | **Alto** | **Médio** |
| **Fase B: Persistência** | Migrar aniversariantes de `data/birthdays.csv` para tabela relacional no PostgreSQL | `V4` | [04-modelo-er.md](04-modelo-er.md), [05-migracoes-flyway.md](05-migracoes-flyway.md)<br/>`V4__create_birthdays_table.sql`, `CsvBirthdayRepository.java`, `AppConfig.java:86` | **Médio** | **Baixo** |
| **Fase B: Persistência** | Adicionar auditoria de criação e autoria (`created_at`, `created_by`) | N/A | [08-maquinas-estado.md](08-maquinas-estado.md)<br/>DDL de tabelas financeiras e entidades Java | **Médio** | **Médio** |
| **Fase C: Domínio** | Criar tabela `communities` com seed da Matriz e Capela São João Bosco | `V5` | [04-modelo-er.md](04-modelo-er.md), [05-migracoes-flyway.md](05-migracoes-flyway.md)<br/>`V5__create_communities.sql`, `CommunityEntity.java`, `AppConfig.java` | **Alto** | **Baixo** |
| **Fase C: Domínio** | Criar tabela `members` unificando cadastro pastoral com máquina de estados | `V6` | [04-modelo-er.md](04-modelo-er.md), [08-maquinas-estado.md](08-maquinas-estado.md)<br/>`V6__create_members.sql`, `MemberEntity.java`, `MemberService.java` | **Alto** | **Médio** |
| **Fase C: Domínio** | Criar tabela `stewards` para controle de dízimos e vincular a `revenues` | `V7` | [04-modelo-er.md](04-modelo-er.md), [08-maquinas-estado.md](08-maquinas-estado.md)<br/>`V7__create_stewards.sql`, `StewardEntity.java`, `RevenueService.java` | **Alto** | **Médio** |
| **Fase C: Domínio** | Adicionar coluna `community_id` em `ledger_entries`, `expenses`, `revenues` e `inventory` | `V8` | [04-modelo-er.md](04-modelo-er.md), [05-migracoes-flyway.md](05-migracoes-flyway.md)<br/>`V8__add_community_id_to_financial.sql`, models e repositórios | **Alto** | **Médio** |
| **Fase C: Domínio** | Backfill de `cost_center` para `community_id` e remoção da coluna texto livre | `V9` | [04-modelo-er.md](04-modelo-er.md), [05-migracoes-flyway.md](05-migracoes-flyway.md)<br/>`V9__migrate_cost_center_to_community.sql`, `LedgerService.java` | **Alto** | **Médio** |
| **Fase C: Domínio** | Componente Seletor Global de Comunidade no Header do Frontend com Signal | N/A | [09-mapa-telas.md](09-mapa-telas.md)<br/>`app.component.html`, `community.service.ts`, `ledger-page.component.ts` | **Alto** | **Médio** |
| **Fase D: Diferenciais** | Modo Escuro / Tema Litúrgico adaptativo (Roxo, Branco, Verde, Vermelho) | N/A | `styles.css`, `app.component.ts` | **Baixo** | **Baixo** |
| **Fase D: Diferenciais** | Emissão agendada e envio automático de balancetes por e-mail para o conselho | N/A | `Spring @Scheduled`, `JavaMailSender`, `ReportService` | **Médio** | **Médio** |
| **Fase D: Diferenciais** | Importação de extratos bancários em formato OFX para conciliação no Razão | N/A | `FinancialStatementImportService.java`, `ledger-page.component.ts` | **Médio** | **Médio** |
| **Fase D: Diferenciais** | Dashboard Pastoral com métricas de engajamento e dízimo por capela | N/A | `dashboard-page.component.ts`, `finance-chart.component.ts` | **Médio** | **Médio** |

---

## 2. Detalhamento dos Grupos de Trabalho

### Fase A — Blindagem de Segurança e Correções Imediatas
* **Foco:** Sanar imediatamente vulnerabilidades que expõem endpoints críticos de mutação ao público e habilitar a tela de usuários (`/users`) criando o controlador REST que faltava no Spring Boot.
* **Meta de Sucesso:** 100% dos endpoints autenticados e tipados, sem retornos 404 em rotas do menu.

### Fase B — Persistência Definitiva e Integridade ACID
* **Foco:** Eliminar os repositórios voláteis em memória (`InMemoryExpenseRepository` e `InMemoryRevenueRepository`) e o arquivo CSV em disco (`birthdays.csv`), trazendo todos os dados para o PostgreSQL 16 versionado via Flyway (`V3` e `V4`).
* **Meta de Sucesso:** Zero perda de dados ao reiniciar a aplicação backend.

### Fase C — Governança por Comunidades e Centro Pastoral de Membros
* **Foco:** Introduzir as migrações `V5` a `V9`, estabelecendo `communities` como unidade relacional da paróquia, `members` como centro de gravidade pastoral e `stewards` como dizimistas, eliminando a dependência do campo de texto livre `cost_center`.
* **Meta de Sucesso:** Balancetes auditáveis por capela e visão consolidada da paróquia.

### Fase D — Diferenciais Pastorais e Produtividade
* **Foco:** Automação de fechamentos mensais, importação de extratos bancários (OFX), disparos programados de balancetes e usabilidade refinada.

---

## 3. Pendências / A confirmar

1. **Prioridade Relativa entre Fase A e B:** Confirmar se a implementação de `UserApiController` e fechamento de endpoints públicos deve preceder a criação das migrations Flyway `V3` e `V4`.
2. **Impacto de Downtime na Fase C:** Validar janela de manutenção paroquial para a execução do script de backfill da migration `V9` (conversão de `cost_center` para `community_id`).
