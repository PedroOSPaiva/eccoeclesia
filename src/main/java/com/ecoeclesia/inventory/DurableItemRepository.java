package com.ecoeclesia.inventory;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DurableItemRepository extends MongoRepository<DurableItem, String> {
}
