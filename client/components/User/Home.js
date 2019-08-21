import React, { useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import withWidth from '@material-ui/core/withWidth'

import Appbar from './Appbar'
import Loader from '../Common/Loader'
import ProjectList from './ProjectList'
import ProjectPanel from './ProjectPanel'
import NewProjectModal from './NewProjectModal'
import StrainDataModal from './StrainDataModal'

import loginActionCreator from '../../store/actions/login.js'
import userActionCreator from '../../store/actions/user.js'

const widthQuery = (width, accept) => {
  accept = Array.isArray(accept) ? accept : [accept]
  return !!accept.includes(width)
}

const Home = props => {
  const {
    cookies, isAuthenticated, isLoading, profile, showProjectList, 
    currentProject, setCookieProvider, checkAuth, getProfile,
  } = props

  useEffect(()=>{
    checkAuth()
    setCookieProvider(cookies)
    getProfile()
  }, [cookies, isAuthenticated])

  return (
    !isAuthenticated ?
      <Redirect to='/login' /> :
      <Box maxWidth='100vw'>
        <Loader display={ isLoading } />
        <NewProjectModal cookies={ cookies }/>
        <StrainDataModal />
        <Appbar cookies={ cookies } />
        <Grid container direction='row' alignItems='flex-start' spacing={ 3 } size='small'>
          <Slide in={ showProjectList } direction='right' mountOnEnter unmountOnExit>
              <Grid item xs={12} sm={ 12 } md={ 3 } lg={ 3 } style={{ height: widthQuery(this.props.width, ['sm']) ? '100vh' : '40vh', width:'100%' }} >
                <ProjectList cookies={ cookies } />
              </Grid>
          </Slide>
          <Grid item xs={ 12 } hidden={ !currentProject }> 
            <ProjectPanel 
              cookies={ cookies }
              currentProject={ currentProject }
              projects={ profile.projects }
            />
          </Grid>
        </Grid>
      </Box>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    message: state.login.isAuthenticated,
    isLoading: state.login.isLoading,
    profile: state.user.profile,
    showProjectList: state.user.showProjectList,
    currentProject: state.user.currentProject,
    currentProjectTab: state.user.currentProjectTab
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCookieProvider: (provider) => {
      dispatch(loginActionCreator.setCookieProvider(provider))
    },
    getProfile: () => {
      dispatch(userActionCreator.getProfile())
    },
    submitLogout: () => {
      dispatch(loginActionCreator.submitLogout())
    },
    checkAuth: () => {
      dispatch(loginActionCreator.checkAuth())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( withWidth()(Home) )
