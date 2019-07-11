import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
  // Link 
} from "react-router-dom";

import Splash from './components/Splash'
import Login from './components/Login'
import Home from './components/Home'
// import Navigation from './components/Navbar'
 
class App extends Component {
  render() {
    return (
      <>
      <p>HELO!</p>
      <Router>
        <Switch>
          <Route exact path='/' component={Splash}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/home' component={Home}/>
        </Switch>
      </Router>
      </>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))

if (module.hot) {
  module.hot.accept('./App.js', function(){
    console.log('Module replaced.')
  })
}