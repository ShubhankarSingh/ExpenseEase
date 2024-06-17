package com.expenseease.ExpenseEase.model;

import jakarta.persistence.*;
import org.hibernate.annotations.BatchSize;

import java.util.Date;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expenseId;

    private String expenseName;

    private double amount;

    private String description;

    @ManyToOne()
    @JoinColumn(name="categoryId")
    private Category category;

    @Temporal(TemporalType.DATE)
    private Date createdDate;

    public Expense (){

    }

    public Expense(Long expenseId, String expenseName, double amount, String description, Date createdDate) {
        this.expenseId = expenseId;
        this.expenseName = expenseName;
        this.amount = amount;
        this.description = description;
        this.createdDate = createdDate;
    }

    public Long getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(Long expenseId) {
        this.expenseId = expenseId;
    }

    public String getExpenseName() {
        return expenseName;
    }

    public void setExpenseName(String expenseName) {
        this.expenseName = expenseName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
}
