package com.ecoeclesia.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConsumableItemRepository extends JpaRepository<ConsumableItem, UUID> {
}
