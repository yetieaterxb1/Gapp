import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from "react-router-dom"

import { Provider } from 'react-redux'
import { withCookies, CookiesProvider } from 'react-cookie'

import Splash from './components/Splash/Splash'
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'
import Home from './components/User/Home'

import store from './store'

const App = props => {
  return (
    <CookiesProvider>
      <Provider store={ store }>
        <HashRouter basename='/'>
          <Switch >
            <Route exact path='/' component={ withCookies(Splash) } />
            <Route path='/login' component={ withCookies(Login) } />
            <Route path='/signup' component={ withCookies(Signup) } />
            <Route path='/user' component={ withCookies(Home) } />
          </Switch>
        </HashRouter>
      </Provider>
    </CookiesProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

if (module.hot) {
  module.hot.accept('./App.js')
}