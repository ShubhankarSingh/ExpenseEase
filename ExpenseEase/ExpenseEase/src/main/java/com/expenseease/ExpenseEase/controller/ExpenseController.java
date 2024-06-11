package com.expenseease.ExpenseEase.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExpenseController {

    @GetMapping("/")
    public String Home(){
        return "home";
    }

}

