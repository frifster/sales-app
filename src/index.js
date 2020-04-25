import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'

import Home from './components/Home'
import LoginPage from './components/external/login'
import { FIREBASE_CONFIG } from './constants/app'

firebase.initializeApp(FIREBASE_CONFIG)

const Internal = () => (
  <Switch>
    <Route path='/' component={Home} />
  </Switch>
)

const External = () => (
  <Switch>
    <Route path='/' component={LoginPage} />
  </Switch>
)

const Render = (Component) => ReactDOM.render(
  <BrowserRouter>
    <Component />
  </BrowserRouter>,
  document.getElementById('invoiceMaker')
)

firebase.auth().onAuthStateChanged((loggedUser) => {
  Render(loggedUser ? Internal : External)
})
