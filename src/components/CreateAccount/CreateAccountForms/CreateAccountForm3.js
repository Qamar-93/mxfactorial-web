import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CreateAccountForm3 = props => (
  <div className="create-account-form__container">
    <form className="create-account-form">
      <input
        name="cityName"
        className="input-theme"
        type="text"
        onChange={props.onChange}
        placeholder="City"
      />
      <input
        name="stateName"
        className="input-theme"
        type="text"
        onChange={props.onChange}
        placeholder="State"
      />
      <input
        name="postalCode"
        className="input-theme"
        type="text"
        onChange={props.onChange}
        placeholder="Postal code"
      />
      <Link to="/account/create/7">
        <button type="button" className="button-theme next-button">
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

CreateAccountForm3.propTypes = {
  onChange: PropTypes.func
}

export default CreateAccountForm3
