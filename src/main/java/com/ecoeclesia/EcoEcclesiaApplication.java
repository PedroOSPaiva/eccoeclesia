package com.ecoeclesia;

import com.ecoeclesia.expense.ExpenseService;
import com.ecoeclesia.expense.InMemoryExpenseRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point da aplicação. Agora gerenciado pelo Spring Boot.
 */
@SpringBootApplication
public class EcoEcclesiaApplication {

    public static void main(String[] args) {
        // O Spring Boot assume o controle, inicia o Tomcat e segura a JVM rodando.
        SpringApplication.run(EcoEcclesiaApplication.class, args);

        // Seus prints podem continuar aqui, eles vão rodar logo após a inicialização do Spring.
        var repository = new InMemoryExpenseRepository();
        var service = new ExpenseService(repository);
        service.registerExpense("visitantes", "Coffee for visitors", "25.00");

        System.out.println("""
                ███████╗ ██████╗ ██████╗ ███████╗ ██████╗ ██████╗██╗     ███████╗███████╗██╗ █████╗
                ██╔════╝██╔════╝██╔═══██╗██╔════╝██╔════╝██╔════╝██║     ██╔════╝██╔════╝██║██╔══██╗
                █████╗  ██║     ██║   ██║█████╗  ██║     ██║     ██║     █████╗  ███████╗██║███████║
                ██╔══╝  ██║     ██║   ██║██╔══╝  ██║     ██║     ██║     ██╔══╝  ╚════██║██║██╔══██║
                ███████╗╚██████╗╚██████╔╝███████╗╚██████╗╚██████╗███████╗███████╗███████║██║██║  ██║
                ╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝╚═╝╚═╝  ╚═╝
                """);
        System.out.println("EcoEcclesia backend is ready – stored " + service.listExpenses().size() + " expense(s).");
        System.out.println("Projeto criado por Pedro Henrique Oliveira Souza Paiva.");
        System.out.println("Desenvolvido e idealizado na comunidade São João Bosco,");
        System.out.println("na Paróquia da Imaculada Conceição.");
        System.out.println("Em memória de minha avó Arlete, com gratidão.");
    }
}