package com.expenseease.ExpenseEase.service;

import com.expenseease.ExpenseEase.model.Expense;

import java.util.Date;
import java.util.List;

public interface ExpenseServiceImpl {

    Expense addNewExpense(String expenseName, Double amount, String description);

    List<Expense> getAllExpenses();

    void deleteExpense(Long expenseId);


}
