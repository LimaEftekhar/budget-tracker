import React from 'react'
import { Link, useLocation } from 'react-router'
import './Header.css'

export default function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
          About
        </Link>
      </nav>
    </header>
  )
}