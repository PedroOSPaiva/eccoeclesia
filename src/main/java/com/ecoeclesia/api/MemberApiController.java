package com.ecoeclesia.api;

import com.ecoeclesia.member.Member;
import com.ecoeclesia.member.MemberRepository;
import com.ecoeclesia.steward.Steward;
import com.ecoeclesia.steward.StewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/members")
@PreAuthorize("hasAnyRole('ADMIN', 'FINANCE', 'VOLUNTEER')")
public class MemberApiController {

    private final MemberRepository memberRepository;
    private final StewardRepository stewardRepository;

    @Autowired
    public MemberApiController(MemberRepository memberRepository, StewardRepository stewardRepository) {
        this.memberRepository = Objects.requireNonNull(memberRepository);
        this.stewardRepository = stewardRepository;
    }

    public MemberApiController(MemberRepository memberRepository) {
        this(memberRepository, null);
    }

    public record MemberRequestDto(
            String communityId,
            String name,
            LocalDate birthDate,
            String phone,
            String email,
            String ministry,
            String status,
            String inactiveReason,
            Boolean isSteward
    ) {
        public MemberRequestDto(String communityId, String name, LocalDate birthDate, String phone, String email, String ministry, String status) {
            this(communityId, name, birthDate, phone, email, ministry, status, null, false);
        }

        public MemberRequestDto(String communityId, String name, LocalDate birthDate, String phone, String email, String ministry, String status, Boolean isSteward) {
            this(communityId, name, birthDate, phone, email, ministry, status, null, isSteward);
        }
    }

    public record MemberResponseDto(
            String id,
            String communityId,
            String name,
            LocalDate birthDate,
            String phone,
            String email,
            String ministry,
            String status,
            String inactiveReason,
            Instant createdAt,
            Instant updatedAt,
            Boolean isSteward
    ) {
        public static MemberResponseDto from(Member m, boolean isSteward) {
            return new MemberResponseDto(
                    m.id(),
                    m.communityId(),
                    m.name(),
                    m.birthDate(),
                    m.phone(),
                    m.email(),
                    m.ministry(),
                    m.status(),
                    m.inactiveReason(),
                    m.createdAt(),
                    m.updatedAt(),
                    isSteward
            );
        }
    }

    public record InactivateMemberRequest(String reason) {}

    @GetMapping
    public List<MemberResponseDto> list(@RequestParam(required = false) String communityId) {
        List<Member> members = (communityId != null && !communityId.isBlank())
                ? memberRepository.findByCommunityId(communityId)
                : memberRepository.findAll();

        Set<String> stewardMemberIds = Collections.emptySet();
        if (stewardRepository != null) {
            stewardMemberIds = stewardRepository.findAll().stream()
                    .filter(s -> "ACTIVE".equalsIgnoreCase(s.status()) || "ATIVO".equalsIgnoreCase(s.status()))
                    .map(Steward::memberId)
                    .collect(Collectors.toSet());
        }

        final Set<String> activeStewards = stewardMemberIds;
        return members.stream()
                .map(m -> {
                    boolean isSteward = activeStewards.contains(m.id()) ||
                            (m.ministry() != null && m.ministry().toLowerCase(Locale.ROOT).contains("dízim"));
                    return MemberResponseDto.from(m, isSteward);
                })
                .toList();
    }

    @GetMapping("/{id}")
    public MemberResponseDto getById(@PathVariable String id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Membro não encontrado: " + id));
        boolean isSteward = false;
        if (stewardRepository != null) {
            isSteward = stewardRepository.findByMemberId(id).isPresent();
        }
        if (!isSteward && member.ministry() != null && member.ministry().toLowerCase(Locale.ROOT).contains("dízim")) {
            isSteward = true;
        }
        return MemberResponseDto.from(member, isSteward);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MemberResponseDto create(@RequestBody MemberRequestDto request) {
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
        if ((request.status() != null && !request.status().isBlank()) || request.inactiveReason() != null) {
            member = new Member(
                    member.id(),
                    member.communityId(),
                    member.name(),
                    member.birthDate(),
                    member.phone(),
                    member.email(),
                    member.ministry(),
                    request.status() != null ? request.status() : "ACTIVE",
                    request.inactiveReason(),
                    member.createdAt(),
                    member.updatedAt()
            );
        }
        Member saved = memberRepository.save(member);

        boolean isSteward = Boolean.TRUE.equals(request.isSteward());
        if (isSteward && stewardRepository != null) {
            stewardRepository.save(Steward.create(saved.id(), null, LocalDate.now(), "Cadastro inicial"));
        } else if (!isSteward && saved.ministry() != null && saved.ministry().toLowerCase(Locale.ROOT).contains("dízim")) {
            isSteward = true;
        }

        return MemberResponseDto.from(saved, isSteward);
    }

    @PutMapping("/{id}")
    public MemberResponseDto update(@PathVariable String id, @RequestBody MemberRequestDto request) {
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
        String inactiveReason = (request != null && request.inactiveReason() != null)
                ? request.inactiveReason()
                : existing.inactiveReason();

        if (request != null && ("ACTIVE".equalsIgnoreCase(request.status()) || "ATIVO".equalsIgnoreCase(request.status())) && request.inactiveReason() == null) {
            inactiveReason = null;
        }

        Member updated = new Member(
                existing.id(),
                commId,
                name,
                birthDate,
                phone,
                email,
                ministry,
                status,
                inactiveReason,
                existing.createdAt(),
                Instant.now()
        );
        Member saved = memberRepository.save(updated);

        boolean isSteward = false;
        if (request != null && Boolean.TRUE.equals(request.isSteward())) {
            isSteward = true;
            if (stewardRepository != null && stewardRepository.findByMemberId(id).isEmpty()) {
                stewardRepository.save(Steward.create(id, null, LocalDate.now(), "Atualizado para dizimista"));
            }
        } else if (request != null && Boolean.FALSE.equals(request.isSteward())) {
            if (stewardRepository != null) {
                stewardRepository.findByMemberId(id).ifPresent(s -> stewardRepository.deleteById(s.id()));
            }
        } else if (stewardRepository != null) {
            isSteward = stewardRepository.findByMemberId(id).isPresent();
        }

        return MemberResponseDto.from(saved, isSteward);
    }

    @PutMapping("/{id}/inactivate")
    public MemberResponseDto inactivate(@PathVariable String id, @RequestBody(required = false) InactivateMemberRequest request) {
        Member existing = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Membro não encontrado: " + id));
        String reason = (request != null && request.reason() != null && !request.reason().isBlank())
                ? request.reason().trim()
                : "Inativação informada";

        Member inactived = new Member(
                existing.id(),
                existing.communityId(),
                existing.name(),
                existing.birthDate(),
                existing.phone(),
                existing.email(),
                existing.ministry(),
                "INATIVO",
                reason,
                existing.createdAt(),
                Instant.now()
        );
        Member saved = memberRepository.save(inactived);
        boolean isSteward = stewardRepository != null && stewardRepository.findByMemberId(id).isPresent();
        return MemberResponseDto.from(saved, isSteward);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        if (stewardRepository != null) {
            stewardRepository.findByMemberId(id).ifPresent(s -> stewardRepository.deleteById(s.id()));
        }
        memberRepository.deleteById(id);
    }
}
