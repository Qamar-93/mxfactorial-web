import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// import { createAccount } from '../../../dependencies/cognito'

const WaitButton = props => {
  return (
    <Link to="/account/create/9">
      <button
        type="button"
        className="next-button"
        onClick={props.createAccount}
      >
        Submit
      </button>
    </Link>
  )
}

const SubmitButton = props => {
  return (
    <Link to="/account/create/10">
      <button
        type="button"
        className="next-button"
        onClick={props.createAccount}
      >
        Submit
      </button>
    </Link>
  )
}

const CreateAccountForm6 = props => {
  return (
    <div className="create-account-form__container">
      <form className="create-account-form">
        <input
          name="account"
          type="text"
          onChange={props.onChange}
          placeholder="account"
        />
        <input
          name="password"
          type="password"
          onChange={props.onChange}
          placeholder="password"
        />
        <input
          name="emailAddress"
          type="email"
          onChange={props.onChange}
          placeholder="email"
        />
        {props.profileValueCount === 20 ? (
          <SubmitButton createAccount={props.createAccount} />
        ) : (
          <WaitButton createAccount={props.createAccount} />
        )}
      </form>
      {/* <div>
        <button className="test-button" onClick={props.show}>
          Show State
        </button>
      </div> */}
      {/* <div>
        <button className="test-button" onClick={props.populate}>
          Populate State
        </button>
      </div> */}
    </div>
  )
}

CreateAccountForm6.propTypes = {
  onChange: PropTypes.func
}

export default CreateAccountForm6
