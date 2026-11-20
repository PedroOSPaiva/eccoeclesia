package com.ecoeclesia.api;

import com.ecoeclesia.community.Community;
import com.ecoeclesia.community.CommunityRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/communities")
public class CommunityApiController {

    private final CommunityRepository communityRepository;

    public CommunityApiController(CommunityRepository communityRepository) {
        this.communityRepository = Objects.requireNonNull(communityRepository);
    }

    public record CommunityRequestDto(String name, String code, Boolean isMainParish) {}

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<Community> list() {
        return communityRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Community getById(@PathVariable String id) {
        return communityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Comunidade não encontrada: " + id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Community create(@RequestBody CommunityRequestDto request) {
        if (request == null || request.name() == null || request.name().isBlank()) {
            throw new IllegalArgumentException("Nome da comunidade é obrigatório");
        }
        String code = (request.code() != null && !request.code().isBlank())
                ? request.code()
                : request.name().trim().replaceAll("\\s+", "-").toUpperCase();
        Community community = Community.create(
                request.name(),
                code,
                Boolean.TRUE.equals(request.isMainParish())
        );
        return communityRepository.save(community);
    }
}
