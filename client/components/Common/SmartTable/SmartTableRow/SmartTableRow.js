import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TableRow from '@material-ui/core/TableRow'

import formatTableCell from './formatTableCell'

import userActionCreator from '../../../../store/actions/user.js'

class SmartTableRow extends Component {
  constructor(props){
    super(props)
  }

  isRowSelected(rowId, profile, currentProject) {
    let isSelected = false
    if(rowId && profile && currentProject){
      const currentIdx = profile.projects.map((project) => {
        return project._id === currentProject
      }).findIndex(item => !!item)
      isSelected = !!profile.projects[currentIdx].likedIds.find( (item) => { return item === rowId } )
    }else{
      isSelected = false
    }
    console.log('isSelected???', isSelected)
    return isSelected
  }



  render(){
    const { row, rowId, headers, currentProject, profile } = this.props
    const highlightRow = row.Rating > 3 ? 'rgba(110, 226, 135, 0.37)':'transparent'
    return(
      <TableRow 
        style={ { border: '3px solid ' + highlightRow } }
      >
        { 
          headers.map((header, propIndex) => (
            formatTableCell(row[header.dataAlias], header.format, propIndex, this.props ) 
          )) 
        }
      </TableRow>
    )
  }
}

SmartTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  headers: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.user.profile,
    currentProject: state.user.currentProject
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addIdToProject: function(id){
      dispatch(userActionCreator.addIdToProject(id))
    },
    removeIdFromProject: function(id){
      dispatch(userActionCreator.removeIdFromProject(id))
    }
  }
}

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(SmartTableRow)
