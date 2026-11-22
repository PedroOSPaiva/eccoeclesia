package com.ecoeclesia.leadership;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class ParishLeadershipService {

    private final ParishLeadershipRepository repository;

    public ParishLeadershipService(ParishLeadershipRepository repository) {
        this.repository = Objects.requireNonNull(repository, "repository");
    }

    public List<ParishLeader> listAll() {
        return repository.findAll();
    }

    public List<ParishLeader> listActive() {
        return repository.findAllActive();
    }

    public ParishLeader save(ParishLeader leader) {
        return repository.save(leader);
    }

    public Optional<ParishLeader> findById(String id) {
        return repository.findById(id);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}
