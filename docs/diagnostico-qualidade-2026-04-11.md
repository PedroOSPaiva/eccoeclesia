# Diagnóstico técnico (11/04/2026)

Este documento registra uma avaliação rápida da base atual nas dimensões pedidas: **Legibilidade e Manutenibilidade**, **Performance**, **Segurança**, **Escalabilidade** e **Testabilidade**.

## Escopo e método

- Revisão de arquitetura e implementação principal do backend Java e frontend React.
- Execução da suíte de testes backend (`./mvnw test`) para validar baseline.
- Leitura de componentes críticos de autenticação, persistência e servidor HTTP.

---

## 1) Legibilidade e Manutenibilidade

### Situação atual

**Pontos fortes**
- O `README.md` está claro sobre stack, execução local e estrutura de módulos, reduzindo tempo de onboarding.
- O backend é organizado por domínios (`finance`, `expense`, `revenue`, etc.), com classes pequenas em boa parte dos handlers e serviços.
- Há uso consistente de tipos de domínio (`record`/entidades específicas), melhorando intenção de código.

**Riscos / dívidas**
- Há concentração de responsabilidade no servidor principal (`FinanceHttpServer`), que instancia muitas dependências e registra todas as rotas em um único ponto.
- O parser JSON próprio (`FinanceSimpleJsonParser`) é simplificado e tende a virar ponto de manutenção difícil conforme payloads cresçam em complexidade.
- Existem múltiplos mecanismos de persistência (in-memory, CSV, JDBC) com semânticas diferentes; isso aumenta custo cognitivo e chance de divergência comportamental.

### Classificação

**Média-alta (7/10)** — base legível para o estágio atual, mas com sinais de acoplamento e complexidade centralizada.

### Recomendações objetivas

1. Quebrar `FinanceHttpServer` em módulos de registro de rotas por domínio (auth, ledger, cashflow, users etc.).
2. Substituir parser JSON caseiro por biblioteca madura (Jackson/Gson) ou encapsular parser com contrato e testes negativos robustos.
3. Definir uma estratégia padrão de persistência por ambiente (dev/test/prod) com matriz de decisão documentada.

---

## 2) Performance

### Situação atual

**Pontos fortes**
- Uso de `ConcurrentHashMap` em áreas de escrita/leitura frequente (tokens e alguns repositórios), o que evita bloqueios globais simples.
- Fluxo HTTP sem camadas excessivas e com serialização direta tende a ter baixa latência para cargas pequenas.

**Riscos / gargalos**
- `DatabaseLedgerRepository` reprocessa o arquivo inteiro em operações de escrita/leitura (`readAllLines` + `write`), com custo O(n) a O(n²) acumulado conforme volume.
- Repositórios CSV/in-memory não possuem paginação/streaming e podem pressionar memória com crescimento de dados.
- Não há evidência de cache de leitura para relatórios ou agregações financeiras.

### Classificação

**Média (6/10)** — adequado para baixa/média carga, com risco claro de degradação em crescimento de dados.

### Recomendações objetivas

1. Priorizar JDBC/Postgres para produção e reduzir caminhos baseados em arquivo para cenários de desenvolvimento/local.
2. Introduzir paginação/filtros obrigatórios em listagens potencialmente grandes.
3. Medir com benchmark simples (p95/p99 por endpoint) e estabelecer SLO mínimo por rota crítica.

---

## 3) Segurança

### Situação atual

**Pontos fortes**
- Existe autenticação com access/refresh token e verificação de permissão por papel.
- Há fluxo de recuperação de senha com expiração de token.
- Senhas não são armazenadas em texto puro.

**Riscos / críticos**
- Hash de senha usando apenas SHA-256 sem sal e sem fator de custo (insuficiente para proteção moderna contra brute force/offline cracking).
- Tokens de acesso ficam em memória sem TTL explícito no mapa de tokens; risco de sessão longa indefinida enquanto processo vive.
- Não há indicação explícita de limitação de tentativas (rate limiting) em login/reset.
- Não há camada nativa de TLS no servidor HTTP embutido (depende de proteção externa em reverse proxy).

