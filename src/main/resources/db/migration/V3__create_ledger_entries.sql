-- V3__create_ledger_entries.sql
-- Oficialização da tabela de lançamentos contábeis (Razão) sob controle do Flyway
-- e inclusão de colunas de auditoria nas tabelas financeiras pré-existentes.

CREATE TABLE IF NOT EXISTS ledger_entries (
    id VARCHAR(64) PRIMARY KEY,
    account_code VARCHAR(32) NOT NULL,
    reference_code VARCHAR(64),
    cost_center VARCHAR(64),
    description TEXT NOT NULL,
    amount NUMERIC(19, 2) NOT NULL,
    type VARCHAR(16) NOT NULL,
    occurred_on DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ledger_entries_date ON ledger_entries (occurred_on);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_account ON ledger_entries (account_code);

-- PARTE 3: Auditoria e Integridade nas tabelas pré-existentes
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE revenues ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
