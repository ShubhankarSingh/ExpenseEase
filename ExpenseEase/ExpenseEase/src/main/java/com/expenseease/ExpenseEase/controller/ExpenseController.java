package com.expenseease.ExpenseEase.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/expense")
public class ExpenseController {

    @GetMapping("/home")
    public String home(){
        return "ExpenseEase";
    }

}

