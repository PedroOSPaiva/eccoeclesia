CREATE TABLE IF NOT EXISTS ledger_entries (
    id VARCHAR(64) PRIMARY KEY,
    account_code VARCHAR(32) NOT NULL,
    reference_code VARCHAR(64),
    cost_center VARCHAR(64),
    description TEXT NOT NULL,
    amount NUMERIC(19,2) NOT NULL,
    type VARCHAR(16) NOT NULL,
    occurred_on DATE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ledger_entries_date ON ledger_entries (occurred_on);
