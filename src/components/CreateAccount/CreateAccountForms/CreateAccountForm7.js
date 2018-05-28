import React from 'react'
import { Link } from 'react-router-dom'

const CreateAccountForm7 = () => (
  <div className="create-account-form__container">
    <p className="create-account__submission__copy">
      A verification email containing a 60 minute expiration was sent.
    </p>
    <p className="create-account__submission__copy">
      After you select the URL sent in the verification email, verify your
      password on the resulting page to complete creation of an account with a
      demo balance of 1,000.
    </p>
    <p className="create-account__submission__copy">
      An email address may again be attempted for registration after
      authentication fails 3 times on the verification page.
    </p>
    <Link to="/account/create/1">
      <button type="button" className="button-theme okay-button">
        Okay
      </button>
    </Link>
    {/* <div>
      <button className='button-theme test-button'
        onClick={props.show}
      >Test</button>
    </div> */}
  </div>
)

export default CreateAccountForm7
