package com.ecoeclesia.expense;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ExpenseControllerIntegrationTest {

    @Container
    static final MongoDBContainer mongoDBContainer = new MongoDBContainer(DockerImageName.parse("mongo:7.0.5"));

    @DynamicPropertySource
    static void mongoProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.uri", mongoDBContainer::getConnectionString);
    }

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    @DisplayName("should create, fetch and delete an expense")
    void shouldCreateFetchAndDeleteExpense() {
        ExpenseRequest request = new ExpenseRequest(new BigDecimal("78.90"), "Monthly supermarket run", null);

        ResponseEntity<ExpenseResponse> createResponse = restTemplate.postForEntity("/api/expenses", request, ExpenseResponse.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        ExpenseResponse created = createResponse.getBody();
        assertThat(created).isNotNull();
        assertThat(created.category()).isEqualTo(ExpenseCategory.GROCERIES);

        ResponseEntity<ExpenseResponse> fetchResponse = restTemplate.getForEntity("/api/expenses/" + created.id(), ExpenseResponse.class);
        assertThat(fetchResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(fetchResponse.getBody()).isNotNull();
        assertThat(fetchResponse.getBody().id()).isEqualTo(created.id());

        ResponseEntity<Void> deleteResponse = restTemplate.exchange(
            "/api/expenses/" + created.id(),
            HttpMethod.DELETE,
            HttpEntity.EMPTY,
            Void.class
        );
        assertThat(deleteResponse.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

        ResponseEntity<String> missingResponse = restTemplate.getForEntity("/api/expenses/" + created.id(), String.class);
        assertThat(missingResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}
