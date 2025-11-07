package com.ecoeclesia.auth;

import com.ecoeclesia.access.UserRole;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDate;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class SecurityIntegrationTest {

    @Container
    static final MongoDBContainer mongo = new MongoDBContainer("mongo:7.0.5");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.uri", mongo::getReplicaSetUrl);
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserAccountService userAccountService;

    @BeforeEach
    void setUp() {
        userAccountRepository.deleteAll();
    }

    @Test
    void loginShouldReturnTokens() throws Exception {
        userAccountService.createUser("coord@example.com", "password", Set.of(UserRole.COORDINATION));

        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{" +
                                "\"email\":\"coord@example.com\"," +
                                "\"password\":\"password\"" +
                                "}"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode json = objectMapper.readTree(response);
        assertThat(json.get("accessToken").asText()).isNotBlank();
        assertThat(json.get("refreshToken").asText()).isNotBlank();
        assertThat(json.get("tokenType").asText()).isEqualTo("Bearer");
    }

    @Test
    void faithfulRoleShouldAccessReportsButNotManageExpenses() throws Exception {
        userAccountService.createUser("faithful@example.com", "password", Set.of(UserRole.FAITHFUL));
        AuthenticationResponse tokens = authenticate("faithful@example.com", "password");

        mockMvc.perform(get("/api/expenses")
                        .header("Authorization", "Bearer " + tokens.accessToken())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/expenses")
                        .header("Authorization", "Bearer " + tokens.accessToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{" +
                                "\"amount\":10.0," +
                                "\"description\":\"Test expense\"," +
                                "\"category\":\"OTHER\"" +
                                "}"))
                .andExpect(status().isForbidden());
    }

    @Test
    void faithfulRoleShouldAccessRevenuesReadOnlyAndCannotManageUsers() throws Exception {
        userAccountService.createUser("faithful2@example.com", "password", Set.of(UserRole.FAITHFUL));
        AuthenticationResponse tokens = authenticate("faithful2@example.com", "password");

        mockMvc.perform(get("/api/revenues")
                        .header("Authorization", "Bearer " + tokens.accessToken())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/revenues")
                        .header("Authorization", "Bearer " + tokens.accessToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{" +
                                "\"amount\":10.0," +
                                "\"description\":\"Test revenue\"," +
                                "\"category\":\"OTHER\"" +
                                "}"))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/users")
                        .header("Authorization", "Bearer " + tokens.accessToken()))
                .andExpect(status().isForbidden());
    }

    @Test
    void coordinationRoleShouldManageInventory() throws Exception {
        userAccountService.createUser("coord@example.com", "password", Set.of(UserRole.COORDINATION));
        AuthenticationResponse tokens = authenticate("coord@example.com", "password");

        mockMvc.perform(post("/inventory/consumables")
                        .header("Authorization", "Bearer " + tokens.accessToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{" +
                                "\"name\":\"Rice\"," +
                                "\"description\":\"Stock item\"," +
                                "\"quantity\":5," +
                                "\"minimumQuantity\":1," +
                                "\"expirationDate\":\"" + LocalDate.now().plusDays(30) + "\"" +
                                "}"))
                .andExpect(status().isCreated());
    }

    @Test
    void refreshTokenShouldIssueNewTokens() throws Exception {
        userAccountService.createUser("coord@example.com", "password", Set.of(UserRole.COORDINATION));
        AuthenticationResponse tokens = authenticate("coord@example.com", "password");

        String response = mockMvc.perform(post("/api/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new RefreshTokenRequest(tokens.refreshToken()))))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode json = objectMapper.readTree(response);
        assertThat(json.get("accessToken").asText()).isNotBlank();
        assertThat(json.get("refreshToken").asText()).isNotBlank();
    }

    private AuthenticationResponse authenticate(String email, String password) throws Exception {
        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest(email, password))))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        return objectMapper.readValue(response, AuthenticationResponse.class);
    }
}
