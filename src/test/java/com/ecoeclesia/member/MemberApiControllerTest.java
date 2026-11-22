package com.ecoeclesia.member;

import com.ecoeclesia.api.MemberApiController;
import com.ecoeclesia.steward.Steward;
import com.ecoeclesia.steward.StewardRepository;
import com.ecoeclesia.testing.Assertions;
import com.ecoeclesia.testing.Test;

import java.time.LocalDate;
import java.util.*;

public class MemberApiControllerTest {

    private final Map<String, Member> storage = new HashMap<>();
    private final MemberRepository repository = new MemberRepository() {
        @Override
        public Member save(Member member) {
            storage.put(member.id(), member);
            return member;
        }

        @Override
        public Optional<Member> findById(String id) {
            return Optional.ofNullable(storage.get(id));
        }

        @Override
        public List<Member> findAll() {
            return new ArrayList<>(storage.values());
        }

        @Override
        public List<Member> findByCommunityId(String communityId) {
            return storage.values().stream().filter(m -> m.communityId().equals(communityId)).toList();
        }

        @Override
        public void deleteById(String id) {
            storage.remove(id);
        }
    };

    private final Map<String, Steward> stewardStorage = new HashMap<>();
    private final StewardRepository stewardRepository = new StewardRepository() {
        @Override
        public Steward save(Steward steward) {
            stewardStorage.put(steward.id(), steward);
            return steward;
        }

        @Override
        public Optional<Steward> findById(String id) {
            return Optional.ofNullable(stewardStorage.get(id));
        }

        @Override
        public Optional<Steward> findByMemberId(String memberId) {
            return stewardStorage.values().stream().filter(s -> s.memberId().equals(memberId)).findFirst();
        }

        @Override
        public List<Steward> findAll() {
            return new ArrayList<>(stewardStorage.values());
        }

        @Override
        public void deleteById(String id) {
            stewardStorage.remove(id);
        }
    };

    private final MemberApiController controller = new MemberApiController(repository, stewardRepository);

    @Test("creates, filters and updates members")
    public void memberCrud() {
        var member = controller.create(new MemberApiController.MemberRequestDto(
                "comm-1", "João Silva", LocalDate.of(1990, 5, 10), "11999999999", "joao@email.com", "Música", "ACTIVE"
        ));
        Assertions.assertEquals("João Silva", member.name());
        Assertions.assertEquals(1, controller.list(null).size());
        Assertions.assertEquals(1, controller.list("comm-1").size());
        Assertions.assertEquals(0, controller.list("comm-2").size());

        var updated = controller.update(member.id(), new MemberApiController.MemberRequestDto(
                "comm-1", "João Pedro Silva", null, null, null, null, "INACTIVE"
        ));
        Assertions.assertEquals("João Pedro Silva", updated.name());
        Assertions.assertEquals("INACTIVE", updated.status());

        controller.delete(member.id());
        Assertions.assertEquals(0, controller.list(null).size());
    }

    @Test("validates required member fields")
    public void validateMember() {
        Assertions.assertThrows(IllegalArgumentException.class, () ->
                controller.create(new MemberApiController.MemberRequestDto(null, "João", null, null, null, null, null)));
        Assertions.assertThrows(IllegalArgumentException.class, () ->
                controller.create(new MemberApiController.MemberRequestDto("comm-1", null, null, null, null, null, null)));
    }

    @Test("creates member as steward and reflects steward status")
    public void memberAsSteward() {
        var stewardMember = controller.create(new MemberApiController.MemberRequestDto(
                "comm-1", "Maria Aparecida", LocalDate.of(1985, 3, 20), "11988888888", "maria@email.com", "Pastoral do Dízimo", "ACTIVE", true
        ));
        Assertions.assertTrue(stewardMember.isSteward(), "Expected member to be marked as steward");
        Assertions.assertEquals(1, stewardRepository.findAll().size());

        var list = controller.list("comm-1");
        Assertions.assertEquals(1, list.size());
        Assertions.assertTrue(list.get(0).isSteward(), "Expected listed member to be marked as steward");
    }
}
