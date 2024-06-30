package com.expenseease.ExpenseEase.repository;

import com.expenseease.ExpenseEase.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


}
