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
  - Framework: Spring

- **Banco de Dados:**
  - MongoDB

- **Autenticação:**
  - JWT (JSON Web Tokens)

- **Hospedagem:**
  - Heroku / AWS

## Estrutura do Projeto


### Descrição dos Diretórios

- **src/EcoEcclesia/application/services**: Contém a lógica de aplicação, onde os casos de uso do sistema são definidos. Estes serviços orquestram a lógica de negócios e coordenam a comunicação entre os domínios e as interfaces.

- **src/EcoEcclesia/domain/models**: Contém os modelos de domínio que representam as entidades principais do negócio. Esses modelos encapsulam a lógica de negócios e as regras de validação.

- **src/EcoEcclesia/infrastructure/controllers**: Contém os controladores que lidam com as requisições HTTP, delegando a lógica de negócios para os serviços de aplicação.

- **src/EcoEcclesia/infrastructure/persistence**: Contém as implementações dos repositórios para persistência de dados. Essas implementações são responsáveis por interagir com a base de dados ou qualquer outro mecanismo de armazenamento.

- **src/EcoEcclesia/infrastructure/routes**: Contém as definições das rotas da aplicação. Este módulo define quais URLs estão disponíveis e quais controladores devem ser acionados para cada rota.

- **src/EcoEcclesia/infrastructure/middleware**: Contém os middlewares usados na aplicação, como autenticação, autorização, manipulação de erros, etc.

- **src/EcoEcclesia/interfaces/rest**: Contém os adaptadores de interface REST. Esses adaptadores lidam com as entradas e saídas do sistema via HTTP.

- **src/EcoEcclesia/interfaces/cli**: Contém os adaptadores de interface de linha de comando. Esses adaptadores lidam com as entradas e saídas do sistema via linha de comando.

- **src/frontend/**: Contém todo o código relacionado ao frontend da aplicação, incluindo componentes React, páginas e assets públicos.

- **app.js**: Ponto de entrada da aplicação backend.

## Instalação e Execução

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/EcoEcclesia.git
    cd EcoEcclesia
    ```

2. Instale as dependências:
    ```sh
    yarn install
    ```

3. Inicie a aplicação:
    ```sh
    yarn start
    ```

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
