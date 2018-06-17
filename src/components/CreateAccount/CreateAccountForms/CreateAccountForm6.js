import React from 'react'
import PropTypes from 'prop-types'

const CreateAccountForm6 = props => {
  return (
    <div className="create-account-form__container">
      <form className="create-account-form">
        <input
          name="account"
          className="input-theme"
          type="text"
          onChange={props.onChange}
          placeholder="account"
        />
        <input
          name="password"
          className="input-theme"
          type="password"
          onChange={props.onChange}
          placeholder="password"
        />
        <input
          name="emailAddress"
          className="input-theme"
          type="email"
          onChange={props.onChange}
          placeholder="email"
        />
        <button
          type="button"
          className="button-theme next-button"
          onClick={props.createAccount}
        >
          Submit
        </button>
      </form>
      {/* <div>
        <button className="button-theme test-button" onClick={props.show}>
          Show State
        </button>
      </div> */}
      {/* <div>
        <button className="button-theme test-button" onClick={props.populate}>
          Populate State
        </button>
      </div> */}
      {/* <div>
        <button className="button-theme test-button" onClick={props.cognito}>
          Show Tokens
        </button>
      </div> */}
      {/* <div>
        <button className="button-theme test-button" onClick={props.signOut}>
          Sign Out
        </button>
      </div> */}
    </div>
  )
}

CreateAccountForm6.propTypes = {
  onChange: PropTypes.func
}

export default CreateAccountForm6
