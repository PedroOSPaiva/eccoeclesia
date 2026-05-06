package com.ecoeclesia.dizimistas.api;

import java.time.LocalDate;
import java.util.UUID;

public record DizimistaResumoDTO(UUID id, String nome, LocalDate dataNascimento, String comunidade) {}
