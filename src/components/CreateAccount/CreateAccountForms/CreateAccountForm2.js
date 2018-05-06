import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CreateAccountForm2 = props => (
  <div className="create-account-form__container">
    <form className="create-account-form">
      <input
        name="streetNumber"
        type="text"
        onChange={props.onChange}
        placeholder="Street number"
      />
      <input
        name="streetName"
        type="text"
        onChange={props.onChange}
        placeholder="Street name"
      />
      <input
        name="floorNumber"
        type="text"
        onChange={props.onChange}
        placeholder="Floor number"
      />
      <input
        name="unit"
        type="text"
        onChange={props.onChange}
        placeholder="Unit"
      />
      <Link to="/account/create/6">
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

CreateAccountForm2.propTypes = {
  onChange: PropTypes.func
}

export default CreateAccountForm2
