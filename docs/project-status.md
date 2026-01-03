# EcoEcclesia — Documento de status do projeto

## Visão geral
O EcoEcclesia é um protótipo funcional para gestão administrativa de uma paróquia, com foco inicial no módulo financeiro. O backend é escrito em Java 21 e expõe um servidor HTTP próprio para autenticação, razão contábil e geração de relatórios. O frontend (React + Vite) fornece um fluxo de login e telas financeiras consumindo a API local.

## Arquitetura e componentes
- **Backend Java 21**
  - Servidor HTTP leve (`FinanceHttpServer`) com handlers para autenticação, razão e relatórios.
  - Autenticação baseada em tokens Bearer, com permissões definidas em `UserAccessPolicy`.
  - Persistência do razão configurável: arquivo CSV (`data/ledger-db.csv`) por padrão ou Postgres via JDBC quando `FINANCE_DB_URL`/`DATABASE_URL` é definido.
- **Frontend React (Vite)**
  - Interface prototipada para login e dashboard financeiro (filtros de período, totais, download de CSV/PDF).
  - Consome o backend local em `http://localhost:8080`.
- **Persistência SQL opcional**
  - DDL auditável em `infra/sql/ledger-postgres.sql`, com índices e colunas de auditoria.

## Funcionalidades implementadas
### Autenticação
- Endpoints: `POST /api/auth/login` e `POST /api/auth/refresh`.
- Contas seed são opcionais e configuradas via variável de ambiente `ECOECCLESIA_SEED_USERS` no formato
  `email|senha|ROLE[,ROLE];email|senha|ROLE`.
- Primeiro acesso exige atualização de senha; expiração a cada 120 dias com aviso no painel.

### Razão contábil
- `GET /api/ledger` com filtros por período (`start`/`end`).
- `POST /api/ledger` para criação de lançamentos (requer permissão `finance:write`).
- Plano de contas carregado no backend e disponível via `GET /api/ledger/chart`.

### Relatórios
- `GET /api/reports/ledger` (texto).
- `GET /api/reports/ledger.csv`.
- `GET /api/reports/ledger.pdf`.

### Contas a pagar e a receber (cadastro básico)
- `GET /api/payables`, `POST /api/payables`, `PUT /api/payables/{id}/status`.
- `GET /api/receivables`, `POST /api/receivables`, `PUT /api/receivables/{id}/status`.

### Outros módulos (estado atual)
Os domínios de despesas, receitas, inventário e aniversariantes já existem com repositórios em memória e testes de unidade. Eles não expõem APIs equivalentes ao financeiro neste estágio.

## Estrutura do repositório
- `src/main/java/com/ecoeclesia/finance`: razão, serviços de relatório, autenticação e servidor HTTP.
- `src/main/java/com/ecoeclesia/expense`, `revenue`, `inventory`, `birthday`: outros domínios (implementações em memória).
- `src/frontend`: app React/Vite prototipado.
- `infra/sql/ledger-postgres.sql`: DDL para Postgres.
- `docs/financial-capabilities.md`: fluxo contábil detalhado e exportações.
- `docs/frontend-iso9001-readiness.md`: checklist de build, testes manuais e rastreabilidade.
- `docs/financial-excellence.md`: alvo de excelência, padrão SOLID e checklist de conclusão.

## Como executar
### Backend
```sh
./mvnw test
./mvnw run
```
- O servidor inicia na porta `8080`.
- Para usar Postgres:
  ```sh
  export FINANCE_DB_URL="postgres://usuario:senha@localhost:5432/ecoeclesia"
  export FINANCE_DB_USER=usuario
  export FINANCE_DB_PASSWORD=senha
  ./mvnw run
  ```

### Frontend (protótipo)
```sh
cd src/frontend
npm install
npm run dev -- --host --port 5173
```

## Testes e qualidade
- O backend possui testes em `src/test/java`, executados via `./mvnw test`.
- O frontend segue um checklist de validação manual descrito em `docs/frontend-iso9001-readiness.md`.

## Resumo do status atual
- **Financeiro:** funcional, com autenticação, razão, relatórios e opção de persistência em Postgres.
- **Frontend:** protótipo pronto para login e dashboard financeiro, integrado ao backend local.
- **Demais domínios:** implementações iniciais em memória, cobrindo regras de negócio básicas e testes unitários.

## Próximos passos sugeridos
- Consolidar APIs para despesas, receitas, inventário e aniversariantes, espelhando o padrão do financeiro.
- Evoluir o frontend para cobrir os demais módulos e permitir gestão completa.
- Automatizar testes de integração para os fluxos de relatórios e persistência em Postgres.
