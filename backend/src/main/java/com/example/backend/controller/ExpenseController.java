package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.entity.Expense;
import com.example.backend.service.ExpenseService;

@RestController
@RequestMapping("/expenses")
@CrossOrigin("*")
public class ExpenseController {

    @Autowired
    private ExpenseService service;

    // Add Expense
    @PostMapping
    public Expense addExpense(
            @RequestBody Expense expense) {

        return service.saveExpense(expense);
    }

    // Get All Expenses
    @GetMapping
    public List<Expense> getExpenses() {

        return service.getAllExpenses();
    }

    // Get User Expenses
    @GetMapping("/user/{email}")
    public List<Expense> getUserExpenses(
            @PathVariable String email) {

        return service.getExpensesByUser(
                email
        );
    }

    // Delete Expense
    @DeleteMapping("/{id}")
    public String deleteExpense(
            @PathVariable Long id) {

        service.deleteExpense(id);

        return "Expense Deleted Successfully";
    }

    // Update Expense
    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense) {

        return service.updateExpense(
                id,
                expense
        );
    }
}