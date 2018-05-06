import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CreateAccountForm4 = props => (
  <div className="create-account-form__container">
    <form className="create-account-form">
      <input
        name="countryDialingCode"
        type="text"
        onChange={props.onChange}
        placeholder="Country dialing code"
      />
      <input
        name="areaCode"
        type="text"
        onChange={props.onChange}
        placeholder="Area code"
      />
      <input
        name="phoneNumber"
        type="text"
        onChange={props.onChange}
        placeholder="Phone number"
      />
      <Link to="/account/create/8">
        <button type="button" className="next-button">
          Next
        </button>
      </Link>
    </form>
    {/* <div>
      <button className='test-button'
        onClick={props.show}
      >Test</button>
    </div> */}
  </div>
)

CreateAccountForm4.propTypes = {
  onChange: PropTypes.func
}

export default CreateAccountForm4
