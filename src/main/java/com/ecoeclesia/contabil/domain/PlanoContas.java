package com.ecoeclesia.contabil.domain;

import com.ecoeclesia.shared.tenant.TenantAwareEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.Filter;
import java.util.UUID;

@Entity
@Table(name = "plano_contas")
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public class PlanoContas extends TenantAwareEntity {
    @Id private UUID id;
    private String codigo;
    private String descricao;
    @Enumerated(EnumType.STRING)
    private TipoPlanoConta tipo;
    @Enumerated(EnumType.STRING)
    private NaturezaConta naturez;
    private UUID parentId;

    public boolean isPostavel() { return tipo == TipoPlanoConta.POSTAVEL; }
}

enum TipoPlanoConta { TITULO, DETALHE, POSTAVEL }
enum NaturezaConta { DEVEDORA, CREDORA, BILATERAL }
