package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Expense;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long> {

    List<Expense> findByUserEmail(
            String userEmail
    );
}
