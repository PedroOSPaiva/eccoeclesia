# EcoEcclesia — Versão Excelente (financeiro)

Este documento descreve o **alvo de excelência** para o sistema financeiro, o que já está
entregue hoje e o que ainda falta para concluir o produto. Ele também define
um **padrão arquitetural baseado em SOLID**, para guiar as próximas evoluções.

## O que já está entregue (base atual)
- Autenticação por token e permissões via `UserAccessPolicy`.
- Razão contábil com criação e consulta de lançamentos.
- Exportação de relatórios do razão em texto, CSV e PDF.
- Persistência por arquivo CSV e opção de Postgres via JDBC.
- Frontend prototipado com login e dashboard financeiro básico.
- Cadastro básico de contas a pagar e a receber (criação, listagem e atualização de status).

## O que foi ajustado nesta entrega
- Foi criada esta documentação de referência para **versão excelente**, com:
  - critérios de qualidade;
  - padrão arquitetural baseado em SOLID;
  - checklist de pendências até a conclusão do produto.

## Objetivo da versão excelente
Entregar um sistema financeiro completo, seguro, auditável e fácil de operar,
com processos claros de lançamento, aprovação e prestação de contas.

## Arquitetura recomendada (baseada em SOLID)
Abaixo está um padrão sugerido para organizar o backend com foco em:
manutenibilidade, extensibilidade e isolamento de regras de negócio.

### Camadas sugeridas
1. **Domain (Regras de negócio)**
   - Entidades e serviços puros (sem dependências de framework).
   - Ex.: `LedgerEntry`, `AccountPlan`, `CashFlowService`.

2. **Application (Casos de uso)**
   - Orquestração de regras (ex.: “Registrar lançamento”, “Gerar relatório”).
   - Recebe e devolve DTOs simples.

3. **Infrastructure (Persistência e integração)**
   - JDBC, arquivos, armazenamento de mídia (foto), integrações externas.

4. **Interface/HTTP (Handlers/Controllers)**
   - Adapta a entrada JSON/HTTP para os casos de uso.

### Como SOLID se aplica
- **S** (Single Responsibility): cada classe deve ter uma única razão de mudança.
- **O** (Open/Closed): adicionar funcionalidades via novas classes (ex.: novos relatórios),
  sem alterar as existentes.
- **L** (Liskov): serviços e repositórios devem ser substituíveis por mocks/fakes.
- **I** (Interface Segregation): interfaces pequenas e específicas (ex.: `ReportExporter`).
- **D** (Dependency Inversion): regras de negócio dependem de abstrações (interfaces),
  não de detalhes de infraestrutura.

## Checklist até a conclusão completa
### Core financeiro
- [ ] Contas a pagar completas (recorrência, anexos, aprovação, centros de custo).
- [ ] Contas a receber completas (origem, categorias, vínculo a projetos).
- [ ] Fluxo de caixa consolidado.
- [ ] Conciliação bancária.
- [ ] Orçamento (previsto vs realizado).
- [ ] Centro de custo / projetos com filtros e consolidação.

### Relatórios
- [ ] DRE (Demonstrativo de Resultados).
- [ ] Balancete por período.
- [ ] Comparativo mensal/anual.
- [ ] Relatórios por categoria e centro de custo.

### Auditoria e compliance
- [ ] Trilha de auditoria (quem criou/alterou/aprovou).
- [ ] Aprovação de lançamentos (workflow).
- [ ] Controle de acesso por unidade/área.

### Dados e integração
- [ ] Persistência completa em banco para todos os módulos.
- [ ] Importação e exportação em lote.
- [ ] Integração com bancos/extratos (OFX/CSV).

### Frontend e UX
- [ ] Dashboards com indicadores (KPIs).
- [ ] Telas completas de contas a pagar/receber.
- [ ] Fluxo de aprovação e revisão.
- [ ] Gestão de centros de custo e orçamento.

### Qualidade e operação
- [ ] Testes de integração automatizados.
- [ ] Logs estruturados e monitoramento.
- [ ] Documentação de API (OpenAPI/Swagger).
- [ ] Ambiente de homologação e playbook de deploy.

## Como explicar ao usuário final (resumo curto)
“Hoje o sistema já registra e consulta lançamentos, gera relatórios e permite
persistir dados no banco. A versão excelente vai incluir fluxo de caixa completo,
contas a pagar/receber, orçamento, relatórios avançados e auditoria. Além disso,
haverá melhorias de usabilidade no painel e um processo completo de aprovação.”
