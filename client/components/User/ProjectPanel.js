import React, { Component } from 'react'
import { connect } from 'react-redux'

import SwipeableViews from 'react-swipeable-views'

import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

import SmartTable from '../Common/SmartTable'

import userActionCreator from '../../store/actions/user.js'

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

function swipeDir(curIdx, preIdx){
  return curIdx - preIdx > 0 ? 'rtl' : 'ltr'
}

const TabPanel = (props) => {
  const { children, value, index, collapse } = props
  return (
    <Grid item xs={ collapse ? 9:12 } hidden={value !== index} > {children} </Grid>
  )
}

class ProjectPanel extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.getAllStrains()
  }
  render() {
    const { 
      strainData,
      submitProject,
      currentProject,
      currentProjectTab,
      previousProjectTab,
      setCurrentProjectTab

    } = this.props
    const headers = strainData.colNames.map(function(cname){
      return {
        alias: cname,
        sortable: true,
        dataAlias: cname
      }
    })
    return(
      <>
        <Tabs
          value={ currentProjectTab }
          indicatorColor="primary"
          textColor="primary"
          variant='fullWidth'
          onChange={ (evt,idx) => { setCurrentProjectTab(idx) } }
        >
          <Tab label="Table" {...a11yProps(0)} />
          <Tab label="Results" {...a11yProps(1)} />
        </Tabs>
        
        <SwipeableViews
          axis={ swipeDir(currentProjectTab, previousProjectTab) === 'rtl' ? 'x-reverse' : 'x' }
          index={ currentProjectTab }
          onChangeIndex={ setCurrentProjectTab }
        >
          <TabPanel index={ 0 } value={ currentProjectTab }>
            <Button color='inherit' style={{width: '100%'}} onClick={ () => { submitProject(currentProject)} }> Submit </Button>
            <SmartTable
              isLoading={ false }
              data={ strainData.raw }
              headers={ headers }
              limit={ 40 }
              total={ strainData.raw.length }
            />
          </TabPanel>
          <TabPanel index={ 1 } value={ currentProjectTab }>
            Results
          </TabPanel>
        </SwipeableViews>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: ownProps.cookies,
    strainData: state.user.strainData,
    showProjectList: state.user.showProjectList,
    currentProject: state.user.currentProject,
    currentProjectTab: state.user.currentProjectTab,
    previousProjectTab: state.user.previousProjectTab
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllStrains: () => {
      dispatch(userActionCreator.getAllStrains(ownProps.cookies))
    },
    getStrainNameById: (id) => {
      dispatch(userActionCreator.getStrainNameById(id, ownProps.cookies))
    },
    setCurrentProjectTab: (index) => {
      dispatch(userActionCreator.setCurrentProjectTab(index))
    },
    submitProject: (id) => {
      dispatch(userActionCreator.submitProject(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPanel)
