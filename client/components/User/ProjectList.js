import React, { Component } from 'react'
import { connect } from 'react-redux'

import Slide from '@material-ui/core/Slide'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'


class ProjectList extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Slide in={ this.props.showProjectList } direction='right' mountOnEnter unmountOnExit>
        <List style={ {display: this.props.showProjectList? 'initial':'none'} }>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
        </List>
      </Slide>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    projectList: null,
    showProjectList: state.user.showProjectList
  }
}

const mapDispatchToProps = (state, ownProps) => {
  selectProject: () => {
    dispatch(userActionCreator.selectProject())
  }
}

export default connect(
  mapStateToProps,
  null
)( ProjectList )
