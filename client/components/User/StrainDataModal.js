import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputIcon from '@material-ui/icons/Input'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'

import SmartTable from '../Common/SmartTable'

import userActionCreator from '../../store/actions/user'

const styles = {
  modal: {
    maxWidth: '95vw',
    maxHeight: '95vh',
    marginTop: '2.5vh',
    margin: 'auto',
  },
  icon: {
    float: 'right'
  }
}

const PercentBox = ({ value }) => {
  value = value > 25 ? value : 50 - (Math.random() * 25)
  return (
    <Box style={{ width: '100%', height: '25px', }}>
      <Box style={{ height: '100%', width: value + '%', borderRadius: '4px', backgroundColor: '#6EE287' }} />
    </Box>
  )
}

const StrainBoxGroup = ({ strain, labels }) => {
  return(
    Object.keys(strain).map((key, idx)=>{
      if(key === 'Name'){
        return <p key={'hi'} />
      }else{
        return (
          <div key={ 'fuckyou' + idx}>
            <Typography key={ idx } variant='caption'>  { labels[idx] } </Typography>
            <PercentBox key={ key } label={ labels[idx] } value={ strain[key] } />
          </div>
        )
      }
    })
  )
}

class StrainDataModal extends Component {
  constructor(props) {
    super(props)
    this.handleEnter = this.handleEnter.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleEnter(e){
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }
  handleSubmit(){
    this.props.createNewProject()
  }
  render() {
    const { 
      classes,
      showStrainDataModal,
      toggleStrainDataModal,
      closeStrainDataModal,
      strainData,
      currentStrain,
    } = this.props
    const { isLoading, cleanData, smartTableHeaders } = strainData
    const { rowIds, normalized, colNames } = cleanData
    const strain = !isLoading ? normalized[rowIds.findIndex(id => id === currentStrain)] : false
    return (
        <Dialog  fullWidth={true} maxWidth={'xl'}  open={ showStrainDataModal } onClose={ toggleStrainDataModal } >  
          <DialogTitle  >
            <Typography>
              { strain && strain.Name }
            </Typography>
          </DialogTitle>
          <DialogContent dividers >
                  
                  {
                    strain &&
                    <StrainBoxGroup strain={ strain } labels={ colNames }/>                
                  }

          </DialogContent>
          <DialogActions>
            <Button onClick={ closeStrainDataModal }>Close</Button>
          </DialogActions>   
        </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    showStrainDataModal: state.user.showStrainDataModal,
    strainData: state.user.strainData,
    currentStrain: state.user.currentStrain
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleStrainDataModal: () => {
      dispatch(userActionCreator.toggleStrainDataModal())
    },
    closeStrainDataModal: () => {
      dispatch(userActionCreator.toggleStrainDataModal())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StrainDataModal))