import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputIcon from '@material-ui/icons/Input'

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

class NewProjectModal extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes } = this.props
    return (
      <Modal open={this.props.showNewProjectModal} onClose={this.props.toggleNewProjectModal} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
          <Card onKeyPress={ this.handleEnter } className={classes.modal} >
            <CardContent >
              <InputIcon className={classes.icon}/>
              <TextField id='projectname' label='New Project Name'  />
            </CardContent>
            <CardActions>
              <Button onClick={ this.props.createNewProject } variant='contained' size="small"> Create </Button>
            </CardActions>
          </Card>
      </Modal>
    )
  }
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
    createNewProject: () => {
      dispatch(userActionCreator.createNewProject())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewProjectModal))