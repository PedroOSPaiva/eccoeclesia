package com.ecoeclesia.dizimistas.application;

import com.ecoeclesia.admin.domain.TenantRepository;
import com.ecoeclesia.dizimistas.api.DizimistaResumoDTO;
import com.ecoeclesia.dizimistas.infrastructure.DizimistaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DizimistaService {
    private final DizimistaRepository repository;
    private final TenantRepository tenantRepository;

    public DizimistaService(DizimistaRepository repository, TenantRepository tenantRepository) {
        this.repository = repository;
        this.tenantRepository = tenantRepository;
    }

    public List<DizimistaResumoDTO> listarAniversariantes(Integer mes, Integer ano) {
        return repository.findAniversariantes(mes, ano).stream()
            .map(d -> new DizimistaResumoDTO(
                d.getId(),
                d.getNome(),
                d.getDataNascimento(),
                tenantRepository.findById(d.getTenantId()).map(t -> t.getNome()).orElse("Comunidade não informada")
            ))
            .toList();
    }
}
