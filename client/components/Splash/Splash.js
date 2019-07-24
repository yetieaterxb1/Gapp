import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button'

class Splash extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <h1> Splash/landing page </h1>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button variant="contained"> Login </Button>
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Button variant="contained"> Signup </Button>
        </Link>
      </div>
    )
  }
}

export default Splash