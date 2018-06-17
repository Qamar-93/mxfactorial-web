import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { authAccount } from '../../dependencies/cognito'
import logo from '../../assets/images/mxfactorial.png'
import './LandingScreen.css'
import PropTypes from 'prop-types'

class LandingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { account: '', password: '' }
    this.handleEventListener = this.handleEventListener.bind(this)
  }

  //covered by src/e2e/landingScreen.test.js
  componentDidMount() {
    window.addEventListener('keydown', this.handleEventListener)
  }

  //covered by src/e2e/landingScreen.test.js
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEventListener)
  }

  //covered by src/e2e/landingScreen.test.js
  handleEventListener(e) {
    if (e.key !== 'Enter') {
      return
    }
    e.preventDefault()
    document.querySelector('.sign-in').click()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAuth() {
    const account = this.state.account
    const password = this.state.password

    if (account.length < 1) {
      alert('account missing')
      return
    }

    if (password.length < 1) {
      alert('password missing')
      return
    }

    authAccount(account, password)
      .then(token => {
        if (token) {
          //show home screen
          this.setState({ account: '', password: '' }, () => {
            this.props.history.push('/account')
          })
        }
      })
      .catch(err => {
        const error = JSON.parse(err)
        return alert(error.message)
      })
  }

  render() {
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
            name="account"
            onChange={e => this.handleChange(e)}
            className="input-theme account"
            type="text"
            placeholder="account"
            value={this.state.account}
          />
          <input
            name="password"
            onChange={e => this.handleChange(e)}
            className="input-theme password"
            type="password"
            placeholder="password"
            value={this.state.password}
          />
          <hr />
          <button
            className="button-theme sign-in"
            type="button"
            onClick={() => this.handleAuth()}
          >
            Sign In
          </button>
          <Link to="/account/create/1">
            <button className="button-theme create-account" type="button">
              Create
            </button>
          </Link>
        </form>
      </div>
    )
  }
}

LandingScreen.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  onClick: PropTypes.func
}

export { LandingScreen }
