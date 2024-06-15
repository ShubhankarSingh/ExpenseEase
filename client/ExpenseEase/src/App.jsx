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


function App() {
 

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/expense-dashboard" element={<ExpenseDashBoard/>}/>
          <Route path="/add-expense" element={<AddExpense/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
