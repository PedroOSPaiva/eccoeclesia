# EcoEcclesia — Épicos, Stories e Backlog

Este backlog transforma as recomendações de análise em épicos e histórias com critérios de aceitação, prontos para planejamento incremental.

## Visão geral
- Objetivo: evoluir o protótipo financeiro para um produto auditável, com fluxo completo de contas a pagar/receber, relatórios avançados, compliance e UX consolidada.
- Horizonte sugerido: 90–120 dias, dividido em 3 fases.
- Prioridade: fluxo financeiro core + qualidade operacional + UX crítica.

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

2. **Completar contas a receber (origem, categorias, vínculo a projetos)**
   - **Como** tesoureiro
   - **Quero** classificar receitas por origem e projeto
   - **Para** acompanhar impacto por área.
   - **Critérios de aceitação**
     - Origem/categoria obrigatórias em novos recebíveis.
     - Vínculo opcional a projeto/centro de custo.
     - Filtros por origem, categoria e projeto.

3. **Fluxo de caixa consolidado**
   - **Como** gestor financeiro
   - **Quero** visualizar entradas e saídas em um período
   - **Para** apoiar decisões de curto prazo.
   - **Critérios de aceitação**
     - Relatório com total de entradas/saídas e saldo.
     - Filtro por período e centro de custo.

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

2. **Balancete por período**
   - **Como** contador
   - **Quero** balancete consolidado
   - **Para** validar saldos contábeis.
   - **Critérios de aceitação**
     - Exibição por conta com saldo anterior e final.
     - Filtro por período.

3. **Comparativo mensal/anual**
   - **Como** gestor
   - **Quero** comparar períodos
   - **Para** identificar tendências.
   - **Critérios de aceitação**
     - Comparativo automático de período atual vs anterior.

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

2. **Controle de acesso por unidade/área**
   - **Como** administrador
   - **Quero** restringir acesso por unidade
   - **Para** reduzir exposição indevida.
   - **Critérios de aceitação**
     - Escopo de dados limitado por unidade.
     - Perfis diferentes com permissões específicas.

## Épico 4 — Dados e integração (P2)
**Objetivo:** consolidar persistência para todos os módulos e viabilizar importações em lote.

### Stories
1. **Persistência completa em banco**
   - **Como** operador
   - **Quero** persistir todos os módulos no banco
   - **Para** garantir dados consistentes.
   - **Critérios de aceitação**
     - Repositórios não financeiros suportam banco.

2. **Importação/Exportação em lote**
   - **Como** operador
   - **Quero** importar/expor em lote
   - **Para** acelerar migrações.
   - **Critérios de aceitação**
     - Upload CSV em lote com validações.

3. **Integração com bancos (OFX/CSV)**
   - **Como** tesoureiro
   - **Quero** importar extratos
   - **Para** conciliar lançamentos automaticamente.
   - **Critérios de aceitação**
     - Parser OFX/CSV com mapeamento para plano de contas.

## Épico 5 — Frontend e UX (P2)
**Objetivo:** transformar o protótipo em UI operacional completa, com KPIs e fluxo de aprovação.

### Stories
1. **Dashboards com KPIs financeiros**
   - **Como** gestor
   - **Quero** KPIs no painel
   - **Para** ter visão rápida da saúde financeira.
   - **Critérios de aceitação**
     - Indicadores de saldo, receitas, despesas e variação mensal.

2. **Fluxo de aprovação no frontend**
   - **Como** aprovador
   - **Quero** revisar e aprovar lançamentos
   - **Para** garantir compliance.
   - **Critérios de aceitação**
     - Tela de fila de aprovações com ações.

3. **Telas completas de contas a pagar/receber**
   - **Como** operador
   - **Quero** gerenciar contas completas no front
   - **Para** evitar uso de scripts externos.
   - **Critérios de aceitação**
     - CRUD completo + filtros e exportação.

## Épico 6 — Qualidade e operação (P0/P1)
**Objetivo:** elevar a confiabilidade e a governança de releases.

### Stories
1. **Testes de integração automatizados**
   - **Como** dev
   - **Quero** testes end-to-end básicos
   - **Para** evitar regressões.
   - **Critérios de aceitação**
     - Testes para login, ledger e exportações.

2. **Logs estruturados e monitoramento**
   - **Como** operador
   - **Quero** logs estruturados
   - **Para** monitorar incidentes.
   - **Critérios de aceitação**
     - Logs JSON com correlação de request.

3. **Documentação de API (OpenAPI/Swagger)**
   - **Como** integrador
   - **Quero** documentação automática
   - **Para** integrar com terceiros.
   - **Critérios de aceitação**
     - Endpoint público com spec.

## Backlog priorizado (resumo)
1. P0 — Completar contas a pagar
2. P0 — Completar contas a receber
3. P0 — Fluxo de caixa consolidado
4. P0 — Testes de integração automatizados
5. P1 — DRE
6. P1 — Balancete
7. P1 — Trilha de auditoria
8. P1 — Controle de acesso por unidade
9. P1 — OpenAPI/Swagger
10. P2 — Dashboards KPIs
11. P2 — Telas completas de contas a pagar/receber
12. P2 — Integração OFX/CSV
