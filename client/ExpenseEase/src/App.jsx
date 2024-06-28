import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Router, Routes, BrowserRouter, Route} from 'react-router-dom'
import Home from './components/home/Home'
import Dashboard from './components/home/Dashboard'
import ExpenseDashBoard from './components/home/ExpenseDashBoard'
import { AddExpense } from './components/home/AddExpense';
import EditExpense from "./components/home/EditExpense";
import { ExpenseChart } from "./components/home/ExpenseChart";
import Navbar from "./components/layout/Navbar";
import { DisplayExpenses } from "./components/home/DisplayExpenses";


function App() {
 

  return (
    <main>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/expense-dashboard" element={<ExpenseDashBoard/>}/>
          <Route path="/all-expenses" element={<DisplayExpenses/>}/>
          <Route path="/add-expense" element={<AddExpense/>}/>
          <Route path="/edit-expense/:expenseId" element={<EditExpense/>}/>
          <Route path="/expense-chart/:month" element={<ExpenseChart/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
