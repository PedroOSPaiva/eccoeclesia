package com.ecoeclesia.member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(String id);
    List<Member> findAll();
    List<Member> findByCommunityId(String communityId);
    void deleteById(String id);
}
