import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from "react-router-dom";

import Splash from './components/Splash/Splash'
import Login from './components/Login/Login'
import Home from './components/User/Home'

// import Navigation from './components/Navbar'



{/*
<Button to="/somewhere" renderAs={Link}>My button linked to react-router-dom</Button> 
*/}
 
class App extends Component {
  render() {
    {/*https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually*/}
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