package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Expense;

public interface ExpenseRepository
extends JpaRepository<Expense, Long> {
}
