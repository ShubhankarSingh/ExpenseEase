package com.expenseease.ExpenseEase.service;

import com.expenseease.ExpenseEase.model.Expense;
import com.expenseease.ExpenseEase.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService implements ExpenseServiceImpl{

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public Expense addNewExpense(String expenseName, Double amount, String description) {
        Expense expense = new Expense();
        expense.setExpenseName(expenseName);
        expense.setAmount(amount);
        expense.setDescription(description);

        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
}