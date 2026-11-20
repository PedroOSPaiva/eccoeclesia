-- V4__create_birthdays_table.sql
-- Criação da tabela de aniversariantes para substituir o armazenamento em CSV.

CREATE TABLE IF NOT EXISTS birthdays (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    ministry VARCHAR(255),
    contact VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_birthdays_birth_date ON birthdays (birth_date);
