-- V10__add_member_id_to_revenues_and_ledger.sql
-- Vincula dízimos e entradas contábeis diretamente aos membros da comunidade.

ALTER TABLE revenues ADD COLUMN IF NOT EXISTS member_id UUID REFERENCES members(id) ON DELETE SET NULL;
ALTER TABLE ledger_entries ADD COLUMN IF NOT EXISTS member_id UUID REFERENCES members(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_revenues_member ON revenues (member_id);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_member ON ledger_entries (member_id);
