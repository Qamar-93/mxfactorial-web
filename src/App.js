import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import LandingScreen from './components/LandingScreen/LandingScreen'
import CreateAccount from './containers/CreateAccount/CreateAccount'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingScreen} />
      <Route path="/account/create/" component={CreateAccount} />
    </Switch>
  </BrowserRouter>
)

export default App
