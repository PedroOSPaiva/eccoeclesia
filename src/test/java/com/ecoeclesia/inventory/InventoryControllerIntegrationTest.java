package com.ecoeclesia.inventory;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class InventoryControllerIntegrationTest {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Container
    static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:7.0.12");

    @DynamicPropertySource
    static void mongoProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.uri", mongoDBContainer::getConnectionString);
    }

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldRegisterItemsHandleMovementsAndReportAlerts() throws Exception {
        String consumablePayload = OBJECT_MAPPER.createObjectNode()
                .put("name", "Álcool em gel")
                .put("description", "Frascos de álcool")
                .put("quantity", 10)
                .put("minimumQuantity", 5)
                .put("expirationDate", LocalDate.now().plusMonths(3).toString())
                .toString();

        MvcResult consumableResult = mockMvc.perform(post("/inventory/consumables")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(consumablePayload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.type").value("CONSUMABLE"))
                .andReturn();

        JsonNode consumableJson = OBJECT_MAPPER.readTree(consumableResult.getResponse().getContentAsString());
        String consumableId = consumableJson.get("id").asText();

        String durablePayload = OBJECT_MAPPER.createObjectNode()
                .put("name", "Microfone")
                .put("description", "Microfone sem fio")
                .put("quantity", 0)
                .put("minimumQuantity", 2)
                .put("warrantyMonths", 18)
                .toString();

        MvcResult durableResult = mockMvc.perform(post("/inventory/durables")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(durablePayload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.type").value("DURABLE"))
                .andReturn();

        JsonNode durableJson = OBJECT_MAPPER.readTree(durableResult.getResponse().getContentAsString());
        String durableId = durableJson.get("id").asText();

        mockMvc.perform(post("/inventory/durables/" + durableId + "/entries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(OBJECT_MAPPER.createObjectNode().put("quantity", 5).toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quantity").value(5));

        mockMvc.perform(post("/inventory/durables/" + durableId + "/exits")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(OBJECT_MAPPER.createObjectNode().put("quantity", 4).toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quantity").value(1));

        mockMvc.perform(post("/inventory/consumables/" + consumableId + "/exits")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(OBJECT_MAPPER.createObjectNode().put("quantity", 6).toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quantity").value(4));

        mockMvc.perform(get("/inventory"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.id=='" + durableId + "')]").exists())
                .andExpect(jsonPath("$[?(@.id=='" + consumableId + "')]").exists());

        mockMvc.perform(get("/inventory/alerts"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[*].id").isArray())
                .andExpect(jsonPath("$[?(@.id=='" + durableId + "')]").exists())
                .andExpect(jsonPath("$[?(@.id=='" + consumableId + "')]").exists());
    }
}
