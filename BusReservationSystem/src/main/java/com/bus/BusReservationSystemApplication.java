package com.bus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.bus")
@EnableJpaRepositories(basePackages = "com.bus.repository")
@EntityScan(basePackages = "com.bus.entity")
public class BusReservationSystemApplication {

    public static void main(String[] args) {

        SpringApplication.run(
                BusReservationSystemApplication.class,
                args
        );

    }
}