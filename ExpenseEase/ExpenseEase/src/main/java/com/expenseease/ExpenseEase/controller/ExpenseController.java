package com.expenseease.ExpenseEase.controller;


import com.expenseease.ExpenseEase.model.Expense;
import com.expenseease.ExpenseEase.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/expense")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping("/home")
    public String home(){
        return "ExpenseEase";
    }


    @PostMapping("/add-expense")
    public ResponseEntity<Expense> addNewExpense (@RequestParam("expenseName") String expenseName,
                                                  @RequestParam("amount") Double amount,
                                                  @RequestParam("description") String description){

        Expense savedExpense = expenseService.addNewExpense(expenseName, amount, description);
        return ResponseEntity.ok(savedExpense);
    }

    @GetMapping("/all-expenses")
    public ResponseEntity<List<Expense>> getAllExpenses(){

        List <Expense> expenses = expenseService.getAllExpenses();

        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/delete-expense/{expenseId}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long expenseId){
        expenseService.deleteExpense(expenseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<>
}

