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

4. **Gestão de Usuários:**
   - Sistema de autenticação e autorização.
   - Diferentes níveis de acesso (Coordenação, Secretaria, Tesoureiro, Padre, Fiéis).

## Tecnologias Utilizadas

- **Frontend:**
  - HTML, CSS, JavaScript
  - Frameworks: React.js

- **Backend:**
  - Java
  - Framework: Spring Boot
  - Build: Maven

- **Banco de Dados:**
  - MongoDB

- **Autenticação:**
  - JWT (JSON Web Tokens)

- **Hospedagem:**
  - Heroku / AWS

## Estrutura do Projeto

### Descrição dos Diretórios

> Estrutura auditada em: 2025-11-07

- **README.md**: Documento atual com visão geral, instruções e mapa de diretórios.
- **pom.xml**: Arquivo de configuração do Maven para a aplicação Spring Boot.
- **.gitignore**: Configuração de arquivos e diretórios ignorados pelo Git.
- **src/main/java/com/ecoeclesia/**: Código-fonte principal da aplicação Spring Boot (`EcoEcclesiaApplication.java`).
- **src/main/resources/**: Arquivos de configuração (por exemplo, `application.properties`).
- **src/test/java/com/ecoeclesia/**: Testes automatizados (`EcoEcclesiaApplicationTests.java`).

> **Estrutura proposta**: o diretório `src/frontend/` mencionado no planejamento inicial ainda não foi criado. Permanecerá documentado assim que os artefatos do frontend forem adicionados ao repositório.

### Próximos Passos

- [ ] Solicitar revisão da documentação de estrutura para outro membro da equipe, garantindo que o mapeamento reflita o estado atual do repositório.

## Instalação e Execução

### Pré-requisitos

- Java Development Kit (JDK) 21 ou superior disponível no `PATH`.
- Maven 3.9+ instalado ou acesso ao wrapper do Maven (`./mvnw`).
- (Opcional) Um servidor MongoDB disponível. A aplicação utiliza a variável de ambiente `MONGODB_URI` para configurar a conexão (padrão: `mongodb://localhost:27017/ecoeclesia`).

### Passo a passo

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/EcoEcclesia.git
    cd EcoEcclesia
    ```

2. Compile o projeto e baixe as dependências:
    ```sh
    mvn clean verify
    ```

3. Inicie a API Spring Boot:
    ```sh
    mvn spring-boot:run
    ```

   - Para utilizar uma instância específica do MongoDB, exporte a variável de ambiente antes de iniciar:
     ```sh
     export MONGODB_URI="mongodb://usuario:senha@host:27017/ecoeclesia"
     mvn spring-boot:run
     ```

4. A API ficará disponível em `http://localhost:8080`. Você pode verificar o estado do serviço acessando `http://localhost:8080/health`.

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
