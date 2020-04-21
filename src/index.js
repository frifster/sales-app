import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

/*
  css
*/
import App from './main/root'

class Home extends Component {
  render () {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }
}
export default hot(App)

const wrapper = document.getElementById('invoiceMaker')
if (wrapper) ReactDOM.render(<Home />, wrapper)
