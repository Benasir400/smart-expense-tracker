package com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SalaryRequest {

    private String userId;
    private Double salary;
} 
