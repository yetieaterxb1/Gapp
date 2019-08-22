import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'

import loginActionCreator from '../../store/actions/login.js'
import userActionCreator from '../../store/actions/user.js'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  addFab: {
    position: 'absolute',
    marginTop: '4vh',
    marginLeft: 60,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logoutButton: {
    float: 'right'
  }
})



function ButtonAppBar(props) {
  const { 
    classes,
    submitLogout, 
    toggleNewProjectModal, 
    toggleProjectList,
    displayProjectList
  } = props
  return (
    <div className={ classes.root }>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={ classes.menuButton } onClick={ toggleProjectList } color="inherit">
            <MenuIcon />
          </IconButton>
          <Fab className={ classes.addFab } style={{ display: displayProjectList ? 'none' : null }} onClick={ toggleNewProjectModal } color="secondary">
            <AddIcon />
          </Fab>
          <Typography variant='h6' color='inherit' className={ classes.grow }>  </Typography>
          <Button color='inherit' onClick={ submitLogout }> Logout </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    displayProjectList: state.user.showProjectList
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitLogout: () => {      
      dispatch(loginActionCreator.submitLogout())
    },
    submitProject: (id) => {
      dispatch(userActionCreator.submitProject(id))
    },
    toggleNewProjectModal: () => {
      dispatch(userActionCreator.toggleNewProjectModal())
    },
    toggleProjectList: () => {
      dispatch(userActionCreator.toggleProjectList())
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)( withStyles(styles)(ButtonAppBar) )

