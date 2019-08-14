import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { useCookies } from 'react-cookie'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
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
  }
}

class Login extends Component {
  constructor(props){
    super(props)
    this.handleEnter = this.handleEnter.bind(this)
  }

  componentWillMount(){
    this.props.checkAuth()
    this.props.stopLoading()
  }

  handleEnter(e){
    if (e.key === 'Enter') {
      this.props.submitLogin()
    }
  }

  render() {
    const { 
      classes,
      message,
      isAuthenticated,
      isLoading,
      submitLogin
    } = this.props
    if( isAuthenticated ){
      return <Redirect to='/user'/>
    }
    return (
      <>
        <Loader display={ isLoading }/>
        <Grid container className={ classes.grid } justify='center' >
          <span style={ {display: isLoading ? 'none' : 'initial'} } >
            <Card onKeyPress={ this.handleEnter } className={ classes.card } >
              <CardContent >
                {/* <AccountBoxIcon style={ {float: 'right'} }/> */}
                <AccountBoxIcon className={ classes.accountBoxIcon }/>
                <TextField id='username' label='Username'  autoComplete='username' margin='normal' />
                <TextField id='password' label='Password' type='password' autoComplete='current-password' margin='normal' />
              </CardContent>
              <CardActions>
                <Button className={classes.button} onClick={ submitLogin } variant='contained' size="small"> Submit </Button>
              </CardActions>
            </Card>
            <p style={ {color: 'tomato'} }>{ message }</p>
          </span>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.login.open,
    isAuthenticated: state.login.isAuthenticated,
    message: state.login.message,
    isLoading: state.login.isLoading,
    cookies: ownProps.cookies
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitLogin: () => {
      const cookies = ownProps.cookies
      dispatch(loginActionCreator.submitLogin(cookies))
    },
    stopLoading: () => {
      dispatch(loginActionCreator.stopLoading())
    },
    checkAuth: () => {
      const cookies = ownProps.cookies
      dispatch(loginActionCreator.checkAuth(cookies))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login))