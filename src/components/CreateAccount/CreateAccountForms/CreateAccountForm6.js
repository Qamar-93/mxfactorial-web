import React from 'react'
import PropTypes from 'prop-types'

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
        <button
          type="button"
          className="next-button"
          onClick={props.createAccount}
        >
          Submit
        </button>
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
