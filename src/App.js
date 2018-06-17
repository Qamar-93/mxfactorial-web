import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import { LandingScreen } from './containers/LandingScreen/LandingScreen'
import CreateAccount from './containers/CreateAccount/CreateAccount'
import { HomeScreen } from './containers/HomeScreen/HomeScreen'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingScreen} />
      <Route path="/account/create/" component={CreateAccount} />
      <Route path="/account" component={HomeScreen} />
    </Switch>
  </BrowserRouter>
)

export default App
