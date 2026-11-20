-- V8__add_community_id_to_financial.sql
-- Adiciona a coluna de escopo comunitário (community_id) nas tabelas do Razão, despesas, receitas e inventário.

ALTER TABLE ledger_entries ADD COLUMN IF NOT EXISTS community_id UUID REFERENCES communities(id) ON DELETE RESTRICT;
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS community_id UUID REFERENCES communities(id) ON DELETE RESTRICT;
ALTER TABLE revenues ADD COLUMN IF NOT EXISTS community_id UUID REFERENCES communities(id) ON DELETE RESTRICT;
ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS community_id UUID REFERENCES communities(id) ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS idx_ledger_entries_community ON ledger_entries (community_id);
CREATE INDEX IF NOT EXISTS idx_expenses_community ON expenses (community_id);
CREATE INDEX IF NOT EXISTS idx_revenues_community ON revenues (community_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_community ON inventory_items (community_id);
