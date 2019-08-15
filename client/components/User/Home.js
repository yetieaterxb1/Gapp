import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'

import Appbar from './Appbar'
import Loader from '../Common/Loader'
import ProjectList from './ProjectList'
import ProjectPanel from './ProjectPanel'
import NewProjectModal from './NewProjectModal'

import loginActionCreator from '../../store/actions/login.js'
import userActionCreator from '../../store/actions/user.js'


class Home extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    this.props.closeNewProjectModal()
    this.props.checkAuth()
    this.props.getProfile()
  }
  render() {
    const {
      cookies,
      isAuthenticated, 
      isLoading,
      profile,
      showProjectList,
      currentProject,
    } = this.props
    if(!isAuthenticated){
      return <Redirect to='/login' />
    }
    return (
      <>
        <Loader display={ isLoading } />
        <NewProjectModal />
        <Appbar cookies={ cookies } />
        <Grid container direction='row' alignItems='flex-start' spacing={3}>
          <Grid item xs={ 3 } >
            <ProjectList cookies={ cookies } />
          </Grid>
          <Grid item xs={ showProjectList ? 9:12 } hidden={ !currentProject }> 
            <ProjectPanel 
              cookies={ cookies }
              currentProject={ currentProject }
              projects={ profile.projects }
            />
          </Grid>
        </Grid>
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
    profile: state.user.profile,
    showProjectList: state.user.showProjectList,
    currentProject: state.user.currentProject,
    currentProjectTab: state.user.currentProjectTab,
    previousProjectTab: state.user.previousProjectTab
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProfile: () => {
      dispatch(userActionCreator.getProfile(ownProps.cookies))
    },
    setCurrentProjectTab: (index) => {
      dispatch(userActionCreator.setCurrentProjectTab(index))
    },
    submitLogout: (credentials) => {
        dispatch(loginActionCreator.submitLogout(ownProps.cookies))
    },
    onChange: (event) => {
      dispatch(loginActionCreator.onChange(event))
    },
    checkAuth: () => {
      dispatch(loginActionCreator.checkAuth(ownProps.cookies))
    },
    closeNewProjectModal: () => {
      dispatch(userActionCreator.closeNewProjectModal())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
