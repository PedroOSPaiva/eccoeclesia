package com.ecoeclesia.admin.domain;

import com.ecoeclesia.shared.tenant.TenantAwareEntity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tenant")
public class Tenant extends TenantAwareEntity {
    @Id
    private UUID id;
    private String nome;
    @Enumerated(EnumType.STRING)
    private TipoTenant tipo;
    @Column(name = "parent_tenant_id")
    private UUID parentTenantId;
    @Enumerated(EnumType.STRING)
    private StatusTenant status;
    @Enumerated(EnumType.STRING)
    private PlanoTenant plano;
    private LocalDate dataExpiracao;
}

enum TipoTenant { DIOCESE, PAROQUIA, COMUNIDADE }
enum StatusTenant { ATIVO, INATIVO, TRIAL }
enum PlanoTenant { FREE, PAGO }
