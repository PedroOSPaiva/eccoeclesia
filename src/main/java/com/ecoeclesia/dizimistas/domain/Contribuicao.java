package com.ecoeclesia.dizimistas.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.UUID;

@Entity
@Table(name = "contribuicao")
public class Contribuicao {
    @Id private UUID id;
    private UUID dizimistaId;
    private YearMonth mesAno;
    private BigDecimal valor;
    @Enumerated(EnumType.STRING)
    private TipoContribuicao tipo;
    private LocalDate dataPagamento;
}

enum TipoContribuicao { MENSAL, AVULSO }
