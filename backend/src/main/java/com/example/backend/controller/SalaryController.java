package com.example.backend.controller;

import com.example.backend.dto.SalaryRequest;
import com.example.backend.entity.UserSalary;
import com.example.backend.service.SalaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/salary")
@CrossOrigin("*")
@RequiredArgsConstructor
public class SalaryController {

    private final SalaryService service;

    @PostMapping("/save")
    public String saveSalary(@RequestBody SalaryRequest req) {

        try {
            service.saveSalary(req.getUserId(), req.getSalary());
            return "Salary locked for this month";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @GetMapping("/{userId}")
    public UserSalary getSalary(@PathVariable String userId) {
        return service.getSalary(userId);
    }
}