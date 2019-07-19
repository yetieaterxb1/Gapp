import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter, HashRouter, Route } from "react-router-dom"

import { Provider } from 'react-redux'

import Splash from './components/Splash/Splash'
import Login from './components/Login/Login'
import Home from './components/User/Home'

import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter basename='/'>
          <>
            <Route exact path='/' component={withRouter(Splash)}/>
            <Route path='/login' component={withRouter(Login)}/>
            <Route path='/user' component={withRouter(Home)}/>
          </>
        </HashRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))

if (module.hot) {
  module.hot.accept('./App.js', function(){
    console.log('Module replaced.')
  })
}