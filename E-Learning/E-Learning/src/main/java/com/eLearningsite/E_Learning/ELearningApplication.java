package com.eLearningsite.E_Learning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class ELearningApplication {

	public static void main(String[] args) {

		SpringApplication.run(ELearningApplication.class, args);
	}

}
