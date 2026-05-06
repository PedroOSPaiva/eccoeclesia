package com.ecoeclesia.dizimistas.infrastructure;

import com.ecoeclesia.dizimistas.domain.Dizimista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface DizimistaRepository extends JpaRepository<Dizimista, UUID> {
    @Query("""
        select d from Dizimista d
        where month(d.dataNascimento) = :mes
          and (:ano is null or year(d.dataNascimento) <= :ano)
    """)
    List<Dizimista> findAniversariantes(Integer mes, Integer ano);
}
