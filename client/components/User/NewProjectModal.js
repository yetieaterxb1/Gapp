import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputIcon from '@material-ui/icons/Input'
import Slide from '@material-ui/core/Slide'

import userActionCreator from '../../store/actions/user'

const styles = {
  modal: {
    maxWidth: 345,
    marginTop: 200,
    margin: 'auto',
  },
  icon: {
    float: 'right'
  }
}

const NewProjectModal = props => {
  const { 
    classes,
    showNewProjectModal,
    toggleNewProjectModal,
    createNewProject
  } = props

  const handleSubmit = e => {
    createNewProject()
    toggleNewProjectModal()
  }

  const handleEnter = e => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  
  return (
    <Slide in={ showNewProjectModal } direction={ 'down' } mountOnEnter unmountOnExit>
      <Box>
      <Modal open={ true } onClose={ toggleNewProjectModal } >
        <Card onKeyPress={ handleEnter } className={ classes.modal } >
          <CardContent >
            <InputIcon className={ classes.icon }/>
            <TextField id='projectname' label='New Project Name' />
          </CardContent>
          <CardActions>
            <Button onClick={ handleSubmit } variant='contained' size='small'> Create </Button>
          </CardActions>
        </Card>
      </Modal>
      </Box>
    </Slide>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    showNewProjectModal: state.user.showNewProjectModal
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleNewProjectModal: () => {
      dispatch(userActionCreator.toggleNewProjectModal())
    },
    createNewProject: (name) => {
      dispatch(userActionCreator.createNewProject(name))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewProjectModal))