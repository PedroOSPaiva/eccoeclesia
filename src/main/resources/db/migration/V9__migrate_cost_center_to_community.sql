-- V9__migrate_cost_center_to_community.sql
-- Migração e saneamento dos centros de custo textuais para as comunidades relacionais correspondentes.

-- 1. Cria comunidades baseadas nos valores distintos de cost_center em ledger_entries (caso ainda não existam)
INSERT INTO communities (id, name, code, is_main_parish)
SELECT 
    gen_random_uuid(),
    TRIM(cost_center),
    UPPER(SUBSTRING(REGEXP_REPLACE(TRIM(cost_center), '[^a-zA-Z0-9]', '', 'g') FROM 1 FOR 32)),
    false
FROM ledger_entries
WHERE cost_center IS NOT NULL 
  AND TRIM(cost_center) <> ''
  AND NOT EXISTS (
      SELECT 1 FROM communities c 
      WHERE LOWER(c.name) = LOWER(TRIM(ledger_entries.cost_center))
         OR UPPER(c.code) = UPPER(SUBSTRING(REGEXP_REPLACE(TRIM(ledger_entries.cost_center), '[^a-zA-Z0-9]', '', 'g') FROM 1 FOR 32))
  )
GROUP BY TRIM(cost_center);

-- 2. Atualiza community_id em ledger_entries pelo nome correspondente
UPDATE ledger_entries le
SET community_id = c.id
FROM communities c
WHERE le.community_id IS NULL
  AND le.cost_center IS NOT NULL
  AND LOWER(TRIM(le.cost_center)) = LOWER(c.name);

-- 3. Para entradas sem comunidade vinculada, associa à Matriz principal
UPDATE ledger_entries
SET community_id = (SELECT id FROM communities WHERE is_main_parish = true LIMIT 1)
WHERE community_id IS NULL;

-- 4. Associa despesas, receitas e itens de inventário legados sem comunidade à Matriz principal
UPDATE expenses
SET community_id = (SELECT id FROM communities WHERE is_main_parish = true LIMIT 1)
WHERE community_id IS NULL;

UPDATE revenues
SET community_id = (SELECT id FROM communities WHERE is_main_parish = true LIMIT 1)
WHERE community_id IS NULL;

UPDATE inventory_items
SET community_id = (SELECT id FROM communities WHERE is_main_parish = true LIMIT 1)
WHERE community_id IS NULL;
