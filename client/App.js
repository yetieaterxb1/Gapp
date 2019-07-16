import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from "react-router-dom";

import Splash from './components/Splash/Splash'
import Login from './components/Login/Login'
import Home from './components/User/Home'

// import Navigation from './components/Navbar'
 
class App extends Component {
  render() {
    return (
      <HashRouter basename='/'>
        <>
          <Route exact path='/' component={Splash}/>
          <Route path='/login' component={Login}/>
          <Route path='/usr/home' component={Home}/>
        </>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))

if (module.hot) {
  module.hot.accept('./App.js', function(){
    console.log('Module replaced.')
  })
}