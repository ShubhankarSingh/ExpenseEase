package com.expenseease.ExpenseEase.service;

import com.expenseease.ExpenseEase.model.Expense;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ExpenseService implements ExpenseServiceImpl{

    @Override
    public Expense addNewExpense(String expenseName, Double amount, String description, Date createdDate) {
        return null;
    }
}
