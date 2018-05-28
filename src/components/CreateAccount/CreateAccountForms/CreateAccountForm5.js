import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CreateAccountForm5 = props => (
  <div className="create-account-form__container">
    <form className="create-account-form">
      <input
        type="text"
        name="dateOfBirth"
        onFocus={props.typeToDate}
        onBlur={props.typeToText}
        onChange={props.onChange}
        className="input-theme date-of-birth"
        placeholder="Date of birth"
      />
      <input
        name="industryName"
        className="input-theme"
        type="text"
        onChange={props.onChange}
        placeholder="Industry"
      />
      <input
        name="occupationName"
        className="input-theme"
        type="text"
        onChange={props.onChange}
        placeholder="Occupation"
      />
      <Link to="/account/create/9">
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

CreateAccountForm5.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
}

export default CreateAccountForm5
