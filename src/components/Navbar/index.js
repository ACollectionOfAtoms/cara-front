import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <nav>
    <ul>
      <li>
        <Link to="/"> Home </Link>
      </li>
      <li>
        <Link to="/compare-faces"> Faces </Link>
      </li>
    </ul>
  </nav>
)
