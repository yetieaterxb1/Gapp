import React, { Component } from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import WorkIcon from '@material-ui/icons/Work'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'

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
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
          </ListItem>
        </List>
      </Slide>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    showProjectList: state.user.showProjectList
  }
}

export default connect(
  mapStateToProps,
  null
)( ProjectList )
