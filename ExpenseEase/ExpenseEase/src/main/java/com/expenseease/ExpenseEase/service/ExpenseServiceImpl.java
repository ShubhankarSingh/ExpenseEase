package com.expenseease.ExpenseEase.service;

import com.expenseease.ExpenseEase.model.Expense;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ExpenseServiceImpl {

    Expense addNewExpense(String expenseName, Double amount, Date expenseDate, String description, Long categoryId);

    List<Expense> getAllExpenses();

    List<Expense> getExpensesByMonth(int month);

    Optional<Expense> getExpenseById(Long expenseId);

    void deleteExpense(Long expenseId);

    Expense editExpense(Long expenseId, String expenseName, Double amount, Date expenseDate, String description, Long categoryId);
}
