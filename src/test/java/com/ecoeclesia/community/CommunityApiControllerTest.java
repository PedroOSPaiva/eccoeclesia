package com.ecoeclesia.community;

import com.ecoeclesia.api.CommunityApiController;
import com.ecoeclesia.testing.Assertions;
import com.ecoeclesia.testing.Test;

import java.util.*;

public class CommunityApiControllerTest {

    private final Map<String, Community> storage = new HashMap<>();
    private final CommunityRepository repository = new CommunityRepository() {
        @Override
        public Community save(Community community) {
            storage.put(community.id(), community);
            return community;
        }

        @Override
        public Optional<Community> findById(String id) {
            return Optional.ofNullable(storage.get(id));
        }

        @Override
        public List<Community> findAll() {
            return new ArrayList<>(storage.values());
        }

        @Override
        public Optional<Community> findByCode(String code) {
            return storage.values().stream().filter(c -> c.code().equalsIgnoreCase(code)).findFirst();
        }

        @Override
        public Optional<Community> findMainParish() {
            return storage.values().stream().filter(Community::isMainParish).findFirst();
        }
    };

    private final CommunityApiController controller = new CommunityApiController(repository);

    @Test("creates and lists communities")
    public void createAndList() {
        var created = controller.create(new CommunityApiController.CommunityRequestDto("São José", "SJO", false));
        Assertions.assertEquals("São José", created.name());
        Assertions.assertEquals("SJO", created.code());
        Assertions.assertEquals(1, controller.list().size());

        var found = controller.getById(created.id());
        Assertions.assertEquals("São José", found.name());
    }

    @Test("validates required name")
    public void validateName() {
        Assertions.assertThrows(IllegalArgumentException.class, () ->
                controller.create(new CommunityApiController.CommunityRequestDto(null, "TEST", false)));
    }
}
