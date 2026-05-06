CREATE TABLE IF NOT EXISTS tenant (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    parent_tenant_id UUID,
    status VARCHAR(20) NOT NULL,
    plano VARCHAR(20) NOT NULL,
    data_expiracao DATE
);

CREATE TABLE IF NOT EXISTS centro_custo (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    codigo INTEGER NOT NULL,
    nome VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS plano_contas (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    codigo VARCHAR(40) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    naturez VARCHAR(20) NOT NULL,
    parent_id UUID
);

CREATE TABLE IF NOT EXISTS dizimista (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14),
    data_nascimento DATE NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(30),
    email VARCHAR(255),
    data_cadastro DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS contribuicao (
    id UUID PRIMARY KEY,
    dizimista_id UUID NOT NULL,
    mes_ano VARCHAR(7) NOT NULL,
    valor NUMERIC(14,2) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    data_pagamento DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS receita (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    centro_custo_id UUID NOT NULL,
    plano_contas_id UUID NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    valor NUMERIC(14,2) NOT NULL,
    data DATE NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    usuario_criador_id UUID NOT NULL,
    dizimista_id UUID,
    contribuicao_id UUID
);

INSERT INTO plano_contas (id, tenant_id, codigo, descricao, tipo, naturez, parent_id)
VALUES ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000001', '4.03.01.01.01.00011', 'Dízimos', 'POSTAVEL', 'CREDORA', NULL)
ON CONFLICT DO NOTHING;
