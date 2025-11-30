# EcoEcclesia

## Visão Geral do Projeto

**Nome do Projeto:** EcoEcclesia  
**Objetivo:** Criar um sistema web para controle de gastos de uma igreja, com mapeamentos mensais de estoque de bens de consumo e inventário de bens como cadeiras, instrumentos musicais, etc.

## Stakeholders

- **Coordenação da Igreja**
- **Secretaria**
- **Tesoureiro**
- **Padre**
- **Fiéis** (apenas visualização de relatórios)

## Funcionalidades Principais

1. **Controle de Gastos:**
   - Registro de despesas e receitas mensais.
   - Classificação de gastos por categorias (manutenção, eventos, salários, etc.).

2. **Mapeamento de Estoque:**
   - Controle de entrada e saída de bens de consumo (materiais de limpeza, alimentos, etc.).
   - Inventário de bens duráveis (cadeiras, instrumentos musicais, etc.).
   - Alerta para reabastecimento de estoque.

3. **Relatórios:**
   - Relatórios financeiros mensais, trimestrais e anuais.
   - Relatórios de inventário e uso de bens de consumo.
   - Acesso restrito de fiéis para visualização de relatórios financeiros e de inventário.
   - (Draft) Razão contábil com plano de contas e gerador de relatório textual – veja `docs/financial-capabilities.md` para ver o que já pode ser exercitado enquanto a API/telas não chegam.

4. **Gestão de Usuários:**
   - Sistema de autenticação e autorização.
   - Diferentes níveis de acesso (Coordenação, Secretaria, Tesoureiro, Padre, Fiéis).

## Tecnologias Utilizadas

- **Frontend:**
  - HTML, CSS, JavaScript
  - Frameworks: React.js (a estrutura para o frontend continua reservada em `src/frontend`)

- **Backend:**
  - Java 21
  - HTTP server leve (`FinanceHttpServer`) com endpoints JSON/PDF/CSV para o razão e consolidado
  - Autenticação simplificada via `/api/auth/login` e `/api/auth/refresh` com tokens Bearer
  - Build/Test: script `./mvnw` (wrapper customizado que usa `javac` e o executor de testes interno)

- **Persistência:**
  - Implementações em memória e repositório em arquivo (`DatabaseLedgerRepository`) para manter trilhas auditáveis do razão
  - Repositório JDBC (`SqlLedgerRepository` + `JdbcLedgerGateway`) que escreve na tabela `ledger_entries` (DDL em `infra/sql/ledger-postgres.sql`), ativado ao definir `FINANCE_DB_URL`

## Estrutura do Projeto

> Estrutura auditada em: 2025-11-14

- **README.md**: Documento atual com visão geral, instruções e mapa de diretórios.
- **pom.xml**: Mantido apenas para referência histórica; o fluxo de build usa o script `./mvnw`.
- **mvnw**: Script responsável por compilar o código (`javac`) e executar a suíte de testes personalizada.
- **src/main/java/com/ecoeclesia/**: Código-fonte principal organizado em módulos (`config`, `expense`, `revenue`, `inventory`, `finance`, `access`, `user`).
- **src/test/java/com/ecoeclesia/**: Testes automatizados escritos com o mini framework localizado em `com.ecoeclesia.testing`.
- **src/frontend/**: Placeholder para o frontend planejado.

## Instalação e Execução

### Pré-requisitos

- Java Development Kit (JDK) 21 ou superior disponível no `PATH`.
- Bash (para executar o script `./mvnw`).

### Passo a passo

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/EcoEcclesia.git
    cd EcoEcclesia
    ```

2. Execute a suíte de testes automatizados do backend:
    ```sh
    ./mvnw test
    ```
    O script irá:
    - Limpar/gerar o diretório `target/`
    - Compilar `src/main/java` e `src/test/java` com `javac`
    - Executar `com.ecoeclesia.testing.TestRunner`, que reporta o status de cada teste

3. (Opcional) Faça uma verificação manual executando a classe principal:
    ```sh
    ./mvnw run
    ```
    Isso irá apenas compilar os artefatos (se necessário) e executar `com.ecoeclesia.EcoEcclesiaApplication` para um pequeno smoke test em linha de comando.

4. (Opcional) Usar Postgres real para o razão:
    ```sh
    export FINANCE_DB_URL="jdbc:postgresql://localhost:5432/ecoeclesia"
    export FINANCE_DB_USER=seu_usuario
    export FINANCE_DB_PASSWORD=senha
    ./mvnw run
    ```
    O servidor HTTP irá aplicar automaticamente o DDL de `infra/sql/ledger-postgres.sql` para criar a tabela `ledger_entries` caso ela não exista.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch com sua feature ou correção de bug:
    ```sh
    git checkout -b minha-feature
    ```
3. Commit suas mudanças:
    ```sh
    git commit -m 'Minha nova feature'
    ```
4. Envie para a branch original:
    ```sh
    git push origin minha-feature
    ```
5. Crie um pull request.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
