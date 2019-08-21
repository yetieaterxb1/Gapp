import React, { Component } from 'react'
import { connect } from 'react-redux'

import { makeStyles, withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Slide from '@material-ui/core/Slide'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import CircularProgress from '@material-ui/core/CircularProgress'

import Grid from '@material-ui/core/Grid'

import userActionCreator from '../../store/actions/user'

const useStyles = makeStyles(theme => ({
  listAddButton: {
    item: {
      width: '100%'
    },
    button: {
      backgroundColor: 'blue',
      display: null,
      width: 12
    }
  },
  projectListItems: {
    
  },
  projectList:{
    list:{
      display: theme.showProjectList ? 'initial':'none'
    }
  }
}))

const ListAddButton = (props) => {
  const { key } = props
  return(
    <ListItem key={ key || 0 } >
      <Button {...props} style={{ margin:'auto', width: '60%'}} variant='contained' color="secondary" aria-label="Add"> <AddIcon /> </Button>
    </ListItem>
  )
}

const ProjectListItems = (props) => {
  const { projects, onOpen, onDelete, onAdd } = props
  if(!projects){
    return <ListAddButton onClick={ onAdd } />
  }
  return( 
    <>
      <ListAddButton onClick={ onAdd } />
      { 
        projects.map((proj) => {
          return(
            <ListItem key={ proj._id } onClick={ ()=>( onOpen(proj._id) ) }>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <Slide in={!!proj.name} direction={ 'right' } mountOnEnter unmountOnExit>
                <ListItemText primary={ proj.name } secondary={ (new Date(proj.updated)).toLocaleDateString() } />
              </Slide>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={ ()=>{ onDelete(proj._id) } }>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })
      }
    </>
  )
}

const ProjectList = (props) => {
    const { 
      isLoading,
      profile,
      showProjectList,
      hideProjectList,
      toggleNewProjectModal,
      openProject,
      deleteProject
    } = props
    return(
      <List >
        <ProjectListItems projects = { profile.projects } onOpen={ openProject } onDelete={ deleteProject } onAdd={ (e) => { toggleNewProjectModal() } }/>
        <ListItem key={ 0 } style={{ justifyContent: 'center' }}>
          <CircularProgress style={ {display: isLoading ? 'initial':'none'} }/>
        </ListItem>
      </List>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.user.profile,
    showProjectList: state.user.showProjectList,
    isLoading: state.user.projectListIsLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openProject: (id) => {
      dispatch(userActionCreator.openProject(id))
    },
    hideProjectList: () => {
      dispatch(userActionCreator.hideProjectList())
    },
    toggleNewProjectModal: () => {
      dispatch(userActionCreator.toggleNewProjectModal())
    },
    deleteProject: (id) => {
      dispatch(userActionCreator.deleteProject(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ProjectList )
