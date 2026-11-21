-- V13__add_inactive_reason_to_members.sql
-- Adiciona a coluna inactive_reason para armazenar o motivo da inativação pastoral do membro.

ALTER TABLE members ADD COLUMN IF NOT EXISTS inactive_reason VARCHAR(255);
