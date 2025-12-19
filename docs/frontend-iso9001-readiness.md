# Guia de prontidão ISO 9001 para o frontend

Este guia descreve como executar o frontend e como evidenciar conformidade com práticas de gestão da qualidade inspiradas na ISO 9001:2015. O foco é demonstrar rastreabilidade, controle de mudança, verificação/validação e gestão de configuração para o módulo React/Vite que consome o backend financeiro.

## Escopo e objetivos
- Aplicação React (Vite) localizada em `src/frontend`, que integra com o backend em `http://localhost:8080`.
- Garantir que cada release tenha trilha de auditoria, critérios de aceitação e evidências de testes.
- Manter o estado visual alinhado ao layout financeiro oficial (páginas Financeiro, Login, etc.).

## Gestão de configuração e controle de mudança
1. **Controle de versão:** alterações no frontend devem passar por branch dedicada e merge via revisão de código. Commits precisam descrever a mudança de forma rastreável (ex.: `feat(finance-ui): alinhar layout oficial`).
2. **Baseline:** a versão liberada deve corresponder ao build de `main` (ou branch de release) com tag e hash registrados no registro de implantação.
3. **Rastreabilidade:** vincule cada mudança a uma demanda ou não conformidade documentada. Utilize o README/CHANGELOG (quando aplicável) para registrar impactos.
4. **Gestão de ativos:** mantenha dependências no `package.json` e documente versões mínimas de Node/Vite no README. Evite dependências não aprovadas.

## Verificação e validação
- **Build reprodutível:**
  ```sh
  cd src/frontend
  npm install
  npm run build
  ```
  O build deve concluir sem warnings bloqueantes. Armazene o artefato `dist/` junto do hash do commit para rastreabilidade.

- **Teste manual guiado (checklist):**
  1. Autenticação com usuários seed (`admin@ecoeclesia.test`/`admin123`, `tesouraria@ecoeclesia.test`/`finance123`).
  2. Acesso condicional ao menu **Financeiro** apenas para perfis com permissão.
  3. Na página Financeiro: filtros de período, totais de receitas/despesas/saldo, tabela com código/conta/ref./centro de custo, download CSV/PDF e exibição do plano de contas/glossário.
  4. Estado de carregamento, mensagens de erro e placeholders (skeleton) presentes.
  5. Logout limpa tokens e oculta o menu protegido.

- **Integração com backend (Postgres opcional):**
  - Iniciar backend: `FINANCE_DB_URL=postgres://usuario:senha@localhost:5432/ecoeclesia ./mvnw run`.
  - Validar chamadas em rede pelo navegador (ou `npm run dev` + Network tab) para `/api/auth/login`, `/api/ledger`, `/api/reports/ledger.pdf` e `/api/ledger/chart`.
  - Confirmar que lançamentos criados no front aparecem persistidos no banco ao recarregar a página.

- **Aderência visual ao layout oficial:**
  - Utilize o design aprovado (tipografia, cores, espaçamentos, pills, botões primário/secundário) já presente em `LedgerPage.css`/`LoginPage.css`.
  - Verifique contraste e responsividade em larguras 1280px e 768px.

## Aceite de release (evidências)
Para declarar uma entrega conforme:
- Checklist de testes preenchido e arquivado (pode ser anexado à PR ou pasta de QA).
- Print do fluxo financeiro (lista, filtros, downloads) no ambiente apontando para Postgres.
- Hash do commit + resultado do `npm run build` e `./mvnw test` registrados.
- Confirmação de que as credenciais seed funcionam e as permissões ocultam/mostram o menu Financeiro corretamente.

## Tratamento de não conformidades
- Registre a ocorrência (data, versão, ambiente, passos para reproduzir).
- Abra issue vinculada e registre a correção com referência ao teste que detectou o problema.
- Reavalie os critérios de aceitação e, se necessário, atualize este guia para prevenir reincidências.
