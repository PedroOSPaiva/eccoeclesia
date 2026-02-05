# EcoEcclesia — Marco 1 — Validação final

Este documento registra a validação final do Marco 1 conforme o DoD e o checklist de entrega.

## Checklist de validação

### Backend
- [x] Testes automatizados executados (`./mvnw test`).
- [x] Endpoints de payables/receivables e cashflow disponíveis na API.

### Frontend (UI)
- [ ] Build/execução local do frontend (`npm install` + `npm run dev`).
- [ ] Validação manual dos fluxos (responsável: usuário):
- [ ] Validação manual dos fluxos:
  - [ ] Criar contas a pagar (recorrência/anexos).
  - [ ] Criar contas a receber (origem/categoria/projeto).
  - [ ] Ações de aprovação/pagamento/recebimento.
  - [ ] Visualização de fluxo de caixa.

### Evidências
- [ ] Screenshot da tela Financeiro com payables/receivables/cashflow (responsável: usuário).
- [ ] Screenshot da tela Financeiro com payables/receivables/cashflow.

## Observações
- `npm install` falhou com erro 403 ao acessar registry.npmjs.org, impedindo o build/execução do frontend.
- Solução sugerida: configurar `.npmrc` para usar o registry interno (Artifactory/Nexus) liberado pela infraestrutura.
