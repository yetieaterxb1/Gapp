import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'

import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Slide from '@material-ui/core/Slide'
import Box from '@material-ui/core/Box'

import SmartTable from '../Common/SmartTable'

import userActionCreator from '../../store/actions/user.js'
import { pathToFileURL } from 'url';


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
    this.state = { rating: false }
    this.props.getAllStrains()
  }
  render() {
    const { 
      strainData,
      submitProject,
      profile,
      setRating,
      currentProject,
      currentProjectTab,
      previousProjectTab,
      setCurrentProjectTab,
      toggleStrainDataModal
    } = this.props
    const { isLoading, cleanData, smartTableRatingsHeaders, nCleanRows } = strainData
    const { rowIds } = cleanData
    const projects = profile.projects
    const currentIdx = projects ? projects.findIndex(item => item._id === currentProject ) : []
    const project = projects ? projects[currentIdx] : false
    const data = project ? project.ratings : []
    const results = project ? project.results : false
    return(
      !project ? null :
      <Slide in={!!project} direction={ 'up' } mountOnEnter unmountOnExit>
        <Box>
          <Tabs
            value={ currentProjectTab }
            indicatorColor="primary"
            textColor="primary"
            variant='fullWidth'
            onChange={ (evt,idx) => { setCurrentProjectTab(idx) } }
          >
            <Tab label="Strains" {...a11yProps(0)} />
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
                isLoading={ isLoading }
                data={ data }
                headers={ smartTableRatingsHeaders }
                rowIds={ rowIds }
                limit={ 10 }
                total={ rowIds && rowIds.length }
                cellChange={
                  (id, val)=>{
                    setRating(currentProject, id, val)
                    this.setState({ rating: !this.state.rating })
                  }
                }
                cellClick={ 
                  (e, rowId)=>{
                    toggleStrainDataModal(rowId)
                  }
                }
              />
            </TabPanel>
            <TabPanel index={ 2 } value={ currentProjectTab }>
              <div style={ {display: !results ? 'initial':'none', width:'200px', padding: '48px', marginLeft: '110px', justifyContent: 'center'} }>
                <CircularProgress />
              </div>
              { results && results.map((model, midx) => {
                  let modelName
                  const modelResult = Object.keys(model).map((name, nidx)=>{
                    modelName = name
                    let modelResult
                    if(name === 'dist'){
                      modelResult = Object.keys(model[name]).map((uid, uidx) => {
                        return(
                          <div key={uidx}> 
                            { 
                              Object.keys(model[name][uid]).map((rid, ridx) => {
                                return (
                                  <div key={ridx}>
                                    <h4> { rid } </h4>
                                    <p> { model[name][uid][rid] } </p>
                                  </div>
                                )
                              }) 
                            }
                          </div>
                        )
                      })
                    }
                    if(name === 'kmr'){
                      modelResult = model[name].map((rid) => {
                        return <h3 key={rid}> { rid } </h3>
                      })
                    }
                    return(
                      <div key={nidx}>
                        { modelResult }
                      </div>
                    )
                  })
                  return(
                    <div key={midx}>
                      <h2> { modelName } </h2>
                      <div> { modelResult } </div>
                    </div>
                  )
                }) 
              }
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Slide>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: ownProps.cookies,
    profile: state.user.profile,
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
    },
    setRating: (proj, id, value) => {
      dispatch(userActionCreator.setRating(proj, id, value))
    },
    toggleStrainDataModal: (id) => {
      dispatch(userActionCreator.toggleStrainDataModal(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPanel)
