import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Router, Routes, BrowserRouter, Route} from 'react-router-dom'
import Home from './components/home/Home'
import Dashboard from './components/home/Dashboard'
import ExpenseDashBoard from './components/home/ExpenseDashBoard'


function App() {
 

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/expense-dashboard" element={<ExpenseDashBoard/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
