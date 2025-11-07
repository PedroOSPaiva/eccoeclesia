package com.ecoeclesia.inventory;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsumableItemRepository extends MongoRepository<ConsumableItem, String> {
}
