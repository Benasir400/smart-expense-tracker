package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.Expense;
import com.example.backend.repository.ExpenseRepository;
import java.util.ArrayList;
import com.example.backend.dto.MonthlyExpenseDTO;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    // Save Expense
    public Expense saveExpense(
            Expense expense) {

        return repository.save(expense);
    }

    // Get All Expenses
    public List<Expense> getAllExpenses() {

        return repository.findAll();
    }

    // Get User Expenses
    public List<Expense> getExpensesByUser(
            String userEmail) {

        return repository.findByUserEmail(
                userEmail
        );
    }

    // Delete Expense
    public void deleteExpense(Long id) {

        repository.deleteById(id);
    }

    // Update Expense
    public Expense updateExpense(
            Long id,
            Expense updatedExpense) {

        Expense expense =
                repository.findById(id)
                .orElseThrow();

        expense.setTitle(
                updatedExpense.getTitle()
        );

        expense.setAmount(
                updatedExpense.getAmount()
        );

        expense.setCategory(
                updatedExpense.getCategory()
        );

        expense.setDate(
                updatedExpense.getDate()
        );

        expense.setUserEmail(
                updatedExpense.getUserEmail()
        );

        return repository.save(expense);
    }
    public List<MonthlyExpenseDTO> getMonthlyExpenseChart(
        String email) {

    List<Object[]> results =
            repository.getMonthlyExpenseChart(email);

    String[] months = {
            "",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
    };

    List<MonthlyExpenseDTO> chartData =
            new ArrayList<>();

    for (Object[] row : results) {

        Integer monthNumber =
                (Integer) row[0];

        Double totalAmount =
                ((Number) row[1]).doubleValue();

        chartData.add(
                new MonthlyExpenseDTO(
                        months[monthNumber],
                        totalAmount
                )
        );
    }

    return chartData;
}
}
