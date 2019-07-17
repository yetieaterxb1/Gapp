import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import Loader from '../Common/Loader'

import loginActionCreator from '../../store/actions/login.js'


class Login extends Component {
  constructor(props){
    super(props)
  }

  render() {
    if(this.props.isAuthenticated){
      return <Redirect to='/user'/>
    }
    return (
      <>
      <Loader display={this.props.isLoading}/>
      <div style={{display: this.props.isLoading ? 'none' : 'initial'}}>
        <h1> Login </h1>
        <input id='username' value={this.props.credentials.username} onChange={this.props.onChange}></input>
        <input id='password' value={this.props.credentials.password} onChange={this.props.onChange}></input>
        <button onClick={this.props.submitLogin}></button>
        <p>{this.props.message}</p>
      </div>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    credentials: state.login.credentials,
    open: state.login.open,
    isAuthenticated: state.login.isAuthenticated,
    message: state.login.isAuthenticated,
    isLoading: state.login.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitLogin: (credentials) => {
        dispatch(loginActionCreator.submitLogin(credentials))
    },
    onChange: (event) => {
      dispatch(loginActionCreator.onChange(event))
    }
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)


