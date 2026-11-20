package com.ecoeclesia.api;

import com.ecoeclesia.member.Member;
import com.ecoeclesia.member.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/members")
@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE', 'VOLUNTEER')")
public class MemberApiController {

    private final MemberRepository memberRepository;

    public MemberApiController(MemberRepository memberRepository) {
        this.memberRepository = Objects.requireNonNull(memberRepository);
    }

    public record MemberRequestDto(
            String communityId,
            String name,
            LocalDate birthDate,
            String phone,
            String email,
            String ministry,
            String status
    ) {}

    @GetMapping
    public List<Member> list(@RequestParam(required = false) String communityId) {
        if (communityId != null && !communityId.isBlank()) {
            return memberRepository.findByCommunityId(communityId);
        }
        return memberRepository.findAll();
    }

    @GetMapping("/{id}")
    public Member getById(@PathVariable String id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Membro não encontrado: " + id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Member create(@RequestBody MemberRequestDto request) {
        if (request == null || request.name() == null || request.name().isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (request.communityId() == null || request.communityId().isBlank()) {
            throw new IllegalArgumentException("Comunidade é obrigatória");
        }
        Member member = Member.create(
                request.communityId(),
                request.name(),
                request.birthDate(),
                request.phone(),
                request.email(),
                request.ministry()
        );
        if (request.status() != null && !request.status().isBlank()) {
            member = new Member(
                    member.id(),
                    member.communityId(),
                    member.name(),
                    member.birthDate(),
                    member.phone(),
                    member.email(),
                    member.ministry(),
                    request.status(),
                    member.createdAt(),
                    member.updatedAt()
            );
        }
        return memberRepository.save(member);
    }

    @PutMapping("/{id}")
    public Member update(@PathVariable String id, @RequestBody MemberRequestDto request) {
        Member existing = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Membro não encontrado: " + id));

        String commId = (request != null && request.communityId() != null && !request.communityId().isBlank())
                ? request.communityId()
                : existing.communityId();
        String name = (request != null && request.name() != null && !request.name().isBlank())
                ? request.name()
                : existing.name();
        LocalDate birthDate = (request != null && request.birthDate() != null) ? request.birthDate() : existing.birthDate();
        String phone = (request != null && request.phone() != null) ? request.phone() : existing.phone();
        String email = (request != null && request.email() != null) ? request.email() : existing.email();
        String ministry = (request != null && request.ministry() != null) ? request.ministry() : existing.ministry();
        String status = (request != null && request.status() != null && !request.status().isBlank())
                ? request.status()
                : existing.status();

        Member updated = new Member(
                existing.id(),
                commId,
                name,
                birthDate,
                phone,
                email,
                ministry,
                status,
                existing.createdAt(),
                Instant.now()
        );
        return memberRepository.save(updated);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        memberRepository.deleteById(id);
    }
}
