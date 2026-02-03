# EcoEcclesia — Épicos, Stories e Backlog

Este backlog transforma as recomendações de análise em épicos e histórias com critérios de aceitação, prontos para planejamento incremental.

## Visão geral
- **Objetivo:** evoluir o protótipo financeiro para um produto auditável, com fluxo completo de contas a pagar/receber, relatórios avançados, compliance e UX consolidada.
- **Horizonte sugerido:** 90–120 dias, dividido em 3 fases.
- **Prioridade:** fluxo financeiro core + qualidade operacional + UX crítica.

## Premissas e dependências
- Backend Java 21 continua como base, com integração opcional a Postgres.
- Equipe mínima sugerida: 1 dev backend, 1 dev frontend, 1 QA/PM part-time.
- Dependências externas: acesso a ambiente Postgres para testes de integração.

## Definition of Done (DoD)
- Requisitos atendidos + critérios de aceitação cumpridos.
- Testes automatizados relevantes passando.
- Documentação mínima atualizada (README/guia de operação quando aplicável).
- Evidência de validação manual (quando UI).

## Épico 1 — Fluxo financeiro core (P0)
**Objetivo:** tornar contas a pagar/receber completas e confiáveis, habilitando fluxo de caixa e lançamentos auditáveis.

### Stories
1. **Completar contas a pagar (recorrência, anexos, aprovação, centros de custo)**
   - **Como** gestor financeiro
   - **Quero** registrar contas recorrentes com anexos e aprovação
   - **Para** garantir previsibilidade e compliance.
   - **Critérios de aceitação**
     - Criação de contas recorrentes com periodicidade definida.
     - Upload/associação de anexos por lançamento.
     - Workflow de aprovação com estados (rascunho → aprovado → pago).
     - Filtro por centro de custo na listagem.
   - **Estimativa:** 2–3 semanas (backend + UI).
   - **Dependências:** trilha de auditoria (Épico 3) para registro de aprovação.

2. **Completar contas a receber (origem, categorias, vínculo a projetos)**
   - **Como** tesoureiro
   - **Quero** classificar receitas por origem e projeto
   - **Para** acompanhar impacto por área.
   - **Critérios de aceitação**
     - Origem/categoria obrigatórias em novos recebíveis.
     - Vínculo opcional a projeto/centro de custo.
     - Filtros por origem, categoria e projeto.
   - **Estimativa:** 1–2 semanas.

3. **Fluxo de caixa consolidado**
   - **Como** gestor financeiro
   - **Quero** visualizar entradas e saídas em um período
   - **Para** apoiar decisões de curto prazo.
   - **Critérios de aceitação**
     - Relatório com total de entradas/saídas e saldo.
     - Filtro por período e centro de custo.
   - **Estimativa:** 1 semana.

## Épico 2 — Relatórios avançados (P1)
**Objetivo:** habilitar relatórios contábeis essenciais para acompanhamento periódico.

### Stories
1. **DRE (Demonstrativo de Resultados)**
   - **Como** gestor
   - **Quero** um DRE por período
   - **Para** acompanhar resultado operacional.
   - **Critérios de aceitação**
     - DRE mensal com totais por grupo contábil.
     - Exportação em CSV e PDF.
   - **Estimativa:** 1–2 semanas.

2. **Balancete por período**
   - **Como** contador
   - **Quero** balancete consolidado
   - **Para** validar saldos contábeis.
   - **Critérios de aceitação**
     - Exibição por conta com saldo anterior e final.
     - Filtro por período.
   - **Estimativa:** 1 semana.

3. **Comparativo mensal/anual**
   - **Como** gestor
   - **Quero** comparar períodos
   - **Para** identificar tendências.
   - **Critérios de aceitação**
     - Comparativo automático de período atual vs anterior.
   - **Estimativa:** 3–5 dias.

## Épico 3 — Auditoria e compliance (P1)
**Objetivo:** garantir rastreabilidade de operações e controle de acesso.

### Stories
1. **Trilha de auditoria (quem criou/alterou/aprovou)**
   - **Como** auditor
   - **Quero** saber quem alterou cada lançamento
   - **Para** cumprir requisitos de conformidade.
   - **Critérios de aceitação**
     - Registro de usuário + data em cada alteração.
     - Consulta de histórico por lançamento.
   - **Estimativa:** 1–2 semanas.

2. **Controle de acesso por unidade/área**
   - **Como** administrador
   - **Quero** restringir acesso por unidade
   - **Para** reduzir exposição indevida.
   - **Critérios de aceitação**
     - Escopo de dados limitado por unidade.
     - Perfis diferentes com permissões específicas.
   - **Estimativa:** 1 semana.

## Épico 4 — Dados e integração (P2)
**Objetivo:** consolidar persistência para todos os módulos e viabilizar importações em lote.

