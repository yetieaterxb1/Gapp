import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'

import Appbar from '../Common/Appbar'
import Loader from '../Common/Loader'
import ProjectList from './ProjectList'
import ProjectPanel from './ProjectPanel'

import loginActionCreator from '../../store/actions/login.js'
import userActionCreator from '../../store/actions/user.js'

const styles = {
  
}

class Home extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    this.props.checkAuth()
    this.props.getProfile()
  }
  render() {
    if(!this.props.isAuthenticated){
      return <Redirect to='/login'/>
    }
    return (
      <>
        <Loader display={this.props.isLoading}/>
        <div>
          <Appbar cookies={this.props.cookies} />
          <Grid container direction='row' alignItems='flex-start' spacing={3}>
              <Grid item xs={3} >
                <ProjectList />
              </Grid>
            <Grid item xs={ this.props.showProjectList? 9:12}>
              <ProjectPanel />
            </Grid>
          </Grid>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.login.open,
    jwt: state.login.jwt,
    username: state.login.username,
    isAuthenticated: state.login.isAuthenticated,
    message: state.login.isAuthenticated,
    isLoading: state.login.isLoading,
    cookies: ownProps.cookies,
    showProjectList: state.user.showProjectList
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProfile: () => {
      dispatch(userActionCreator.getProfile(ownProps.cookies))
    },
    submitLogout: (credentials) => {
        dispatch(loginActionCreator.submitLogout(ownProps.cookies))
    },
    onChange: (event) => {
      dispatch(loginActionCreator.onChange(event))
    },
    checkAuth: () => {
      dispatch(loginActionCreator.checkAuth(ownProps.cookies))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
