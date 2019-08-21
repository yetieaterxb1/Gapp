import React, { useState } from 'react'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'

import userActionCreator from '../../store/actions/user'

const PercentBox = ({ value }) => {
  value = value > 25 ? value : 50 - (Math.random() * 25)
  const [ isClicked, setIsClicked ] = useState(false)
  const handleBarClick = e => { setIsClicked(!isClicked); setTimeout(a => setIsClicked(false), 3000); }
  return (
      <Box style={{ width: '100%', height: '25px', }}>
        <Box onClick={ handleBarClick }style={{ height: '100%', width: value + '%', borderRadius: '4px', backgroundColor: '#6EE287' }}>
          { isClicked && value }
        </Box>
      </Box>
  )
}

const StrainBoxGroup = ({ strain, labels }) => {
  return(
    strain && labels ?
      Object.keys(strain).map((key, idx)=>{
        if(key === 'Name'){
          return <p key={ idx } />
        }else{
          return (
            <div key={ idx }>
              <Typography variant='caption'>  { labels[idx] } </Typography>
              <PercentBox label={ labels[idx] } value={ strain[key] } />
            </div>
          )
        }
      }) :
      null
  )
}

const StrainDataModal = props => {
  const { 
    strainData, currentStrain, showStrainDataModal,
    toggleStrainDataModal, closeStrainDataModal
  } = props
  const { isLoading, cleanData } = strainData
  const { rowIds, normalized, colNames } = cleanData
  const strain = !isLoading ? normalized[rowIds.findIndex(id => id === currentStrain)] : false
  return(
    <Dialog fullWidth={ true } maxWidth={ 'md' } open={ showStrainDataModal } onClose={ toggleStrainDataModal } >  
      <DialogTitle>
        <Typography> { strain && strain.Name } </Typography>
      </DialogTitle>
      <DialogContent dividers >
        <StrainBoxGroup strain={ strain } labels={ colNames }/>                
      </DialogContent>
      <DialogActions>
        <Button onClick={ closeStrainDataModal }> Close </Button>
      </DialogActions>   
    </Dialog>
  )
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
)(StrainDataModal)