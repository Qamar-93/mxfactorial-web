import React from 'react'
import './MobileNav.css'

const MobileNav = props => (
  <ul className="mobile-nav__list">
    <li>Requests</li>
    <li>History</li>
    <li>Rules</li>
    <li>Query</li>
    <li>Support</li>
    {/*temporarily emulate sign out*/}
    <li onMouseDown={props.signOut} className="sign-out-button">
      Sign Out
    </li>
  </ul>
)

export { MobileNav }
