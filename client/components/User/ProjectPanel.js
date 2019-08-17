import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'

import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

import SmartTable from '../Common/SmartTable'
import StrainData from './StrainData'

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
    <Grid item xs={ collapse ? 9:12 }> {children} </Grid>
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
      // strainData,
      data,
      submitProject,
      currentProject,
      currentProjectTab,
      previousProjectTab,
      setCurrentProjectTab

    } = this.props
    const tableData = new StrainData(data)
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
            <Button color='primary' variant="contained" style={{width: '100%'}} onClick={ () => { submitProject(currentProject)} }> Submit </Button>
            <SmartTable
              isLoading={ tableData.isLoading }
              data={ tableData.cleanData.raw }
              headers={ tableData.smartTableHeaders }
              rowIds={tableData.cleanData.rowIds}
              limit={ 10 }
              total={ tableData.nCleanRows }
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
    // strainData: state.user.strainData,
    data: state.user.strainData,
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
