package com.example.backend.controller;

import com.example.backend.dto.SalaryRequest;
import com.example.backend.entity.Salary;
import com.example.backend.service.SalaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/salary")
@CrossOrigin("*")
@RequiredArgsConstructor
public class SalaryController {

    private final SalaryService salaryService;

    @PostMapping("/save")
    public String saveSalary(
            @RequestBody SalaryRequest request
    ) {
        return salaryService.saveSalary(request);
    }

    @GetMapping("/{email}")
    public Salary getSalary(
            @PathVariable String email
    ) {
        return salaryService.getCurrentMonthSalary(email);
    }
}