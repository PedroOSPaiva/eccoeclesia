package com.ecoeclesia.api;

import com.ecoeclesia.birthday.BirthdayService;
import com.ecoeclesia.birthday.BirthdaySummary;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/birthdays")
public class BirthdayApiController {

    private final BirthdayService birthdayService;

    public BirthdayApiController(BirthdayService birthdayService) {
        this.birthdayService = birthdayService;
    }

    public record CreateBirthdayRequest(
            String name,
            String birthDate,
            String ministry,
            String contact
    ) {}

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<BirthdaySummary> listBirthdays() {
        return birthdayService.listUpcomingBirthdays();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE', 'VOLUNTEER')")
    public ResponseEntity<BirthdaySummary> createBirthday(@RequestBody CreateBirthdayRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Corpo da requisição é obrigatório");
        }
        if (request.name() == null || request.name().isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (request.birthDate() == null || request.birthDate().isBlank()) {
            throw new IllegalArgumentException("Data de nascimento é obrigatória");
        }

        LocalDate date;
        try {
            date = LocalDate.parse(request.birthDate().trim());
        } catch (Exception ex) {
            throw new IllegalArgumentException("Data de nascimento inválida (use o formato YYYY-MM-DD)");
        }

        BirthdaySummary summary = birthdayService.registerBirthday(
                request.name().trim(),
                date,
                request.ministry(),
                request.contact()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(summary);
    }
}
