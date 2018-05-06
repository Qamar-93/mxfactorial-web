import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import logo from '../../assets/images/mxfactorial.png'
import {
  TermsOfUseCopy1,
  TermsOfUseCopy2,
  TermsOfUseCopy3
} from '../../components/CreateAccount/TermsOfUseCopy/TermsOfUseCopy'
import {
  CreateAccountForm1,
  CreateAccountForm2,
  CreateAccountForm3,
  CreateAccountForm4,
  CreateAccountForm5,
  CreateAccountForm6,
  CreateAccountForm7
} from '../../components/CreateAccount/CreateAccountForms/'
import { CREATE_ACCOUNT_URI, axiosRequest } from '../../dependencies/axios'
import './CreateAccount.css'

export const resetProfile = {
  account: '',
  agrees: false,
  firstName: '',
  middleName: '',
  lastName: '',
  country: '',
  streetNumber: '',
  streetName: '',
  floorNumber: '',
  unit: '',
  cityName: '',
  stateName: '',
  postalCode: '',
  countryDialingCode: '',
  areaCode: '',
  phoneNumber: '',
  dateOfBirth: '',
  industryName: '',
  occupationName: '',
  emailAddress: ''
}

//Used in handlePopulateState() to avoid
//manual testing 20 inputs
export const testProfile = {
  account: 'seventeen',
  agrees: true,
  firstName: 'One',
  middleName: 'Two',
  lastName: 'Three',
  country: 'Four',
  streetNumber: '5',
  streetName: '6',
  floorNumber: '7',
  unit: '8',
  cityName: 'Nine',
  stateName: 'Ten',
  postalCode: 'Eleven',
  countryDialingCode: '12',
  areaCode: '13',
  phoneNumber: '14',
  dateOfBirth: '2018-04-12',
  industryName: 'Fifteen',
  occupationName: 'Sixteen',
  emailAddress: 'test@example.net'
}

export default class CreateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = { agrees: false }
  }

  //Records the agreement of the user when selecting
  // I Agree button on TermsOfUseCopy3
  agreeHandler() {
    this.setState({
      ...this.state,
      agrees: !this.state.agrees
    })
  }

  //Passed to all form components during sign up
  //which adds properties and values as user enters them
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //For testing
  showState() {
    console.log(this.state)
  }

  //Changes date input field to text onblur
  handleTypeToText(e) {
    e.currentTarget.type = 'text'
  }

  //Returns date input field form to date onfocus
  handleTypeToDate(e) {
    e.currentTarget.type = 'date'
  }

  //For testing
  handlePopulateState() {
    this.setState(testProfile, () => {
      console.log(this.state)
    })
  }

  handleCreateAccountRequest() {
    //temporary test if keys are present to
    //reduce api requests during development
    if (Object.keys(this.state).length === 20) {
      // console.log('Sending your data up..')
      axiosRequest('post', CREATE_ACCOUNT_URI, this.state).then(result => {
        if (result.status === 200) {
          this.setState(resetProfile)
        } else {
          alert('Request failed')
        }
      })
    } else {
      alert('Please fill out all fields')
    }
  }

  render() {
    return (
      <div className="create-account-screen">
        <header className="create-account-header">
          <Link to="/" className="create-account-logo-link">
            <img src={logo} className="create-account-logo" alt="logo" />
          </Link>
        </header>
        <Switch>
          <Route exact path="/account/create/1" component={TermsOfUseCopy1} />
          <Route exact path="/account/create/2" component={TermsOfUseCopy2} />
          <Route
            exact
            path="/account/create/3"
            render={props => (
              <TermsOfUseCopy3 {...props} agree={() => this.agreeHandler()} />
            )}
          />
          <Route
            exact
            path="/account/create/4"
            render={props => (
              <CreateAccountForm1
                {...props}
                onChange={e => this.handleChange(e)}
                show={() => this.showState()}
              />
            )}
          />
          <Route
            exact
            path="/account/create/5"
            render={props => (
              <CreateAccountForm2
                {...props}
                onChange={e => this.handleChange(e)}
                show={() => this.showState()}
              />
            )}
          />
          <Route
            exact
            path="/account/create/6"
            render={props => (
              <CreateAccountForm3
                {...props}
                onChange={e => this.handleChange(e)}
                show={() => this.showState()}
              />
            )}
          />
          <Route
            exact
            path="/account/create/7"
            render={props => (
              <CreateAccountForm4
                {...props}
                onChange={e => this.handleChange(e)}
                show={() => this.showState()}
              />
            )}
          />
          <Route
            exact
            path="/account/create/8"
            render={props => (
              <CreateAccountForm5
                {...props}
                onChange={e => this.handleChange(e)}
                show={() => this.showState()}
                typeToDate={e => this.handleTypeToDate(e)}
                typeToText={e => this.handleTypeToText(e)}
              />
            )}
          />
          <Route
            exact
            path="/account/create/9"
            render={props => (
              <CreateAccountForm6
                {...props}
                profileValueCount={Object.keys(this.state).length}
                onChange={e => this.handleChange(e)}
                show={() => this.showState()}
                createAccount={() => this.handleCreateAccountRequest()}
                populate={() => this.handlePopulateState()}
              />
            )}
          />
          <Route
            exact
            path="/account/create/10"
            render={props => (
              <CreateAccountForm7
                {...props}
                onChange={e => this.handleChange(e)}
                show={() => this.showState()}
              />
            )}
          />
          <Route component={TermsOfUseCopy1} />
        </Switch>
      </div>
    )
  }
}

CreateAccount.propTypes = {
  onChange: PropTypes.func,
  show: PropTypes.func,
  agree: PropTypes.func,
  typeToDate: PropTypes.func,
  typeToText: PropTypes.func,
  profileValueCount: PropTypes.func,
  createAccount: PropTypes.func,
  populate: PropTypes.func
}
