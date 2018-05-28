import React from 'react'
import { Link } from 'react-router-dom'
import './MobileNav.css'

const MobileNav = () => (
  <ul className="mobile-nav__list">
    <li>Requests</li>
    <li>History</li>
    <li>Rules</li>
    <li>Query</li>
    <li>Support</li>
    <li className="sign-out-button">
      {/*temporarily adding link to landing screen prior to auth*/}
      <Link to="/">Sign Out</Link>
    </li>
  </ul>
)

export { MobileNav }
