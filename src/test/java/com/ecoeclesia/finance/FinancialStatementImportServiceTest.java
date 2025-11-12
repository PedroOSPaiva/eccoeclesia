package com.ecoeclesia.finance;

import com.ecoeclesia.expense.ExpenseService;
import com.ecoeclesia.revenue.RevenueService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class FinancialStatementImportServiceTest {

    @Mock
    private ExpenseService expenseService;

    @Mock
    private RevenueService revenueService;

    @InjectMocks
    private FinancialStatementImportService importService;

    @Test
    @DisplayName("should import expenses and revenues from CSV")
    void shouldImportExpensesAndRevenues() throws IOException {
        String csv = "type,amount,description,category,date\n" +
                "EXPENSE,120.50,Compra no supermercado,,2024-03-10\n" +
                "REVENUE,300.00,Doação especial,DONATIONS,2024-03-11\n";
        ByteArrayInputStream inputStream = new ByteArrayInputStream(csv.getBytes(StandardCharsets.UTF_8));

        StatementImportResult result = importService.importCsv(inputStream);

        assertThat(result.expensesImported()).isEqualTo(1);
        assertThat(result.revenuesImported()).isEqualTo(1);
        assertThat(result.errors()).isEmpty();

        verify(expenseService).registerExpense(eq(new BigDecimal("120.50")), eq("Compra no supermercado"), eq((String) null), any(Instant.class));
        verify(revenueService).registerRevenue(eq(new BigDecimal("300.00")), eq("Doação especial"), eq("DONATIONS"), any(Instant.class));
    }

    @Test
    @DisplayName("should report invalid rows")
    void shouldReportInvalidRows() throws IOException {
        String csv = "amount,description\n" +
                ",Sem valor\n" +
                "-50,Sem tipo definido\n";
        ByteArrayInputStream inputStream = new ByteArrayInputStream(csv.getBytes(StandardCharsets.UTF_8));

        StatementImportResult result = importService.importCsv(inputStream);

        assertThat(result.expensesImported()).isEqualTo(1);
        assertThat(result.revenuesImported()).isZero();
        assertThat(result.skipped()).isEqualTo(1);
        assertThat(result.errors()).hasSize(1);

        verify(expenseService).registerExpense(eq(new BigDecimal("50")), eq("Sem tipo definido"), eq((String) null), any(Instant.class));
        verify(revenueService, times(0)).registerRevenue(any(), any(), any(), any());
    }

    @Test
    @DisplayName("should reject headers without mandatory columns")
    void shouldRejectInvalidHeader() {
        String csv = "descricao\nItem";
        ByteArrayInputStream inputStream = new ByteArrayInputStream(csv.getBytes(StandardCharsets.UTF_8));

        assertThrows(IllegalArgumentException.class, () -> importService.importCsv(inputStream));
    }
}
