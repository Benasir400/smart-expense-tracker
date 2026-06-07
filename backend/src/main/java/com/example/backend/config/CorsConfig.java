package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")
                        // allow your frontend + localhost
                        .allowedOriginPatterns(
                                "http://localhost:5173",
                                "https://smart-expense-tracker-chi-two.vercel.app"
                        )

                        // IMPORTANT: include OPTIONS for preflight
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")

                        .allowedHeaders("*")

                        // IMPORTANT: keep false to avoid CORS conflict
                        .allowCredentials(false);
            }
        };
    }
}