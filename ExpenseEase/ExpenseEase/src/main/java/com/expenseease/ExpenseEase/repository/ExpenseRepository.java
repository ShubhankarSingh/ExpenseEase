package com.expenseease.ExpenseEase.repository;

import com.expenseease.ExpenseEase.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