### Stories
1. **Persistência completa em banco**
   - **Como** operador
   - **Quero** persistir todos os módulos no banco
   - **Para** garantir dados consistentes.
   - **Critérios de aceitação**
     - Repositórios não financeiros suportam banco.
   - **Estimativa:** 2–3 semanas.

2. **Importação/Exportação em lote**
   - **Como** operador
   - **Quero** importar/expor em lote
   - **Para** acelerar migrações.
   - **Critérios de aceitação**
     - Upload CSV em lote com validações.
   - **Estimativa:** 1–2 semanas.

3. **Integração com bancos (OFX/CSV)**
   - **Como** tesoureiro
   - **Quero** importar extratos
   - **Para** conciliar lançamentos automaticamente.
   - **Critérios de aceitação**
     - Parser OFX/CSV com mapeamento para plano de contas.
   - **Estimativa:** 2 semanas.

## Épico 5 — Frontend e UX (P2)
**Objetivo:** transformar o protótipo em UI operacional completa, com KPIs e fluxo de aprovação.

### Stories
1. **Dashboards com KPIs financeiros**
   - **Como** gestor
   - **Quero** KPIs no painel
   - **Para** ter visão rápida da saúde financeira.
   - **Critérios de aceitação**
     - Indicadores de saldo, receitas, despesas e variação mensal.
   - **Estimativa:** 1 semana.

2. **Fluxo de aprovação no frontend**
   - **Como** aprovador
   - **Quero** revisar e aprovar lançamentos
   - **Para** garantir compliance.
   - **Critérios de aceitação**
     - Tela de fila de aprovações com ações.
   - **Estimativa:** 1 semana.

3. **Telas completas de contas a pagar/receber**
   - **Como** operador
   - **Quero** gerenciar contas completas no front
   - **Para** evitar uso de scripts externos.
   - **Critérios de aceitação**
     - CRUD completo + filtros e exportação.
   - **Estimativa:** 2 semanas.

## Épico 6 — Qualidade e operação (P0/P1)
**Objetivo:** elevar a confiabilidade e a governança de releases.

### Stories
1. **Testes de integração automatizados**
   - **Como** dev
   - **Quero** testes end-to-end básicos
   - **Para** evitar regressões.
   - **Critérios de aceitação**
     - Testes para login, ledger e exportações.
   - **Estimativa:** 1–2 semanas.

2. **Logs estruturados e monitoramento**
   - **Como** operador
   - **Quero** logs estruturados
   - **Para** monitorar incidentes.
   - **Critérios de aceitação**
     - Logs JSON com correlação de request.
   - **Estimativa:** 1 semana.

3. **Documentação de API (OpenAPI/Swagger)**
   - **Como** integrador
   - **Quero** documentação automática
   - **Para** integrar com terceiros.
   - **Critérios de aceitação**
     - Endpoint público com spec.
   - **Estimativa:** 1 semana.

## Marcos sugeridos (90–120 dias)
1. **Marco 1 (Semanas 1–4) — Core + Qualidade mínima**
   - Contas a pagar e receber completas.
   - Fluxo de caixa consolidado.
   - Testes de integração básicos.
2. **Marco 2 (Semanas 5–8) — Relatórios + Auditoria**
   - DRE, Balancete e Comparativo.
   - Trilha de auditoria + controle de acesso por unidade.
3. **Marco 3 (Semanas 9–12) — UX + Integração**
   - Dashboards, fluxo de aprovação no front.
   - Integração OFX/CSV e importação em lote.

## Riscos e mitigação
- **Risco:** escopo expandir sem estabilizar o core.  
  **Mitigação:** freeze de escopo após Marco 1.
- **Risco:** falta de ambiente Postgres para testes.  
  **Mitigação:** provisionar docker-compose mínimo.
- **Risco:** divergência entre backend e frontend.  
  **Mitigação:** OpenAPI + contrato de API no CI.

## Backlog priorizado (resumo)
| Prioridade | Item | Entrega esperada |
| --- | --- | --- |
| P0 | Completar contas a pagar | Recorrência, anexos e aprovação em produção |
| P0 | Completar contas a receber | Classificação por origem/categoria e filtros |
| P0 | Fluxo de caixa consolidado | Relatório e filtros por período |
| P0 | Testes de integração automatizados | Login + ledger + exportações |
| P1 | DRE | Relatório com CSV/PDF |
| P1 | Balancete | Saldo anterior/final por conta |
| P1 | Trilha de auditoria | Histórico completo por lançamento |
| P1 | Controle de acesso por unidade | Escopo por unidade e perfis |
| P1 | OpenAPI/Swagger | Spec publicada e versionada |
| P2 | Dashboards KPIs | Indicadores financeiros chave |
| P2 | Telas completas de contas a pagar/receber | CRUD completo com filtros |
| P2 | Integração OFX/CSV | Importação automática de extratos |
