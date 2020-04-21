import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

/*
  css
*/
import App from './main/root'

class Home extends Component {
  render () {
    return (
      <BrowserRouter>
        <AppContainer>
          <App />
        </AppContainer>
      </BrowserRouter>
    )
  }
}
export default Home

const wrapper = document.getElementById('invoiceMaker')
if (wrapper) ReactDOM.render(<Home />, wrapper)
