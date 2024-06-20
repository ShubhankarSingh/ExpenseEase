package com.expenseease.ExpenseEase.repository;

import com.expenseease.ExpenseEase.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByCategoryId(Long categoryId);
    Category findByCategory(String category);
}
