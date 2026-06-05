package com.example.backend.service;

import com.example.backend.entity.UserSalary;
import com.example.backend.repository.UserSalaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;

@Service
@RequiredArgsConstructor
public class SalaryService {

    private final UserSalaryRepository repo;

    // SAVE SALARY (LOCK PER MONTH)
    public UserSalary saveSalary(String userId, Double salary) {

        String monthYear = YearMonth.now().toString();

        repo.findByUserIdAndMonthYear(userId, monthYear)
                .ifPresent(s -> {
                    throw new RuntimeException("Salary already locked for this month");
                });

        UserSalary data = UserSalary.builder()
                .userId(userId)
                .monthYear(monthYear)
                .salary(salary)
                .createdAt(LocalDateTime.now())
                .build();

        return repo.save(data);
    }

    // GET CURRENT MONTH SALARY
    public UserSalary getSalary(String userId) {

        String monthYear = YearMonth.now().toString();

        return repo.findByUserIdAndMonthYear(userId, monthYear)
                .orElse(null);
    }
}