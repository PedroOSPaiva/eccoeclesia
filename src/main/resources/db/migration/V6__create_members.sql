-- V6__create_members.sql
-- Criação do centro pastoral de membros da paróquia/comunidades.

CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY,
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    phone VARCHAR(50),
    email VARCHAR(255),
    ministry VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_members_community ON members (community_id);
CREATE INDEX IF NOT EXISTS idx_members_name ON members (name);
CREATE INDEX IF NOT EXISTS idx_members_status ON members (status);
