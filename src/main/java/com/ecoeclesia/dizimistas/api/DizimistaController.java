package com.ecoeclesia.dizimistas.api;

import com.ecoeclesia.dizimistas.application.DizimistaService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dizimistas")
public class DizimistaController {
    private final DizimistaService service;

    public DizimistaController(DizimistaService service) { this.service = service; }

    @GetMapping("/aniversariantes")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','PADRE','COORDENADOR','TESOUREIRO','SECRETARIO','FIEL')")
    public List<DizimistaResumoDTO> aniversariantes(@RequestParam Integer mes, @RequestParam Integer ano) {
        return service.listarAniversariantes(mes, ano);
    }
}
