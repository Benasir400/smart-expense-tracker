package com.example.backend.service;

import com.example.backend.dto.SalaryRequest;
import com.example.backend.entity.Salary;
import com.example.backend.repository.SalaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class SalaryService {

    private final SalaryRepository salaryRepository;

    public String saveSalary(SalaryRequest request) {

        LocalDate today = LocalDate.now();

        int month = today.getMonthValue();
        int year = today.getYear();

        boolean exists =
                salaryRepository
                        .findByEmailAndMonthAndYear(
                                request.getEmail(),
                                month,
                                year
                        )
                        .isPresent();

        if (exists) {
            return "Salary already saved for this month";
        }

        Salary salary = Salary.builder()
                .email(request.getEmail())
                .amount(request.getAmount())
                .month(month)
                .year(year)
                .build();

        salaryRepository.save(salary);

        return "Salary Saved Successfully";
    }

    public Salary getCurrentMonthSalary(String email) {

        LocalDate today = LocalDate.now();

        return salaryRepository
                .findByEmailAndMonthAndYear(
                        email,
                        today.getMonthValue(),
                        today.getYear()
                )
                .orElse(null);
    }
}