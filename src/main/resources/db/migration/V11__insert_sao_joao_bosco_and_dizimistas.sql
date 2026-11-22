-- V11__insert_sao_joao_bosco_and_dizimistas.sql
-- Inserção da comunidade "São João Bosco" e dos dizimistas da pastoral do dízimo (ficha física).

-- 1. Garante que a coluna is_steward exista na tabela members
ALTER TABLE members ADD COLUMN IF NOT EXISTS is_steward BOOLEAN NOT NULL DEFAULT false;

-- 2. Insere a comunidade "São João Bosco"
INSERT INTO communities (id, name, code, is_main_parish, created_at, updated_at)
VALUES (gen_random_uuid(), 'São João Bosco', 'SJB', false, now(), now())
ON CONFLICT (code) DO UPDATE 
SET name = EXCLUDED.name, is_main_parish = EXCLUDED.is_main_parish, updated_at = now();

-- 3. Insere os 45 membros dizimistas da Capela São João Bosco
INSERT INTO members (id, community_id, name, birth_date, ministry, status, is_steward, created_at, updated_at)
SELECT 
    gen_random_uuid(),
    c.id,
    d.name,
    d.birth_date::date,
    'Pastoral do Dízimo',
    'ATIVO',
    true,
    now(),
    now()
FROM (VALUES
    ('Zuleica Ramos Alves', '1970-08-05'),
    ('Ágda B. Silva', '1970-03-22'),
    ('Maria José Silva', '1970-05-31'),
    ('Maria do Carmo Silva', '1970-12-29'),
    ('João Araújo', '1970-10-27'),
    ('Raimundo Silva', '1970-03-20'),
    ('Jarlene Maria Oliveira', '1970-05-10'),
    ('Celina Dias Pereira', '1970-01-25'),
    ('Rosângela Maria Oliveira', '1970-11-19'),
    ('Carlos Antônio Silva', '1970-02-25'),
    ('Maria Gorete', '1970-09-03'),
    ('Edileuza Félix', '1970-11-23'),
    ('Cristina Célia Peixoto', '1970-07-03'),
    ('Célia Guedes', '1970-03-15'),
    ('Espinaldo Barbosa', '1970-03-10'),
    ('Helena Maria Almeida', '1970-07-26'),
    ('Marcos A. Rangel', '1970-10-01'),
    ('Ivanilde Guedes', '1970-01-22'),
    ('Iracema Pereira', '1970-08-28'),
    ('Dionilde Pereira', '1970-05-03'),
    ('Gilda Maria Oliveira', '1970-03-25'),
    ('Catarina R. Guedes', '1970-08-04'),
    ('Maria Gorete Souza', '1970-05-23'),
    ('Nilma Pereira', '1970-12-23'),
    ('Ana Gomes da Silva', '1970-02-16'),
    ('Ronaldo Teófilo', '1970-06-15'),
    ('Sandra L. Sousa', '1970-06-15'),
    ('Simone Maria Santos', '1970-06-05'),
    ('Gracilene Ferreira', '1970-01-03'),
    ('Edilza Maria Oliveira', '1970-09-13'),
    ('Maria do Socorro Santos', '1970-11-16'),
    ('Valmir Silva Santos', '1970-05-10'),
    ('Otávio Cândido Santos', '1970-03-07'),
    ('Natália Almeida', '1970-09-05'),
    ('Fabiana Costa Silva', '1970-10-03'),
    ('Lidiane Paula', '1970-10-09'),
    ('Marluce Duarte', '1970-10-08'),
    ('Ana Pires', '1970-09-05'),
    ('Maria Anita Paiva', '1970-06-20'),
    ('Josi Sebastião Félix', '1970-03-15'),
    ('Gerlane Pereira', '1970-10-07'),
    ('Edivaldo Barbosa', '1970-06-08'),
    ('João Paulo', '1970-06-15'),
    ('Joanna Alves', '1970-06-28'),
    ('Alberto Vieira', '1970-07-20')
) AS d(name, birth_date)
CROSS JOIN (
    SELECT id FROM communities WHERE code = 'SJB' LIMIT 1
) c
WHERE NOT EXISTS (
    SELECT 1 FROM members m 
    WHERE m.community_id = c.id AND m.name = d.name
);

-- 4. Insere os registros correspondentes na tabela stewards
INSERT INTO stewards (id, member_id, start_date, status, notes, created_at, updated_at)
SELECT 
    gen_random_uuid(),
    m.id,
    CURRENT_DATE,
    'ATIVO',
    'Ficha da Pastoral do Dízimo - Capela São João Bosco',
    now(),
    now()
FROM members m
JOIN communities c ON m.community_id = c.id
WHERE c.code = 'SJB'
  AND NOT EXISTS (
      SELECT 1 FROM stewards s WHERE s.member_id = m.id
  );
