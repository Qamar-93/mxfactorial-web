import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/mxfactorial.png'
import './LandingScreen.css'

const LandingScreen = () => {
  return (
    <div className="landing-screen">
      <header className="landing-screen-header">
        <img src={logo} className="landing-screen-logo" alt="logo" />
      </header>
      <p className="intro">
        Demo web client for{' '}
        <a
          href="https://github.com/systemaccounting/mxfactorial"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>Mx!</i> platform
        </a>.
      </p>
      <form className="auth">
        <input className="account" type="text" placeholder="account" />
        <input className="password" type="password" placeholder="password" />
        <hr />
        <Link to="/account/create/1">
          <button className="create-account" type="submit">
            Create
          </button>
        </Link>
        <button className="sign-in" type="submit">
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LandingScreen
