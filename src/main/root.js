import React, { Component } from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Home from '../components/home'

class App extends Component {
  render () {
    return (
      <div id='fleet-forms-child'>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </div>
    )
  }
}

export default App
