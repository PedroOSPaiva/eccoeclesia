# EcoEcclesia — Diagnóstico em Semáforo + Plano de 2 Semanas

## Objetivo
Transformar o estado atual do protótipo em um incremento operacional com menor risco de regressão, focando no núcleo financeiro e na governança mínima de release.

## Diagnóstico por área (Semáforo)

### 1) Backend financeiro — 🟢 Verde
**Situação atual**
- API financeira funcional com autenticação, razão e exportações de relatório.
- Endpoints de contas a pagar/receber já existem em nível básico.

**Leitura executiva**
- O núcleo financeiro está pronto para evolução incremental sem refatoração ampla.

### 2) Frontend operacional — 🟡 Amarelo
**Situação atual**
- Frontend React/Vite funcional para login e dashboard financeiro.
- Cobertura de UX ainda parcial para módulos além do financeiro.

**Leitura executiva**
- Há base de interface consistente, mas faltam fluxos completos para operação diária fim-a-fim.

### 3) Dados e persistência — 🟡 Amarelo
**Situação atual**
- Persistência financeira com fallback em CSV e opção Postgres via variável de ambiente.
- Demais domínios ainda dependem de implementações em memória.

**Leitura executiva**
- A trilha para robustez existe, porém não está homogênea entre módulos.

### 4) Qualidade e testes — 🟡 Amarelo
**Situação atual**
- Testes unitários backend existentes e passando.
- Lacuna relevante de testes de integração automatizados (login + ledger + exportações + banco).

**Leitura executiva**
- A qualidade base é boa para desenvolvimento, mas ainda insuficiente para escalar mudanças com segurança alta.

### 5) Operação, auditoria e compliance — 🟡 Amarelo
**Situação atual**
- Há diretriz de auditoria/compliance no backlog e documentação.
- Trilha completa de auditoria e documentação automática de API ainda não estão consolidadas.

**Leitura executiva**
- Existe direcionamento correto, mas faltam controles que normalmente são exigidos em produção com governança.

## Resumo executivo
- **Força principal:** core financeiro já funcional e testado.
- **Risco principal:** evolução de escopo sem cobertura de integração e sem trilha operacional completa.
- **Prioridade recomendada:** estabilizar P0 com foco em fluxo financeiro completo + testes de integração + prontidão mínima de operação.

## Plano prático de 2 semanas

## Semana 1 — Estabilização do Core (P0)
### Objetivos
1. Fechar lacunas de contas a pagar/receber para uso operacional básico.
2. Garantir fluxo de caixa consolidado com filtros principais.
3. Criar base de testes de integração críticos.

### Entregas
- **Contas a pagar/receber (MVP operacional)**
  - Completar campos essenciais de classificação e filtros de consulta.
  - Padronizar respostas e validações de erro.
- **Fluxo de caixa consolidado**
  - Endpoint com consolidação de entradas/saídas/saldo por período.
  - Filtro mínimo por período e centro de custo.
- **Testes de integração (smoke crítico)**
  - Cenários automatizados para login, ledger e exportações (texto/CSV/PDF).
  - Cenário com persistência Postgres no ambiente local/container.

### Critérios de saída da Semana 1
- Fluxo financeiro crítico executável de ponta a ponta sem passos manuais frágeis.
- Suíte de integração mínima rodando no pipeline local de desenvolvimento.

## Semana 2 — Confiabilidade de Release (P1)
### Objetivos
1. Aumentar confiabilidade operacional para release incremental.
2. Melhorar rastreabilidade e contrato backend/frontend.
3. Preparar trilha para próximos épicos (relatórios avançados e auditoria).

### Entregas
- **Observabilidade mínima**
  - Logs estruturados com correlação básica por requisição.
  - Eventos-chave de autenticação e operações financeiras.
- **Contrato de API**
  - Publicação de especificação OpenAPI inicial para endpoints existentes.
  - Revisão de payloads para consistência de nomes e tipos.
- **Hardening de release**
  - Checklist objetivo de validação (pré-release) com evidências.
  - Execução automática dos testes críticos em rotina padrão de entrega.

### Critérios de saída da Semana 2
- Release candidate com rastreabilidade técnica e risco controlado de regressão.
- Base pronta para avançar em DRE/balancete sem comprometer estabilidade.

## Priorização recomendada (ordem de execução)
1. **P0 — Completar ciclo financeiro operacional (payables/receivables/fluxo de caixa).**
2. **P0 — Testes de integração críticos automatizados.**
3. **P1 — Logs estruturados e contratos de API (OpenAPI).**
4. **P1 — Trilha de auditoria em lançamentos e ações sensíveis.**

## Riscos e mitigação imediata
- **Risco:** crescimento de escopo antes de estabilizar o core.
  - **Mitigação:** congelar novas features fora de P0 por 2 semanas.
- **Risco:** divergência backend/frontend.
  - **Mitigação:** versionar contrato de API e validar em testes de integração.
- **Risco:** cobertura insuficiente em ambiente real de dados.
  - **Mitigação:** smoke com Postgres em rotina fixa de validação.

## Métricas de acompanhamento (quinzena)
- % de fluxos P0 cobertos por integração automatizada.
- Tempo médio de execução de validação pré-release.
- Número de regressões detectadas após merge.
- Taxa de sucesso dos cenários críticos (login, ledger, exportações, fluxo de caixa).
