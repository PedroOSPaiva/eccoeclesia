# EcoEcclesia

## Visão geral
- **Backend Java 21** com script customizado `./mvnw` (usa `javac`, não depende do Maven instalado) e servidor HTTP leve (`FinanceHttpServer`) para autenticação, razão contábil e exportação de relatórios.
- **Persistência do razão**: por padrão grava em arquivo (`data/ledger-db.csv`); quando `FINANCE_DB_URL` ou `DATABASE_URL` está definido usa JDBC Postgres e aplica o DDL auditável de `infra/sql/ledger-postgres.sql`.
- **Autenticação**: endpoints `/api/auth/login` e `/api/auth/refresh` emitem tokens Bearer alinhados ao `UserAccessPolicy`. Contas seed podem ser configuradas via `ECOECCLESIA_SEED_USERS` (formato `email|senha|ROLE[,ROLE];email|senha|ROLE`). O primeiro acesso exige atualização de senha e há expiração a cada 120 dias.
- **Frontend React (Vite)** em `src/frontend`: protótipo de login, dashboard financeiro (filtros de período, totais, download CSV/PDF) e páginas auxiliares. Ele consome o backend em `http://localhost:8080` quando iniciado via `npm run dev`.
- Outros módulos (despesas, receitas, inventário, aniversariantes) permanecem com repositórios em memória e testes de unidade para exercitar regras.

Consulte `docs/financial-capabilities.md` para um passo a passo detalhado do fluxo contábil já disponível.

Para um roadmap da versão excelente, veja `docs/financial-excellence.md`.

Para evidências de qualidade e operação alinhadas ao front, veja `docs/frontend-iso9001-readiness.md` (checklist de build, testes manuais, rastreabilidade e aceitação de release).

## Requisitos
- JDK 21+ disponível no `PATH` (o script chama `javac --release 21`).
- Bash para executar `./mvnw`.
- (Opcional para frontend) Node 18+ com `npm` para rodar a camada React via Vite.
- (Opcional) Postgres acessível se quiser persistência real do razão.

## Como executar o backend
1. **Rodar testes**
   ```sh
   ./mvnw test
   ```
   Compila `src/main/java` e `src/test/java` para `target/` e executa `com.ecoeclesia.testing.TestRunner`.

2. **Subir o servidor HTTP**
   ```sh
   ./mvnw run
   ```
   Inicia `EcoEcclesiaApplication`, que liga o `FinanceHttpServer` na porta 8080. O servidor expõe:
   - Autenticação: `POST /api/auth/login` e `POST /api/auth/refresh` (retornam tokens Bearer + permissões).
   - Razão: `GET /api/ledger` (lista ou filtra por `start`/`end`), `POST /api/ledger` (cria lançamento; requer `finance:write`).
   - Relatórios: `GET /api/reports/ledger` (texto), `GET /api/reports/ledger.pdf`, `GET /api/reports/ledger.csv` (todos com filtros `start`/`end`).
   - Contas a pagar: `GET /api/payables`, `POST /api/payables`, `PUT /api/payables/{id}/status`.
   - Contas a receber: `GET /api/receivables`, `POST /api/receivables`, `PUT /api/receivables/{id}/status`.
   - Para seed de usuários (opcional), use `ECOECCLESIA_SEED_USERS` no formato `email|senha|ROLE[,ROLE];email|senha|ROLE`.

3. **Usar Postgres (opcional)**
   ```sh
   export FINANCE_DB_URL="postgres://usuario:senha@localhost:5432/ecoeclesia"
   # ou DATABASE_URL no mesmo formato
   export FINANCE_DB_USER=usuario  # opcional se não estiver no URL
   export FINANCE_DB_PASSWORD=senha
   ./mvnw run
   ```
   O servidor tentará carregar o driver JDBC do classpath, aplicará o DDL de `infra/sql/ledger-postgres.sql` e passará a persistir em `ledger_entries` com colunas de auditoria e índices.
   - Para popular dados de teste diretamente no banco e validar o fluxo via API/PDF/CSV, siga `docs/finance-postgres-smoke-test.md`.

## Como executar o frontend (protótipo)
```sh
cd src/frontend
npm install
npm run dev -- --host --port 5173
```
A aplicação Vite consumirá o backend em `http://localhost:8080` para login e razão. Apenas usuários com permissões financeiras verão a navegação de "Financeiro".

## Estrutura do repositório
- `src/main/java/com/ecoeclesia/finance`: razão, plano de contas, serviços de relatório e servidor HTTP com autenticação.
- `src/main/java/com/ecoeclesia/expense`, `revenue`, `inventory`, `birthday`: demais domínios com repositórios em memória e testes de apoio.
- `src/frontend`: app React/Vite prototipado.
- `infra/sql/ledger-postgres.sql`: DDL para a tabela `ledger_entries` com campos de auditoria.
- `docs/financial-capabilities.md`: guia rápido do fluxo contábil e das exportações.
- `docs/chart-of-accounts-glossary.md`: plano de contas paroquial com código, classificação, tipo e descrição já carregado no backend e disponível via `/api/ledger/chart`.

## Notas de contribuição
- Use `./mvnw test` antes de enviar mudanças para validar o backend.
- Para alterar o front, siga o fluxo Vite acima; o backend não faz build nem serve os artefatos React.
- O `pom.xml` existe apenas para compatibilidade e define `<release>17</release>` caso alguém use Maven diretamente, mas o caminho suportado é o script `./mvnw` com JDK 21.
