package com.expenseease.ExpenseEase.repository;

import com.expenseease.ExpenseEase.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query(value = "SELECT * FROM expense WHERE MONTH(created_date) = :month", nativeQuery = true)
    List<Expense> findAllExpensesByMonth(int month);
}
