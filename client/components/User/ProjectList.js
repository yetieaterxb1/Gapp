import React, { Component } from 'react'
import { connect } from 'react-redux'

import Slide from '@material-ui/core/Slide'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import CircularProgress from '@material-ui/core/CircularProgress'

import userActionCreator from '../../store/actions/user'

class ProjectList extends Component {
  constructor(props){
    super(props)
    this.generateProjectListItems = this.generateProjectListItems.bind(this)
  }
  generateProjectListItems(projects, openClickHandler, deleteClickHandler) {
    projects = projects || []
    return projects.map(function(proj){
      return(
        <ListItem key={ proj._id } onClick={ () => ( openClickHandler(proj._id) ) }>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ proj.name } secondary={ proj.updated } />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={ () => ( deleteClickHandler(proj._id) ) }>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    })
  }
  render() {
    const { 
      isLoading,
      profile,
      showProjectList,
      openProject,
      deleteProject
    } = this.props
    return (
      <>
        <Slide in={ showProjectList } direction='right' mountOnEnter unmountOnExit>
          <List style={{ display: showProjectList ? 'initial':'none' }}>
          <CircularProgress style={ {display: this.props.isLoading ? 'initial':'none'} } size={ 1 } />
            {
              this.generateProjectListItems(
                profile.projects, 
                openProject, 
                deleteProject
              )
            }
          </List>
        </Slide>
      </>
    )
  }
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
    deletProject: (id) => {
      dispatch(userActionCreator.deleteProject(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ProjectList )
