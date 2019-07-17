import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, StaticRouter, Switch, withRouter, Route } from "react-router-dom";
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import Splash from './components/Splash/Splash'
import Login from './components/Login/Login'
import Home from './components/User/Home'

// import Navigation from './components/Navbar'

const INIT_STATE = {
  credentials:{
    username: 'admin',
    password: 'password',
  },
  isAuthenticated: false,
  message: false

}

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk)),
)

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