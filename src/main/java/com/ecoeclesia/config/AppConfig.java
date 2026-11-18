package com.ecoeclesia.config;

import com.ecoeclesia.birthday.BirthdayRepository;
import com.ecoeclesia.birthday.BirthdayService;
import com.ecoeclesia.birthday.CsvBirthdayRepository;
import com.ecoeclesia.expense.ExpenseRepository;
import com.ecoeclesia.expense.ExpenseService;
import com.ecoeclesia.expense.InMemoryExpenseRepository;
import com.ecoeclesia.finance.AuthTokenService;
import com.ecoeclesia.finance.ChartOfAccounts;
import com.ecoeclesia.finance.FinancialReportFormatter;
import com.ecoeclesia.finance.FinancialReportGenerator;
import com.ecoeclesia.finance.FinancialReportPdfExporter;
import com.ecoeclesia.finance.FinancialReportSpreadsheetExporter;
import com.ecoeclesia.finance.LedgerRepository;
import com.ecoeclesia.finance.LedgerService;
import com.ecoeclesia.finance.SqlLedgerRepository;
import com.ecoeclesia.inventory.InventoryService;
import com.ecoeclesia.revenue.InMemoryRevenueRepository;
import com.ecoeclesia.revenue.RevenueRepository;
import com.ecoeclesia.revenue.RevenueService;
import com.ecoeclesia.user.JdbcUserAccountRepository;
import com.ecoeclesia.user.UserAccountRepository;
import com.ecoeclesia.user.UserManagementController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.nio.file.Path;

@Configuration
public class AppConfig {

    @Bean
    public ExpenseRepository expenseRepository() {
        return new InMemoryExpenseRepository();
    }

    @Bean
    public ExpenseService expenseService(ExpenseRepository expenseRepository) {
        return new ExpenseService(expenseRepository);
    }

    @Bean
    public RevenueRepository revenueRepository() {
        return new InMemoryRevenueRepository();
    }

    @Bean
    public RevenueService revenueService(RevenueRepository revenueRepository) {
        return new RevenueService(revenueRepository);
    }

    @Bean
    public UserAccountRepository userAccountRepository(DataSource dataSource) {
        return new JdbcUserAccountRepository(dataSource);
    }

    @Bean
    public UserManagementController userManagementController(UserAccountRepository userAccountRepository) {
        return new UserManagementController(userAccountRepository);
    }

    @Bean
    public AuthTokenService authTokenService(UserManagementController userManagementController) {
        return new AuthTokenService(userManagementController);
    }

    @Bean
    public LedgerRepository ledgerRepository(DataSource dataSource) {
        return new SqlLedgerRepository(dataSource);
    }

    @Bean
    public LedgerService ledgerService(LedgerRepository ledgerRepository) {
        return new LedgerService(ledgerRepository, ChartOfAccounts.defaultPlan());
    }

    @Bean
    public InventoryService inventoryService() {
        return new InventoryService(Path.of("data", "inventory.csv"));
    }

    @Bean
    public BirthdayRepository birthdayRepository() {
        return new CsvBirthdayRepository(Path.of("data", "birthdays.csv"));
    }

    @Bean
    public BirthdayService birthdayService(BirthdayRepository birthdayRepository) {
        return new BirthdayService(birthdayRepository);
    }

    @Bean
    public FinancialReportGenerator financialReportGenerator(LedgerRepository ledgerRepository) {
        return new FinancialReportGenerator(ledgerRepository, ChartOfAccounts.defaultPlan());
    }

    @Bean
    public FinancialReportFormatter financialReportFormatter() {
        return new FinancialReportFormatter();
    }

    @Bean
    public FinancialReportPdfExporter financialReportPdfExporter() {
        return new FinancialReportPdfExporter(ChartOfAccounts.defaultPlan());
    }

    @Bean
    public FinancialReportSpreadsheetExporter financialReportSpreadsheetExporter() {
        return new FinancialReportSpreadsheetExporter();
    }
}
