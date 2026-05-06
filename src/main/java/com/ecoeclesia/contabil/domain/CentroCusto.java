package com.ecoeclesia.contabil.domain;

import com.ecoeclesia.shared.tenant.TenantAwareEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.Filter;
import java.util.UUID;

@Entity
@Table(name = "centro_custo")
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public class CentroCusto extends TenantAwareEntity {
    @Id private UUID id;
    private Integer codigo;
    private String nome;
    private boolean ativo = true;
}
