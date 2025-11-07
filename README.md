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

> Estrutura auditada em: 2025-11-07 (atualizada para refletir os artefatos finais)

- **README.md**: Documento atual com visão geral, instruções e mapa de diretórios.
- **LICENSE**: Licença MIT adotada pelo projeto.
- **pom.xml**: Arquivo de configuração do Maven para a aplicação Spring Boot e build do frontend.
- **.gitignore**: Configuração de arquivos e diretórios ignorados pelo Git.
- **src/main/java/com/ecoeclesia/**: Código-fonte principal da aplicação Spring Boot (`EcoEcclesiaApplication.java`) e módulos de domínio (autenticação, controle de gastos e inventário).
- **src/main/resources/**: Arquivos de configuração (por exemplo, `application.properties`).
- **src/test/java/com/ecoeclesia/**: Testes automatizados do backend.
- **src/frontend/**: Aplicação React com roteamento protegido, páginas de dashboard, despesas, inventário e relatórios, empacotada com Vite.

### Status do Projeto

- [x] Backend Spring Boot com autenticação JWT, gerenciamento de despesas e estoque.
- [x] Testes automatizados do backend (unitários e integração com MongoDB via Testcontainers).
- [x] Frontend React integrado aos endpoints do backend.
- [x] Documentação final (este arquivo) e definição de licença.

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

3. Execute a suíte de testes automatizados do backend:
    ```sh
    ./mvnw test
    ```

4. Inicie a API Spring Boot:
    ```sh
    mvn spring-boot:run
    ```

   - Para utilizar uma instância específica do MongoDB, exporte a variável de ambiente antes de iniciar:
     ```sh
     export MONGODB_URI="mongodb://usuario:senha@host:27017/ecoeclesia"
     mvn spring-boot:run
     ```

5. A API ficará disponível em `http://localhost:8080`. Você pode verificar o estado do serviço acessando `http://localhost:8080/health`.

### Executando o Frontend

1. Acesse o diretório do frontend:
   ```sh
   cd src/frontend
   ```
2. Instale as dependências e inicie o servidor de desenvolvimento (Vite):
   ```sh
   npm install
   npm run dev
   ```
3. A aplicação estará disponível em `http://localhost:5173`. Configure a variável de ambiente `VITE_API_BASE_URL` se precisar apontar para uma URL diferente da API.

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
