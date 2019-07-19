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

class Home extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    const isAuthed = this.props.isAuthenticated
    console.log('Is Authed: ', isAuthed)
  }
  render() {
    if(!this.props.isAuthenticated){
      return <Redirect to='/login'/>
    }
    return (
      <>
        <Loader display={this.props.isLoading}/>
        <div>
          <Appbar />
          <Grid container direction="row" alignItems="flex-start" spacing={3}>
            <Grid item xs={3}>
              <ProjectList />
            </Grid>
            <Grid item xs={9}>
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
    credentials: state.login.credentials,
    open: state.login.open,
    isAuthenticated: state.login.isAuthenticated,
    message: state.login.isAuthenticated,
    isLoading: state.login.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitLogout: (credentials) => {
        dispatch(loginActionCreator.submitLogout(credentials))
    },
    onChange: (event) => {
      dispatch(loginActionCreator.onChange(event))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
