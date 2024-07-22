// import { useState } from 'react'
import './App.scss'
import './index.css'
import {Routes, Route} from 'react-router-dom'
import Layout from "./components/Layout"
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Portfolio from './components/Portfolio'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/DeveloperPortfolio/about" element={<About />} />
          <Route path="/DeveloperPortfolio/skills" element={<Skills />} />
          <Route path="/DeveloperPortfolio/contact" element={<Contact />} />
          <Route path="/DeveloperPortfolio/portfolio" element={<Portfolio/>} />
          <Route path="/DeveloperPortfolio/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App