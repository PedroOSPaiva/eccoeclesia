package com.ecoeclesia.financeiro.domain;

import com.ecoeclesia.shared.tenant.TenantAwareEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.Filter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "receita")
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public class Receita extends TenantAwareEntity {
    @Id private UUID id;
    private UUID centroCustoId;
    private UUID planoContasId;
    private String descricao;
    private BigDecimal valor;
    private LocalDate data;
    @Enumerated(EnumType.STRING)
    private TipoReceita tipo;
    private UUID usuarioCriadorId;
    private UUID dizimistaId;
    private UUID contribuicaoId;
}

enum TipoReceita { DIZIMO, FESTA_PADROEIRO, BINGO, RIFA, DOACAO, OUTRAS }
