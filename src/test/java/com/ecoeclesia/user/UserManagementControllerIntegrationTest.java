package com.ecoeclesia.user;

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

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserManagementControllerIntegrationTest extends AbstractPostgresIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserAccountService userAccountService;

    @BeforeEach
    void cleanUp() {
        userAccountRepository.deleteAll();
    }

    @Test
    @DisplayName("should allow administrators to manage users end-to-end")
    void shouldManageUsers() {
        userAccountService.createUser("coord@paroquia.com", "senhaSegura", Set.of(UserRole.COORDINATION));
        AuthenticationResponse adminTokens = authenticate("coord@paroquia.com", "senhaSegura");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(adminTokens.accessToken());

        CreateUserRequest createRequest = new CreateUserRequest(
                "fiel@paroquia.com",
                "senhaInicial",
                Set.of("FAITHFUL")
        );

        ResponseEntity<UserAccountResponse> createResponse = restTemplate.exchange(
                "/api/users",
                HttpMethod.POST,
                new HttpEntity<>(createRequest, headers),
                UserAccountResponse.class
        );

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        UserAccountResponse created = createResponse.getBody();
        assertThat(created).isNotNull();
        assertThat(created.email()).isEqualTo("fiel@paroquia.com");
        assertThat(created.roles()).containsExactly("FAITHFUL");

        UpdateUserRolesRequest rolesRequest = new UpdateUserRolesRequest(Set.of("FAITHFUL", "TREASURER"));
        ResponseEntity<UserAccountResponse> updateRolesResponse = restTemplate.exchange(
                "/api/users/" + created.id() + "/roles",
                HttpMethod.PUT,
                new HttpEntity<>(rolesRequest, headers),
                UserAccountResponse.class
        );

        assertThat(updateRolesResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(updateRolesResponse.getBody()).isNotNull();
        assertThat(updateRolesResponse.getBody().roles()).containsExactlyInAnyOrder("FAITHFUL", "TREASURER");

        UpdateUserPasswordRequest passwordRequest = new UpdateUserPasswordRequest("novaSenha");
        ResponseEntity<UserAccountResponse> passwordResponse = restTemplate.exchange(
                "/api/users/" + created.id() + "/password",
                HttpMethod.PUT,
                new HttpEntity<>(passwordRequest, headers),
                UserAccountResponse.class
        );

        assertThat(passwordResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        AuthenticationResponse updatedUserTokens = authenticate("fiel@paroquia.com", "novaSenha");
        assertThat(updatedUserTokens.accessToken()).isNotBlank();
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
