package com.ecoeclesia.dizimistas.application;

import com.ecoeclesia.dizimistas.api.DizimistaResumoDTO;
import com.ecoeclesia.dizimistas.infrastructure.DizimistaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DizimistaService {
    private final DizimistaRepository repository;

    public DizimistaService(DizimistaRepository repository) { this.repository = repository; }

    public List<DizimistaResumoDTO> listarAniversariantes(Integer mes, Integer ano) {
        return repository.findAniversariantes(mes, ano).stream()
            .map(d -> new DizimistaResumoDTO(d.getId(), d.getNome(), d.getDataNascimento(), "Comunidade padrão"))
            .toList();
    }
}
