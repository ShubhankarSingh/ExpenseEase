package com.expenseease.ExpenseEase.service;

import com.expenseease.ExpenseEase.model.Expense;
import com.expenseease.ExpenseEase.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService implements ExpenseServiceImpl{

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }


    @Override
    public Expense addNewExpense(String expenseName, Double amount, String description) {
        return null;
    }

    @Override
    public Expense addNewExpense(String expenseName, Double amount, Date expenseDate, String description, int categoryId) {
        Expense expense = new Expense();
        expense.setExpenseName(expenseName);
        expense.setAmount(amount);
        expense.setCreatedDate(expenseDate);
        expense.setDescription(description);
        expense.setCategoryId(categoryId);

        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public void deleteExpense(Long expenseId) {
        Optional<Expense> theExpense = expenseRepository.findById(expenseId);
        if(theExpense.isPresent()){
            expenseRepository.deleteById(expenseId);
        }

    }
}
