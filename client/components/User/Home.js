import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'


import Appbar from './Appbar'
import Loader from '../Common/Loader'
import ProjectList from './ProjectList'
import ProjectPanel from './ProjectPanel'
import NewProjectModal from './NewProjectModal'


import loginActionCreator from '../../store/actions/login.js'
import userActionCreator from '../../store/actions/user.js'


const useStyles = makeStyles(theme => ({
  projectPanel:{

  },
  projectList:{
    list:{
      display: theme.showProjectList ? 'initial':'none',
      [theme.breakpoints.down('sm')]: {
        width: '95%',
      },
      [theme.breakpoints.up('md')]: {
        width: '95%',
      }
    }
  }
}))

const widthQuery = (width, accept) => {
  accept = Array.isArray(accept) ? accept : [accept]
  return !!accept.includes(width)
}

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
        <NewProjectModal cookies={ cookies }/>
        <Appbar cookies={ cookies } />
        <Grid container direction='row' alignItems='flex-start' spacing={ 3 } >
          <Slide in={ showProjectList } direction='right' mountOnEnter unmountOnExit>
              <Grid item xs={12} sm={ 12 } md={ 3 } lg={ 3 } style={{ height: widthQuery(this.props.width, ['xs']) ? '100vh' : '40vh' }} >
                <ProjectList cookies={ cookies } />
              </Grid>
          </Slide>
          <Grid item sm={ 12 } hidden={ !currentProject }> 
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
)( withWidth()(Home) )
