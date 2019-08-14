import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = {
  loginLink: {
    textDecoration: 'none'
  },
  signupLink: {
    textDecoration: 'none' 
  }
}

class Splash extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <h1> Splash/landing page </h1>
        <Link to="/login" classNames={ classes.loginLink }>
          <Button variant="contained"> Login </Button>
        </Link>
        <Link to="/signup" classNames={ classes.signupLink }>
          <Button variant="contained"> Signup </Button>
        </Link>
      </div>
    )
  }
}

export default withStyles(styles)(Splash)