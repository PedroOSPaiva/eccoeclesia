package com.ecoeclesia.testing;

import com.ecoeclesia.access.UserAccessPolicyTest;
import com.ecoeclesia.config.DatabaseUrlResolverTest;
import com.ecoeclesia.expense.ExpenseServiceTest;
import com.ecoeclesia.finance.FinancialStatementImportServiceTest;
import com.ecoeclesia.finance.FileLedgerRepositoryTest;
import com.ecoeclesia.finance.FinancialReportGeneratorTest;
import com.ecoeclesia.finance.LedgerServiceTest;
import com.ecoeclesia.finance.DatabaseLedgerRepositoryTest;
import com.ecoeclesia.inventory.InventoryServiceTest;
import com.ecoeclesia.revenue.RevenueServiceTest;
import com.ecoeclesia.user.UserManagementControllerTest;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

public final class TestRunner {

    private TestRunner() {
    }

    public static void main(String[] args) throws Exception {
        List<Class<?>> tests = List.of(
                DatabaseUrlResolverTest.class,
                ExpenseServiceTest.class,
                LedgerServiceTest.class,
                FinancialReportGeneratorTest.class,
                DatabaseLedgerRepositoryTest.class,
                FileLedgerRepositoryTest.class,
                RevenueServiceTest.class,
                InventoryServiceTest.class,
                FinancialStatementImportServiceTest.class,
                UserAccessPolicyTest.class,
                UserManagementControllerTest.class
        );

        int executed = 0;
        int failed = 0;
        for (Class<?> testClass : tests) {
            Object instance = testClass.getDeclaredConstructor().newInstance();
            for (Method method : testClass.getDeclaredMethods()) {
                if (method.isAnnotationPresent(Test.class)) {
                    executed++;
                    try {
                        method.setAccessible(true);
                        method.invoke(instance);
                    } catch (InvocationTargetException ex) {
                        failed++;
                        Throwable cause = ex.getCause();
                        System.err.printf("[FAIL] %s.%s: %s%n", testClass.getSimpleName(), method.getName(), cause.getMessage());
                        cause.printStackTrace(System.err);
                    }
                }
            }
        }

        if (failed > 0) {
            System.err.printf("%d of %d tests failed.%n", failed, executed);
            System.exit(1);
        } else {
            System.out.printf("All %d tests passed.%n", executed);
        }
    }
}
