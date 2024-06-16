package com.expenseease.ExpenseEase.controller;


import com.expenseease.ExpenseEase.model.Expense;
import com.expenseease.ExpenseEase.service.ExpenseService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;


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
                                                  @RequestParam("expenseDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date expenseDate,
                                                  @RequestParam("description") String description,
                                                  @RequestParam("category") int categoryId){

        System.out.println("Expenses: " + expenseName + " " + expenseDate);
        Expense savedExpense = expenseService.addNewExpense(expenseName, amount, expenseDate ,description, categoryId);
        return ResponseEntity.ok(savedExpense);
    }

    @GetMapping("/all-expenses")
    public ResponseEntity<List<Expense>> getAllExpenses(){

        List <Expense> expenses = expenseService.getAllExpenses();

        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/{expenseId}")
    public Optional<Expense> getExpenseById(@PathVariable Long expenseId){

        return expenseService.getExpenseById(expenseId);
    }

    @PutMapping("/edit-expense/{expenseId}")
    public ResponseEntity<Expense> editExpense(@PathVariable Long expenseId,
                                               @RequestParam(required = false) String expenseName,
                                               @RequestParam(required = false) Double amount,
                                               @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date expenseDate,
                                               @RequestParam(required = false) String description,
                                               @RequestParam(required = false) int categoryId){

        Expense updatedExpense = expenseService.editExpense(expenseId, expenseName, amount,
                                                            expenseDate, description, categoryId);

        return ResponseEntity.ok(updatedExpense);

    }

    @DeleteMapping("/delete-expense/{expenseId}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long expenseId){
        expenseService.deleteExpense(expenseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

