package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserEmail(String userEmail);

    @Query("""
    SELECT MONTH(e.date) AS month, SUM(e.amount) AS total
    FROM Expense e
    WHERE e.userEmail = :email
    GROUP BY MONTH(e.date)
    ORDER BY MONTH(e.date)
""")
List<Object[]> getMonthlyExpenseChart(@Param("email") String email);
}