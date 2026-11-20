# Smoke test do ledger no Postgres

Use este roteiro para popular rapidamente a tabela `ledger_entries`, conferir se o DDL foi aplicado e validar os relatórios consumindo o banco real.

## Pré-requisitos
- Postgres acessível
- Variáveis de ambiente configuradas para o backend:
  ```bash
  export FINANCE_DB_URL="postgres://usuario:senha@localhost:5432/ecoeclesia"
  # ou use DATABASE_URL; FINANCE_DB_USER/FINANCE_DB_PASSWORD são opcionais
  ```

## 1. Aplicar DDL e subir o servidor
```bash
# Garante as tabelas/índices
psql "$FINANCE_DB_URL" -f infra/sql/ledger-postgres.sql

# Sobe o HTTP server já apontando para o Postgres
./mvnw run
```

## 2. Popular dados de exemplo no banco
Com o servidor desligado ou ligado, rode:
```bash
psql "$FINANCE_DB_URL" -f infra/sql/ledger-sample-data.sql
```
Isso insere receitas e despesas usando códigos do plano de contas (1.1.01 dízimos, 1.1.02 ofertas, 1.1.08 catequese, 2.1.01 utilidades, 2.3.01 liturgia, 2.4.01 ação social).

## 3. Conferir via API protegida
Autentique com um usuário de finanças configurado via `ECOECCLESIA_SEED_USERS` e consulte:
```bash
# Login para obter o token
curl -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"financeiro@exemplo.org","password":"SENHA_FORTE_AQUI"}'

# Listar lançamentos (período opcional)
curl -H "Authorization: Bearer $TOKEN" \
  'http://localhost:8080/api/ledger?start=2024-01-01&end=2024-01-31'

# Exportar PDF/CSV com o mesmo filtro
curl -H "Authorization: Bearer $TOKEN" -o relatorio.pdf \
  'http://localhost:8080/api/reports/ledger.pdf?start=2024-01-01&end=2024-01-31'

curl -H "Authorization: Bearer $TOKEN" -o relatorio.csv \
  'http://localhost:8080/api/reports/ledger.csv?start=2024-01-01&end=2024-01-31'
```

## 4. Conferir diretamente no banco
```bash
psql "$FINANCE_DB_URL" -c "SELECT count(*) FROM ledger_entries;"
psql "$FINANCE_DB_URL" -c "SELECT id, account_code, type, amount, occurred_on FROM ledger_entries ORDER BY occurred_on;"
```

## 5. Frontend (opcional)
Com o backend rodando em `localhost:8080` e o Postgres configurado, suba a UI:
```bash
cd src/frontend
npm install
npm run dev -- --host --port 5173
```
Faça login com um usuário financeiro e abra o menu **Financeiro** para ver os lançamentos persistidos no banco.
