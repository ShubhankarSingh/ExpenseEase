package com.expenseease.ExpenseEase.service;

import com.expenseease.ExpenseEase.exception.ResourceNotFoundException;
import com.expenseease.ExpenseEase.model.Category;
import com.expenseease.ExpenseEase.model.Expense;
import com.expenseease.ExpenseEase.repository.CategoryRepository;
import com.expenseease.ExpenseEase.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService implements ExpenseServiceImpl{

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    public ExpenseService(ExpenseRepository expenseRepository, CategoryRepository categoryRepository) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
    }


    @Override
    public Expense addNewExpense(String expenseName, Double amount, Date createdDate, String description, String category) {

        Category theCategory = categoryRepository.findByCategory(category);

        Expense expense = new Expense();
        expense.setExpenseName(expenseName);
        expense.setAmount(amount);
        expense.setCreatedDate(createdDate);
        expense.setDescription(description);
        expense.setCategory(theCategory);

        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public Optional<Expense> getExpenseById(Long expenseId) {

        return expenseRepository.findById(expenseId);
    }

    @Override
    public void deleteExpense(Long expenseId) {
        Optional<Expense> theExpense = expenseRepository.findById(expenseId);
        if(theExpense.isPresent()){
            expenseRepository.deleteById(expenseId);
        }

    }

    @Override
    public Expense editExpense(Long expenseId, String expenseName, Double amount, Date createdDate, String description, String category) {
        Expense theExpense = expenseRepository.findById(expenseId).orElseThrow(() -> new ResourceNotFoundException("Expense not found"));

        Category theCategory = categoryRepository.findByCategory(category);

        if(expenseName!=null){
            theExpense.setExpenseName(expenseName);
        }
        if(amount != null) theExpense.setAmount(amount);
        if(createdDate != null) theExpense.setCreatedDate(createdDate);
        if(description != null) theExpense.setDescription(description);
        if(category != null) theExpense.setCategory(theCategory);

        return expenseRepository.save(theExpense);
    }

}