### Classificação

**Baixa-média (4/10)** — funcional, porém abaixo do recomendado para produção em itens fundamentais de credenciais e sessão.

### Recomendações objetivas (prioridade alta)

1. Migrar hash de senha para Argon2id, scrypt ou bcrypt com sal único por usuário.
2. Implementar expiração/rotação de access token com TTL curto e revogação efetiva.
3. Adicionar rate limiting e lockout progressivo para endpoints de autenticação.
4. Documentar topologia segura obrigatória (TLS via proxy, headers, CORS estrito, segredo por ambiente).

---

## 4) Escalabilidade

### Situação atual

**Pontos fortes**
- Arquitetura já separa contratos de repositório/serviço em várias áreas, o que facilita troca de backend de dados.
- Existe caminho JDBC para razão contábil, sinalizando evolução além do modo arquivo.

**Riscos / limitadores**
- Componentes com estado em memória (tokens, alguns repositórios) dificultam escala horizontal sem sticky session/distribuição de estado.
- Inicialização de dependências e rotas centralizada reduz flexibilidade para evoluir para composição modular.
- Mistura de armazenamento em arquivo e memória para domínios distintos complica consistência e operação em múltiplas réplicas.

### Classificação

**Média-baixa (5/10)** — escalável com refatorações, mas não pronta para crescimento horizontal robusto no estado atual.

### Recomendações objetivas

1. Externalizar estado de sessão/token para store compartilhado (ex.: Redis) ou usar JWT curto + blacklist.
2. Padronizar persistência transacional para domínios críticos em banco relacional.
3. Introduzir observabilidade mínima (métricas por endpoint, erro e latência) para guiar scaling real.

---

## 5) Testabilidade

### Situação atual

**Pontos fortes**
- Suíte de testes backend existente e executável localmente; na aferição atual todos os testes passaram.
- Existe teste end-to-end do fluxo financeiro e cobertura de diversos serviços de domínio.
- Separação em serviços/repositórios favorece teste unitário.

**Riscos / lacunas**
- Frontend não expõe scripts de teste automatizado no `package.json`.
- Não há evidência de testes de segurança (abuso, brute force, tokens expirados) e desempenho.
- Ausência de contratos automatizados de API (ex.: OpenAPI + contract tests).

### Classificação

**Média-alta (7/10) no backend / Baixa (3/10) no frontend**.

### Recomendações objetivas

1. Adicionar pipeline de testes frontend (Vitest + React Testing Library) e smoke E2E (Playwright/Cypress).
2. Criar suíte de testes de segurança de autenticação (expiração, repetição de token, brute force, reset inválido).
3. Incluir testes de carga básicos em endpoints financeiros principais.

---

## Plano de ação sugerido (30-60-90 dias)

### 0-30 dias (alto impacto / baixa complexidade)
- Endurecer senha/token (algoritmo moderno + TTL).
- Definir padrão de deploy seguro (TLS obrigatório, CORS, secrets).
- Iniciar testes frontend básicos e contrato mínimo de API.

### 31-60 dias
- Modularizar registro de rotas e inicialização do servidor.
- Consolidar persistência de domínios críticos em banco.
- Publicar dashboards simples de latência/erro.

### 61-90 dias
- Estratégia de escala horizontal (estado distribuído).
- Testes de carga com metas de p95/p99 por endpoint.
- Revisão de arquitetura orientada a limites de domínio e evolução operacional.

---

## Resumo executivo

- **Legibilidade/Manutenibilidade:** boa base, com foco em reduzir acoplamento central.
- **Performance:** suficiente para estágio atual, com gargalo importante em persistência por arquivo.
- **Segurança:** ponto mais crítico; requer hardening de senha/sessão antes de produção sensível.
- **Escalabilidade:** caminho existe, mas estado em memória limita escala horizontal hoje.
- **Testabilidade:** backend saudável; frontend e testes não-funcionais ainda precisam maturidade.
