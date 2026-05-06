ALTER TABLE tenant DROP COLUMN IF EXISTS tenant_id;

ALTER TABLE contribuicao
    ADD CONSTRAINT fk_contribuicao_dizimista FOREIGN KEY (dizimista_id) REFERENCES dizimista(id);

ALTER TABLE receita
    ADD CONSTRAINT fk_receita_cc FOREIGN KEY (centro_custo_id) REFERENCES centro_custo(id),
    ADD CONSTRAINT fk_receita_pc FOREIGN KEY (plano_contas_id) REFERENCES plano_contas(id),
    ADD CONSTRAINT fk_receita_dizimista FOREIGN KEY (dizimista_id) REFERENCES dizimista(id),
    ADD CONSTRAINT fk_receita_contribuicao FOREIGN KEY (contribuicao_id) REFERENCES contribuicao(id);

CREATE INDEX IF NOT EXISTS idx_dizimista_tenant ON dizimista(tenant_id);
CREATE INDEX IF NOT EXISTS idx_receita_tenant ON receita(tenant_id);
CREATE INDEX IF NOT EXISTS idx_plano_contas_tenant_codigo ON plano_contas(tenant_id, codigo);
