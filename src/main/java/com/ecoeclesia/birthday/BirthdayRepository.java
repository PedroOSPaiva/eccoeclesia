package com.ecoeclesia.birthday;

import java.util.List;

public interface BirthdayRepository {

    List<BirthdayPerson> findAll();
}
