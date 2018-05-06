import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const TermsOfUseCopy1 = () => (
  <div className="terms-of-use">
    <p className="terms-of-use__copy">
      While you are not required to publish the activity of your user, or even
      supply scientifically-accurate personal information for this
      demonstration, be mindful the data you supply here is intended to help
      demonstrate for the public how indispensable{' '}
      <strong>accountability</strong> is for a prosperous economy.
    </p>
    <p className="terms-of-use__copy">
      The greatest human threat to an economy has little to do with those who
      exploit the absence of accountability to safely pursue whatever minor
      offenses are common among its youth.
    </p>
    <Link to="/account/create/2">
      <button type="submit" className="next-button">
        Next
      </button>
    </Link>
  </div>
)

const TermsOfUseCopy2 = () => (
  <div className="terms-of-use">
    <p className="terms-of-use__copy">
      Rather, the greatest human threat to an economy comes by way of that
      fellow who wears a suit and tie everyday, boasts of never having{' '}
      <i>touched the stuff</i>, and then exploits the same absence of
      accountability to grant funds and fallacious degrees to anyone who will
      justify theft of the public's purchasing power through money printing,
      pollute its supply with default risk, and manipulate its borrowing cost so
      that capital may continue to be acquired after producing nothing.
    </p>
    <Link to="/account/create/3">
      <button type="submit" className="next-button">
        Next
      </button>
    </Link>
  </div>
)

const TermsOfUseCopy3 = props => (
  <div className="terms-of-use">
    <p className="terms-of-use__copy">
      While the former is to receive patience and compassion, the latter is to
      receive our swift justice.
    </p>
    <p className="terms-of-use__copy">
      Our weapon is scientific truth, and by accepting these Terms of Use you
      agree to take up arms with us:
    </p>
    <p className="terms-of-use__copy">
      Ye shall do no unrighteousness in judgment, in meteyard, in weight, or in
      measure.
    </p>
    <Link to="/account/create/4">
      <button type="submit" onClick={props.agree} className="i-agree-button">
        I Agree
      </button>
    </Link>
  </div>
)

TermsOfUseCopy3.propTypes = {
  onClick: PropTypes.func
}

export { TermsOfUseCopy1, TermsOfUseCopy2, TermsOfUseCopy3 }
