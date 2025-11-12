package com.ecoeclesia.expense;

import com.ecoeclesia.access.UserRole;
import com.ecoeclesia.auth.AuthenticationResponse;
import com.ecoeclesia.auth.LoginRequest;
import com.ecoeclesia.auth.UserAccountRepository;
import com.ecoeclesia.auth.UserAccountService;
import com.ecoeclesia.support.AbstractPostgresIntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ExpenseControllerIntegrationTest extends AbstractPostgresIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserAccountService userAccountService;

    @BeforeEach
    void cleanDatabase() {
        userAccountRepository.deleteAll();
    }

    @Test
    @DisplayName("should create, fetch and delete an expense")
    void shouldCreateFetchAndDeleteExpense() {
        userAccountService.createUser("tesoureiro@paroquia.com", "senhaSegura", Set.of(UserRole.TREASURER));
        AuthenticationResponse tokens = authenticate("tesoureiro@paroquia.com", "senhaSegura");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(tokens.accessToken());

        ExpenseRequest request = new ExpenseRequest(new BigDecimal("78.90"), "Monthly supermarket run", null);

        ResponseEntity<ExpenseResponse> createResponse = restTemplate.exchange(
                "/api/expenses",
                HttpMethod.POST,
                new HttpEntity<>(request, headers),
                ExpenseResponse.class
        );

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        ExpenseResponse created = createResponse.getBody();
        assertThat(created).isNotNull();
        assertThat(created.category()).isEqualTo(ExpenseCategory.GROCERIES);

        ResponseEntity<ExpenseResponse> fetchResponse = restTemplate.exchange(
                "/api/expenses/" + created.id(),
                HttpMethod.GET,
                new HttpEntity<Void>(headers),
                ExpenseResponse.class
        );
        assertThat(fetchResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(fetchResponse.getBody()).isNotNull();
        assertThat(fetchResponse.getBody().id()).isEqualTo(created.id());

        ResponseEntity<Void> deleteResponse = restTemplate.exchange(
                "/api/expenses/" + created.id(),
                HttpMethod.DELETE,
                new HttpEntity<Void>(headers),
                Void.class
        );
        assertThat(deleteResponse.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

        ResponseEntity<String> missingResponse = restTemplate.exchange(
                "/api/expenses/" + created.id(),
                HttpMethod.GET,
                new HttpEntity<Void>(headers),
                String.class
        );
        assertThat(missingResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    private AuthenticationResponse authenticate(String email, String password) {
        ResponseEntity<AuthenticationResponse> response = restTemplate.postForEntity(
                "/api/auth/login",
                new LoginRequest(email, password),
                AuthenticationResponse.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        return response.getBody();
    }
}
