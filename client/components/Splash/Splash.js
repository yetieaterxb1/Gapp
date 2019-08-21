import React from 'react'
import { Link } from "react-router-dom"

import { withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const styles = {
  loginLink: {
    textDecoration: 'none'
  },
  signupLink: {
    textDecoration: 'none' 
  }
}

const Splash = props => {
  const { classes } = props
  return (
    <Box>
      <h1> Splash/landing page </h1>
      <Link to="/login" classNames={ classes.loginLink }>
        <Button variant="contained"> Login </Button>
      </Link>
      <Link to="/signup" classNames={ classes.signupLink }>
        <Button variant="contained"> Signup </Button>
      </Link>
    </Box>
  )
}

export default withStyles(styles)(Splash)