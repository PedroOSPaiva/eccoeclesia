-- V5__create_communities.sql
-- Criação da tabela de comunidades (Matriz e Capelas) e seed inicial da Matriz Paroquial.

CREATE TABLE IF NOT EXISTS communities (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(32) NOT NULL UNIQUE,
    is_main_parish BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_communities_code ON communities (code);

-- Seed inicial da Matriz Paroquial
INSERT INTO communities (id, name, code, is_main_parish)
VALUES ('c0000000-0000-0000-0000-000000000001', 'Matriz Paroquial', 'MATRIZ', true)
ON CONFLICT (id) DO NOTHING;
