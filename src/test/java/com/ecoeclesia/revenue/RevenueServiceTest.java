package com.ecoeclesia.revenue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RevenueServiceTest {

    @Mock
    private RevenueRepository revenueRepository;

    @InjectMocks
    private RevenueService revenueService;

    @Nested
    @DisplayName("classifyRevenue")
    class ClassifyRevenue {

        @Test
        @DisplayName("should classify description containing dizimo as tithes")
        void shouldClassifyTithes() {
            RevenueCategory category = revenueService.classifyRevenue("Contribuição do dízimo mensal");

            assertThat(category).isEqualTo(RevenueCategory.TITHES);
        }

        @Test
        @DisplayName("should default to OTHER when no rule matches")
        void shouldFallbackToOther() {
            RevenueCategory category = revenueService.classifyRevenue("Repasse não identificado");

            assertThat(category).isEqualTo(RevenueCategory.OTHER);
        }
    }

    @Nested
    @DisplayName("registerRevenue")
    class RegisterRevenue {

        @Test
        @DisplayName("should persist classified revenue when category is missing")
        void shouldPersistClassifiedRevenue() {
            when(revenueRepository.save(any(RevenueEntity.class)))
                    .thenAnswer(invocation -> invocation.getArgument(0));

            RevenueEntity entity = revenueService.registerRevenue(new BigDecimal("150.00"), "Dízimo da família Souza");

            assertThat(entity.getCategory()).isEqualTo(RevenueCategory.TITHES);
            verify(revenueRepository).save(any(RevenueEntity.class));
        }

        @Test
        @DisplayName("should reject invalid category value")
        void shouldRejectInvalidCategory() {
            assertThatThrownBy(() ->
                    revenueService.registerRevenue(new BigDecimal("250.00"), "Doação especial", "INVALID")
            ).isInstanceOf(ResponseStatusException.class);
        }
    }

    @Nested
    @DisplayName("listRevenues")
    class ListRevenues {

        @Test
        @DisplayName("should sort revenues by creation date descending")
        void shouldSortByCreationDate() {
            RevenueEntity older = new RevenueEntity(null, new BigDecimal("100"), "Doação",
                    RevenueCategory.DONATIONS, Instant.parse("2024-01-10T10:15:30Z"));
            RevenueEntity newer = new RevenueEntity(null, new BigDecimal("200"), "Evento",
                    RevenueCategory.EVENTS, Instant.parse("2024-02-05T12:00:00Z"));
            when(revenueRepository.findAll()).thenReturn(List.of(older, newer));

            List<RevenueEntity> results = revenueService.listRevenues(null, null);

            assertThat(results).containsExactly(newer, older);
        }
    }
}
