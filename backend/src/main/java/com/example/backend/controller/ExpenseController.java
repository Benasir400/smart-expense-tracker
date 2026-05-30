package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Expense;
import com.example.backend.service.ExpenseService;

@RestController
@RequestMapping("/expenses")
@CrossOrigin("*")
public class ExpenseController {

    @Autowired
    private ExpenseService service;

    @PostMapping
    public Expense addExpense(
            @RequestBody Expense expense) {
        return service.saveExpense(expense);
    }

    @GetMapping
    public List<Expense> getExpenses() {
        return service.getAllExpenses();
    }
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {

         service.deleteExpense(id);

          return "Expense Deleted Successfully";
       }
@PutMapping("/{id}")
public Expense updateExpense(
        @PathVariable Long id,
        @RequestBody Expense expense) {

    return service.updateExpense(id, expense);
}

}
