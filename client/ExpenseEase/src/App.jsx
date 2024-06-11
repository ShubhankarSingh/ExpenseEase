import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Router, Routes, BrowserRouter, Route} from 'react-router-dom'
import Home from './components/home/Home'
import Dashboard from './components/home/Dashboard'


function App() {
 

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
