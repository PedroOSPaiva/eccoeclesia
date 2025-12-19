-- Sample ledger entries to quickly verify Postgres persistence
-- Run after applying infra/sql/ledger-postgres.sql
INSERT INTO ledger_entries (id, account_code, reference_code, cost_center, description, amount, type, occurred_on, created_at, updated_at) VALUES
  ('seed-2024-jan-tithe', '1.1.01', 'REF-2024-001', 'Paróquia São João', 'Dízimos de janeiro', 12500.00, 'INCOME', DATE '2024-01-10', now(), now()),
  ('seed-2024-jan-offering', '1.1.02', 'REF-2024-002', 'Paróquia São João', 'Ofertas das missas do domingo', 4800.00, 'INCOME', DATE '2024-01-14', now(), now()),
  ('seed-2024-jan-catechism', '1.1.08', 'REF-2024-003', 'Catequese', 'Inscrições de catequese', 2100.00, 'INCOME', DATE '2024-01-20', now(), now()),
  ('seed-2024-jan-utilities', '2.1.01', 'REF-2024-004', 'Administração', 'Água, luz e internet do mês', 1520.35, 'EXPENSE', DATE '2024-01-05', now(), now()),
  ('seed-2024-jan-liturgical', '2.3.01', 'REF-2024-005', 'Liturgia', 'Velas, hóstias e paramentos', 890.00, 'EXPENSE', DATE '2024-01-12', now(), now()),
  ('seed-2024-jan-social', '2.4.01', 'REF-2024-006', 'Ação Social', 'Cestas básicas famílias cadastradas', 1750.00, 'EXPENSE', DATE '2024-01-18', now(), now());
