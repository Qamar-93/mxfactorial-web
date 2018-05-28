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
        <input
          className="input-theme account"
          type="text"
          placeholder="account"
        />
        <input
          className="input-theme password"
          type="password"
          placeholder="password"
        />
        <hr />
        {/*temporarily adding link to home screen prior to auth*/}
        <Link to="/account">
          <button className="button-theme sign-in" type="submit">
            Sign In
          </button>
        </Link>
        <Link to="/account/create/1">
          <button className="button-theme create-account" type="submit">
            Create
          </button>
        </Link>
      </form>
    </div>
  )
}

export default LandingScreen
