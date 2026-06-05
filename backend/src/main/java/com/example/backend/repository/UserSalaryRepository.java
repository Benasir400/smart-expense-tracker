package com.example.backend.repository;

import com.example.backend.entity.UserSalary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserSalaryRepository extends JpaRepository<UserSalary, Long> {

    Optional<UserSalary> findByUserIdAndMonthYear(String userId, String monthYear);
}