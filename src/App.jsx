import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Header from './components/Header'

function App() {
  const location = useLocation()
  const [pageTitle, setPageTitle] = useState('')

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setPageTitle('')
        break
      case '/about':
        setPageTitle('About')
        break
      default:
        setPageTitle('Not Found')
    }
  }, [location])

  return (
    <>
      <Header />
      <h2 style={{ textAlign: 'center', marginTop: '7rem' }}>{pageTitle}</h2>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
