import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CreateAccountForm1 = props => (
  <div className="create-account-form__container">
    <form className="create-account-form">
      <input
        name="firstName"
        className="input-theme"
        type="text"
        onChange={props.onChange}
        placeholder="First name"
      />
      <input
        name="middleName"
        className="input-theme"
        type="text"
        onChange={props.onChange}
        placeholder="Middle name"
      />
      <input
        name="lastName"
        className="input-theme"
        type="text"
        onChange={props.onChange}
        placeholder="Last name"
      />
      <input
        name="country"
        className="input-theme"
        type="text"
        onChange={props.onChange}
        placeholder="Country"
      />
      <Link to="/account/create/5">
        <button type="submit" className="button-theme next-button">
          Next
        </button>
      </Link>
    </form>
    {/* <div>
      <button className='button-theme test-button'
        onClick={props.show}
      >Test</button>
    </div> */}
  </div>
)

CreateAccountForm1.propTypes = {
  onChange: PropTypes.func
}

export default CreateAccountForm1
