-- V12__create_parish_leadership.sql
-- Tabela para gerenciamento dos responsáveis e liderança paroquial (Pároco, Vigários, etc.)
-- Utilizada nos relatórios oficiais em PDF e prestação de contas.

CREATE TABLE IF NOT EXISTS parish_leadership (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_parish_leadership_active ON parish_leadership (active, display_order);

-- Seed inicial de liderança paroquial
INSERT INTO parish_leadership (id, name, role, active, display_order)
VALUES 
    ('e0000000-0000-0000-0000-000000000001', 'Pe. João Silva', 'Pároco', true, 1),
    ('e0000000-0000-0000-0000-000000000002', 'Pe. Antônio', 'Vigário Paroquial', true, 2)
ON CONFLICT (id) DO NOTHING;
