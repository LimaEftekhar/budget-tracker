import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        Home
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
        About
      </NavLink>
      </nav>
    </header>
  )
}