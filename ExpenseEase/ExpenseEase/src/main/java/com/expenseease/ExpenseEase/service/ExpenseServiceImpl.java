package com.expenseease.ExpenseEase.service;

import com.expenseease.ExpenseEase.model.Expense;

import java.util.Date;

public interface ExpenseServiceImpl {

    Expense addNewExpense(String expenseName, Double amount, String description, Date createdDate);


}
