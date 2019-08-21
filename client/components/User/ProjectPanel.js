import React from 'react'
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

const a11yProps = index => {
  return {
    id: `full-width-tab-${ index }`,
    'aria-controls': `full-width-tabpanel-${ index }`,
  }
}

const swipeDir = (curIdx, preIdx) =>{
  return curIdx - preIdx > 0 ? 'rtl' : 'ltr'
}

const swipeAxis = (curIdx, preIdx) => {
  const isRtl = swipeDir(curIdx, preIdx) === 'rtl'
  return isRtl ? 'x-reverse' : 'x'
}

const TabPanel = ({ children, collapse }) => {
  return (
    <Grid item xs={ collapse ? 9:12 }> { children } </Grid>
  )
}

const DistResult = ({ data, title }) => {
  return (
    <Box>
      <h2> { title } </h2>
      { 
        Object.keys(data).map((uid, uidx) => {
          return(
            <div key={uidx}> 
              { 
                Object.keys(data[uid]).map((rid, ridx) => {
                  return (
                    <div key={ridx}>
                      <h4> { rid } </h4>
                      <p> { data[uid][rid] } </p>
                    </div>
                  )
                }) 
              }
            </div>
          )
        })
      }
    </Box>
  )
}

const KmrResult = ({ data, title }) => {
  return (
    <Box>
      <h2> { title } </h2>
      {
        data.map((rid) => {
          return <h3 key={rid}> { rid } </h3>
        })
      }
    </Box>
  )
}

const RenderResult = ({ name, data, titles, children }) => {
  const title = titles[name]
  const result = {
    'dist': (d, t) => <DistResult data={ d } title={ t } /> ,
    'kmr': (d, t) => <KmrResult data={ d }  title={ t }/>
  }[name](data, title)
  return data ? result : children
}

const ResultsBody = props => {
  const { results, titles, children } = props
  return (
    <Box>
      { results && results.map((model, midx) => {
          return Object.keys(model).map((name, nidx)=>{
            return (
              <RenderResult name={ name } data={ model[name] } titles={ titles }> 
                { children || <p> No results to display </p> }
              </RenderResult>
            )
          })
        }) 
      }
    </Box>
  )
}

const ProjectPanel = props => {    
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
  } = props
  const { cleanData, smartTableRatingsHeaders } = strainData
  const { rowIds } = cleanData
  const projects = profile.projects
  const currentIdx = projects ? projects.findIndex(item => item._id === currentProject ) : []
  const project = projects ? projects[currentIdx] : false
  const data = project ? project.ratings : []
  const results = project ? project.results : false
  const handleTabChange = (e,i) => { setCurrentProjectTab(i) }
  const handleSubmit = e => { submitProject(currentProject) }
  const handleCellChange = (id, val)=>{ setRating(currentProject, id, val) }
  const handleCellClick = (e, rowId)=>{ toggleStrainDataModal(rowId) }
  return(
    project &&
      <Slide in={ !!project } direction={ 'up' } mountOnEnter unmountOnExit>
        <Box>
          <Tabs value={ currentProjectTab } onChange={ handleTabChange } indicatorColor='primary' textColor='primary' variant='fullWidth' >
            <Tab label='Strains' { ...a11yProps(0) } />
            <Tab label='Results' { ...a11yProps(1) } />
          </Tabs>
          <SwipeableViews
            axis={ swipeAxis(currentProjectTab, previousProjectTab) }
            index={ currentProjectTab }
            onChangeIndex={ setCurrentProjectTab }
          >
            <TabPanel index={ 0 } value={ currentProjectTab }>
              <Button color='primary' variant="contained" style={{width: '100%'}} onClick={ handleSubmit }> Submit </Button>
              <SmartTable
                isLoading={ !data || !rowIds || !smartTableRatingsHeaders }
                data={ data }
                headers={ smartTableRatingsHeaders }
                rowIds={ rowIds }
                limit={ 10 }
                total={ rowIds && rowIds.length }
                cellChange={ handleCellChange }
                cellClick={ handleCellClick }
              />
            </TabPanel>
            <TabPanel index={ 2 } value={ currentProjectTab }>
              { isLoading ? 
                  <CircularProgress /> : 
                  <ResultsBody results={ results } titles={{ dist: 'Dist', kmr: 'KMR' }}/>
              }
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Slide>
  )
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
