package com.ecoeclesia.dizimistas.domain;

import com.ecoeclesia.shared.tenant.TenantAwareEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.Filter;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "dizimista")
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public class Dizimista extends TenantAwareEntity {
    @Id private UUID id;
    private String nome;
    private String cpf;
    private LocalDate dataNascimento;
    private String endereco;
    private String telefone;
    private String email;
    private LocalDate dataCadastro;
}
