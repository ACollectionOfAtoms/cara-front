import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

export default () => (
  <nav className="nav-bar">
    <ul className="nav-list">
      <li>
        <Link to="/"> Home </Link>
      </li>
      <li>
        <Link to="/compare-faces"> Faces </Link>
      </li>
    </ul>
  </nav>
)
