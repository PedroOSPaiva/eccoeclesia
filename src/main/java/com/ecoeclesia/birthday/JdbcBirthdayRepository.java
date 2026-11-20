package com.ecoeclesia.birthday;

import javax.sql.DataSource;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

/**
 * Repositório JDBC conectado ao PostgreSQL (tabela 'birthdays').
 */
public class JdbcBirthdayRepository implements BirthdayRepository {

    private final DataSource dataSource;

    public JdbcBirthdayRepository(DataSource dataSource) {
        this.dataSource = Objects.requireNonNull(dataSource, "dataSource");
    }

    @Override
    public List<BirthdayPerson> findAll() {
        String sql = "SELECT id, name, birth_date, ministry, contact FROM birthdays ORDER BY birth_date, name";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<BirthdayPerson> people = new ArrayList<>();
            while (rs.next()) {
                people.add(mapRow(rs));
            }
            return people;
        } catch (SQLException ex) {
            throw new IllegalStateException("Erro ao listar aniversariantes do banco", ex);
        }
    }

    @Override
    public BirthdayPerson save(BirthdayPerson person) {
        Objects.requireNonNull(person, "person");
        UUID id = toUuid(person.id());

        String sql = "INSERT INTO birthdays (id, name, birth_date, ministry, contact, created_at, updated_at) " +
                "VALUES (?::uuid, ?, ?, ?, ?, now(), now()) " +
                "ON CONFLICT (id) DO UPDATE SET " +
                "name = EXCLUDED.name, " +
                "birth_date = EXCLUDED.birth_date, " +
                "ministry = EXCLUDED.ministry, " +
                "contact = EXCLUDED.contact, " +
                "updated_at = now()";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id.toString());
            ps.setString(2, person.name());
            ps.setDate(3, Date.valueOf(person.birthDate()));
            ps.setString(4, person.ministry());
            ps.setString(5, person.contact());
            ps.executeUpdate();
            return person;
        } catch (SQLException ex) {
            throw new IllegalStateException("Falha ao salvar aniversariante: " + person.id(), ex);
        }
    }

    private BirthdayPerson mapRow(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String name = rs.getString("name");
        Date birthDate = rs.getDate("birth_date");
        String ministry = rs.getString("ministry");
        String contact = rs.getString("contact");

        LocalDate localDate = birthDate != null ? birthDate.toLocalDate() : LocalDate.now();
        return new BirthdayPerson(id, name, localDate, ministry, contact);
    }

    private UUID toUuid(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException ex) {
            return UUID.nameUUIDFromBytes(id.getBytes(StandardCharsets.UTF_8));
        }
    }
}
