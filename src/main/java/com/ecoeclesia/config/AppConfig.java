package com.ecoeclesia.config;

import com.ecoeclesia.birthday.BirthdayRepository;
import com.ecoeclesia.birthday.BirthdayService;
import com.ecoeclesia.birthday.JdbcBirthdayRepository;
import com.ecoeclesia.community.CommunityRepository;
import com.ecoeclesia.community.JdbcCommunityRepository;
import com.ecoeclesia.expense.ExpenseRepository;
import com.ecoeclesia.expense.ExpenseService;
import com.ecoeclesia.expense.JdbcExpenseRepository;
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
import com.ecoeclesia.leadership.JdbcParishLeadershipRepository;
import com.ecoeclesia.leadership.ParishLeadershipRepository;
import com.ecoeclesia.leadership.ParishLeadershipService;
import com.ecoeclesia.member.JdbcMemberRepository;
import com.ecoeclesia.member.MemberRepository;
import com.ecoeclesia.revenue.JdbcRevenueRepository;
import com.ecoeclesia.revenue.RevenueRepository;
import com.ecoeclesia.revenue.RevenueService;
import com.ecoeclesia.steward.JdbcStewardRepository;
import com.ecoeclesia.steward.StewardRepository;
import com.ecoeclesia.user.JdbcUserAccountRepository;
import com.ecoeclesia.user.UserAccountRepository;
import com.ecoeclesia.user.UserManagementController;
import org.flywaydb.core.Flyway;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

import javax.sql.DataSource;
import java.nio.file.Path;

@Configuration
public class AppConfig {

    @Bean
    public ExpenseRepository expenseRepository(DataSource dataSource) {
        return new JdbcExpenseRepository(dataSource);
    }

    @Bean
    public ExpenseService expenseService(ExpenseRepository expenseRepository) {
        return new ExpenseService(expenseRepository);
    }

    @Bean
    public RevenueRepository revenueRepository(DataSource dataSource) {
        return new JdbcRevenueRepository(dataSource);
    }

    @Bean
    public RevenueService revenueService(RevenueRepository revenueRepository) {
        return new RevenueService(revenueRepository);
    }

    @Bean
    public Flyway flyway(DataSource dataSource) {
        Flyway flyway = Flyway.configure()
                .dataSource(dataSource)
                .locations("classpath:db/migration")
                .baselineOnMigrate(true)
                .load();
        flyway.migrate();
        return flyway;
    }

    @Bean
    @DependsOn("flyway")
    public UserAccountRepository userAccountRepository(DataSource dataSource) {
        return new JdbcUserAccountRepository(dataSource);
    }

    @Bean
    public UserManagementController userManagementController(UserAccountRepository userAccountRepository) {
        return new UserManagementController(userAccountRepository);
    }

    @Bean
    @DependsOn("flyway")
    public AuthTokenService authTokenService(UserAccountRepository userAccountRepository) {
        return new AuthTokenService(userAccountRepository);
    }

    @Bean
    public ApplicationRunner userSeeder(AuthTokenService authTokenService) {
        return args -> authTokenService.seedDefaultAccounts();
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
    public BirthdayRepository birthdayRepository(DataSource dataSource) {
        return new JdbcBirthdayRepository(dataSource);
    }

    @Bean
    public BirthdayService birthdayService(MemberRepository memberRepository, BirthdayRepository birthdayRepository) {
        return new BirthdayService(memberRepository, birthdayRepository, java.time.Clock.systemDefaultZone());
    }

    @Bean
    public ParishLeadershipRepository parishLeadershipRepository(DataSource dataSource) {
        return new JdbcParishLeadershipRepository(dataSource);
    }

    @Bean
    public ParishLeadershipService parishLeadershipService(ParishLeadershipRepository parishLeadershipRepository) {
        return new ParishLeadershipService(parishLeadershipRepository);
    }

    @Bean
    public FinancialReportGenerator financialReportGenerator(
            LedgerRepository ledgerRepository,
            ParishLeadershipRepository parishLeadershipRepository,
            CommunityRepository communityRepository
    ) {
        return new FinancialReportGenerator(ledgerRepository, ChartOfAccounts.defaultPlan(), parishLeadershipRepository, communityRepository);
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

    @Bean
    public CommunityRepository communityRepository(DataSource dataSource) {
        return new JdbcCommunityRepository(dataSource);
    }

    @Bean
    public MemberRepository memberRepository(DataSource dataSource) {
        return new JdbcMemberRepository(dataSource);
    }

    @Bean
    public StewardRepository stewardRepository(DataSource dataSource) {
        return new JdbcStewardRepository(dataSource);
    }
}
