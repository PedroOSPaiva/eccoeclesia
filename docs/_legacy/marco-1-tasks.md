# EcoEcclesia — Marco 1 (Semanas 1–4) — Tasks técnicas

Este documento operacionaliza o Marco 1 com tasks detalhadas para execução imediata.

## Objetivo do marco
Entregar contas a pagar/receber completas, fluxo de caixa consolidado e testes de integração básicos.

## Lista de tasks técnicas (prioridade P0)

### 1) Backend — Contas a pagar
- [ ] Modelar entidade `Payable` com recorrência, anexos e status.
- [ ] Criar endpoints:
  - `POST /api/payables` (criação com recorrência/anexos).
  - `GET /api/payables` (filtros por centro de custo, status e período).
  - `PUT /api/payables/{id}/status` (aprovação/pagamento).
- [ ] Persistência: salvar recorrência e metadados de anexos.
- [ ] Auditoria: registrar usuário + timestamp em alterações.

### 2) Backend — Contas a receber
- [ ] Modelar entidade `Receivable` com origem, categoria e projeto.
- [ ] Criar endpoints:
  - `POST /api/receivables` (criação com origem/categoria).
  - `GET /api/receivables` (filtros por origem/categoria/projeto).
  - `PUT /api/receivables/{id}/status` (status).
- [ ] Persistência com origem/categoria/projeto.

### 3) Backend — Fluxo de caixa
- [ ] Serviço de consolidação (entradas/saídas/saldo).
- [ ] Endpoint `GET /api/cashflow` com filtros por período e centro de custo.
- [ ] Exportação simples (CSV) do fluxo.

### 4) Frontend — Contas a pagar
- [ ] Formulário com recorrência, anexos e centro de custo.
- [ ] Lista com filtros (status/centro/período).
- [ ] Tela de aprovação com ações e histórico.
- [ ] Feedback visual de erro/sucesso/loading.

### 5) Frontend — Contas a receber
- [ ] Formulário com origem/categoria/projeto.
- [ ] Lista com filtros por origem/categoria/projeto.
- [ ] Atualização de status.

### 6) Frontend — Fluxo de caixa
- [ ] Tela de fluxo com totais e filtros.
- [ ] Download CSV do fluxo.

### 7) QA/Testes
- [ ] Casos de teste para payables (criação, aprovação, pagamento, recorrência).
- [ ] Casos de teste para receivables (criação, filtros, status).
- [ ] Testes de integração básicos: login, ledger, payables e receivables.

## Critérios de aceite do Marco 1
- Contas a pagar completas com recorrência/anexos/aprovação em produção.
- Contas a receber com origem/categoria/projeto e filtros.
- Fluxo de caixa consolidado disponível por período.
- Testes de integração mínimos passando.
