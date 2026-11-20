-- V7__create_stewards.sql
-- Criação do controle de dizimistas vinculado aos membros fiéis.

CREATE TABLE IF NOT EXISTS stewards (
    id UUID PRIMARY KEY,
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    envelope_number VARCHAR(50),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_stewards_member ON stewards (member_id);
CREATE INDEX IF NOT EXISTS idx_stewards_envelope ON stewards (envelope_number);
