import React from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import Loader from '../Common/Loader'

import loginActionCreator from '../../store/actions/login.js'

const styles = {
  grid: {
    marginTop: 100
  },
  card: {
    maxWidth: 345,
    margin: 'auto'
  },
  button: {
    backgroundColor: 'white'
  },
  accountBoxIcon: {
    float: 'right'
  },
  message: {
    color: 'tomato'
  }
}

const Signup = props => {

  const { 
    classes,
    message,
    isAuthenticated,
    isLoading,
    submitSignup
  } = props

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      submitSignup()
    }
  }

  useEffect(()=>{
    checkAuth()
  })

  return (
    isAuthenticated ?
      <Redirect to='/user' /> :
      <>
        <Loader display={ isLoading } />
        <Grid container className={ classes.grid } justify='center' >
          <span style={ {display: isLoading ? 'none' : 'initial'} } >
            <Card onKeyPress={ handleKeyPress } className={ classes.card } >
              <CardContent >
                <AccountBoxIcon className={ classes.accountBoxIcon } />
                <TextField id='email' label='Email' autoComplete='email' margin='normal' />
                <TextField id='username' label='Username' autoComplete='username' margin='normal' />
                <TextField id='password' label='Password' autoComplete='new-password' type='password' margin='normal' />
              </CardContent>
              <CardActions>
                <Button className={ classes.button } onClick={ submitSignup } variant='contained' size="small" > Submit </Button>
              </CardActions>
            </Card>
            <p className={ classes.message }>{ message }</p>
          </span>
        </Grid>
      </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    message: state.login.message,
    isLoading: state.login.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitSignup: () => {
      dispatch(loginActionCreator.submitSignup())
    },
    checkAuth: () => {
      dispatch(loginActionCreator.checkAuth())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Signup))