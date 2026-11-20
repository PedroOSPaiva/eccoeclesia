package com.ecoeclesia.member;

import javax.sql.DataSource;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class JdbcMemberRepository implements MemberRepository {

    private final DataSource dataSource;

    public JdbcMemberRepository(DataSource dataSource) {
        this.dataSource = Objects.requireNonNull(dataSource, "dataSource");
    }

    @Override
    public Member save(Member member) {
        Objects.requireNonNull(member, "member");
        UUID id = toUuid(member.id());
        UUID communityId = toUuid(member.communityId());

        String sql = "INSERT INTO members (id, community_id, name, birth_date, phone, email, ministry, status, created_at, updated_at) " +
                "VALUES (?::uuid, ?::uuid, ?, ?, ?, ?, ?, ?, ?, now()) " +
                "ON CONFLICT (id) DO UPDATE SET " +
                "community_id = EXCLUDED.community_id, " +
                "name = EXCLUDED.name, " +
                "birth_date = EXCLUDED.birth_date, " +
                "phone = EXCLUDED.phone, " +
                "email = EXCLUDED.email, " +
                "ministry = EXCLUDED.ministry, " +
                "status = EXCLUDED.status, " +
                "updated_at = now()";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id.toString());
            ps.setString(2, communityId.toString());
            ps.setString(3, member.name());
            ps.setDate(4, member.birthDate() != null ? Date.valueOf(member.birthDate()) : null);
            ps.setString(5, member.phone());
            ps.setString(6, member.email());
            ps.setString(7, member.ministry());
            ps.setString(8, member.status());
            ps.setTimestamp(9, Timestamp.from(member.createdAt() != null ? member.createdAt() : Instant.now()));
            ps.executeUpdate();
            return member;
        } catch (SQLException ex) {
            throw new IllegalStateException("Falha ao salvar membro: " + member.id(), ex);
        }
    }

    @Override
    public Optional<Member> findById(String id) {
        if (id == null || id.isBlank()) return Optional.empty();
        UUID uuid = toUuid(id);
        String sql = "SELECT id, community_id, name, birth_date, phone, email, ministry, status, created_at, updated_at FROM members WHERE id = ?::uuid";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return Optional.of(mapRow(rs));
                return Optional.empty();
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar membro por id: " + id, ex);
        }
    }

    @Override
    public List<Member> findAll() {
        String sql = "SELECT id, community_id, name, birth_date, phone, email, ministry, status, created_at, updated_at FROM members ORDER BY name ASC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<Member> members = new ArrayList<>();
            while (rs.next()) {
                members.add(mapRow(rs));
            }
            return members;
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao listar membros", ex);
        }
    }

    @Override
    public List<Member> findByCommunityId(String communityId) {
        if (communityId == null || communityId.isBlank()) return List.of();
        UUID uuid = toUuid(communityId);
        String sql = "SELECT id, community_id, name, birth_date, phone, email, ministry, status, created_at, updated_at FROM members WHERE community_id = ?::uuid ORDER BY name ASC";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            try (ResultSet rs = ps.executeQuery()) {
                List<Member> members = new ArrayList<>();
                while (rs.next()) {
                    members.add(mapRow(rs));
                }
                return members;
            }
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao buscar membros por comunidade: " + communityId, ex);
        }
    }

    @Override
    public void deleteById(String id) {
        if (id == null || id.isBlank()) return;
        UUID uuid = toUuid(id);
        String sql = "DELETE FROM members WHERE id = ?::uuid";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uuid.toString());
            ps.executeUpdate();
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao deletar membro por id: " + id, ex);
        }
    }

    private Member mapRow(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String communityId = rs.getString("community_id");
        String name = rs.getString("name");
        Date birthDate = rs.getDate("birth_date");
        String phone = rs.getString("phone");
        String email = rs.getString("email");
        String ministry = rs.getString("ministry");
        String status = rs.getString("status");
        Timestamp createdAt = rs.getTimestamp("created_at");
        Timestamp updatedAt = rs.getTimestamp("updated_at");

        return new Member(
                id,
                communityId,
                name,
                birthDate != null ? birthDate.toLocalDate() : null,
                phone,
                email,
                ministry,
                status,
                createdAt != null ? createdAt.toInstant() : Instant.now(),
                updatedAt != null ? updatedAt.toInstant() : Instant.now()
        );
    }

    private UUID toUuid(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException ex) {
            return UUID.nameUUIDFromBytes(id.getBytes(StandardCharsets.UTF_8));
        }
    }
}
