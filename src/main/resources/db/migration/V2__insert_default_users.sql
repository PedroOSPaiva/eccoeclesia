-- V2__insert_default_users.sql
-- Inserção dos usuários padrão do sistema EcoEcclesia com roles mapeadas em user_roles
-- Senha padrão para todos: "Senhainicial123"
-- Hash SHA-256 Base64: paNc6gf3UjajpFgYUlF074bT5Vh8s6HC0EgR10LRaq4=

-- 1. Administrador (Role: ADMIN)
INSERT INTO users (id, email, password)
VALUES ('a0000000-0000-0000-0000-000000000001', 'admin@ecoeclesia.com', 'paNc6gf3UjajpFgYUlF074bT5Vh8s6HC0EgR10LRaq4=')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role)
VALUES ('a0000000-0000-0000-0000-000000000001', 'ADMIN')
ON CONFLICT (user_id, role) DO NOTHING;

-- 2. Presidente (Role: ADMIN)
INSERT INTO users (id, email, password)
VALUES ('a0000000-0000-0000-0000-000000000002', 'presidente@ecoeclesia.com', 'paNc6gf3UjajpFgYUlF074bT5Vh8s6HC0EgR10LRaq4=')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role)
VALUES ('a0000000-0000-0000-0000-000000000002', 'ADMIN')
ON CONFLICT (user_id, role) DO NOTHING;

-- 3. Financeiro / Tesoureiro (Role: FINANCE)
INSERT INTO users (id, email, password)
VALUES ('a0000000-0000-0000-0000-000000000003', 'finance@ecoeclesia.com', 'paNc6gf3UjajpFgYUlF074bT5Vh8s6HC0EgR10LRaq4=')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role)
VALUES ('a0000000-0000-0000-0000-000000000003', 'FINANCE')
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO users (id, email, password)
VALUES ('a0000000-0000-0000-0000-000000000004', 'tesoureiro@ecoeclesia.com', 'paNc6gf3UjajpFgYUlF074bT5Vh8s6HC0EgR10LRaq4=')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role)
VALUES ('a0000000-0000-0000-0000-000000000004', 'FINANCE')
ON CONFLICT (user_id, role) DO NOTHING;

-- 4. Voluntário / Membro (Role: VOLUNTEER)
INSERT INTO users (id, email, password)
VALUES ('a0000000-0000-0000-0000-000000000005', 'volunteer@ecoeclesia.com', 'paNc6gf3UjajpFgYUlF074bT5Vh8s6HC0EgR10LRaq4=')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role)
VALUES ('a0000000-0000-0000-0000-000000000005', 'VOLUNTEER')
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO users (id, email, password)
VALUES ('a0000000-0000-0000-0000-000000000006', 'membro@ecoeclesia.com', 'paNc6gf3UjajpFgYUlF074bT5Vh8s6HC0EgR10LRaq4=')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role)
VALUES ('a0000000-0000-0000-0000-000000000006', 'VOLUNTEER')
ON CONFLICT (user_id, role) DO NOTHING;

