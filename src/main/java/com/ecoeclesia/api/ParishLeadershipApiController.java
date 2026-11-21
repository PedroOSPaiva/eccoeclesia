package com.ecoeclesia.api;

import com.ecoeclesia.leadership.ParishLeader;
import com.ecoeclesia.leadership.ParishLeadershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parish-leadership")
public class ParishLeadershipApiController {

    private final ParishLeadershipService service;

    @Autowired
    public ParishLeadershipApiController(ParishLeadershipService service) {
        this.service = service;
    }

    public record ParishLeaderDto(String id, String name, String role, boolean active, int displayOrder) {
        public static ParishLeaderDto from(ParishLeader entity) {
            return new ParishLeaderDto(entity.id(), entity.name(), entity.role(), entity.active(), entity.displayOrder());
        }

        public ParishLeader toEntity() {
            return new ParishLeader(id, name, role, active, displayOrder);
        }
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<ParishLeaderDto> listLeaders(@RequestParam(defaultValue = "false") boolean onlyActive) {
        List<ParishLeader> list = onlyActive ? service.listActive() : service.listAll();
        return list.stream().map(ParishLeaderDto::from).toList();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ParishLeaderDto> createLeader(@RequestBody ParishLeaderDto dto) {
        if (dto.name() == null || dto.name().isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (dto.role() == null || dto.role().isBlank()) {
            throw new IllegalArgumentException("Função é obrigatória");
        }
        ParishLeader saved = service.save(dto.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(ParishLeaderDto.from(saved));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ParishLeaderDto> updateLeader(@PathVariable String id, @RequestBody ParishLeaderDto dto) {
        if (dto.name() == null || dto.name().isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (dto.role() == null || dto.role().isBlank()) {
            throw new IllegalArgumentException("Função é obrigatória");
        }
        ParishLeader toUpdate = new ParishLeader(id, dto.name(), dto.role(), dto.active(), dto.displayOrder());
        ParishLeader saved = service.save(toUpdate);
        return ResponseEntity.ok(ParishLeaderDto.from(saved));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteLeader(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
