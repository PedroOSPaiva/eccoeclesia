package com.ecoeclesia.member;

import com.ecoeclesia.api.MemberApiController;
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

    private final MemberApiController controller = new MemberApiController(repository);

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
}
