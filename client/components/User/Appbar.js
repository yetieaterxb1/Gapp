import React from 'react'
import PropTypes from 'prop-types'
import { withCookies } from 'react-cookie';

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { connect } from 'react-redux'

import loginActionCreator from '../../store/actions/login.js'
import userActionCreator from '../../store/actions/user.js'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  addFab: {
    position: 'absolute',
    marginTop: '3.5%',
    marginLeft: 50,

  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

function ButtonAppBar(props) {
  const { 
    classes,
    username,
    submitProject, 
    submitLogout, 
    toggleNewProjectModal, 
    toggleProjectList
  } = props
  return (
    <div className={ classes.root }>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={ classes.menuButton } onClick={ toggleProjectList } color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Fab className={ classes.addFab } onClick={ toggleNewProjectModal } color="secondary" aria-label="Add">
            <AddIcon />
          </Fab>
          <Typography variant="h6" color="inherit" className={ classes.grow }> { username } </Typography>
          <Button color='inherit' onClick={ submitLogout }> Logout </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: ownProps.cookies,
    username: state.login.username
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitLogout: () => {      
      const cookies = ownProps.cookies
      dispatch(loginActionCreator.submitLogout(cookies))
    },
    submitProject: (id) => {
      dispatch(userActionCreator.submitProject(id))
    },
    toggleNewProjectModal: () => {
      dispatch(userActionCreator.toggleNewProjectModal())
    },
    toggleProjectList: () => {
      dispatch(userActionCreator.toggleProjectList())
    },
    showProjectList: () => {     
      dispatch(userActionCreator.showProjectList())
    },
    hideProjectList: () => {
      dispatch(userAtionCreator.hideProjectList())
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)( withStyles(styles)(ButtonAppBar) )

