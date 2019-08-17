import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import formatTableCell from './formatTableCell'

import userActionCreator from '../../../../store/actions/user.js'

class SmartTableRow extends Component {
  constructor(props){
    super(props)
    this.handleRowClick = this.handleRowClick.bind(this)
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
    return isSelected
  }

  handleRowClick(){
    const { rowId, profile, currentProject, addIdToProject, removeIdFromProject } = this.props
    if(this.isRowSelected(rowId, profile, currentProject)){
      removeIdFromProject(rowId)
    }else{
      addIdToProject(rowId)
    }
  }

  render(){
    const { row, rowId, headers, currentProject, profile, checkbox } = this.props
    const highlightRow = this.isRowSelected(rowId, profile, currentProject) ? 'tomato':'transparent'
    return(
      <TableRow 
        style={ {backgroundColor: highlightRow } }
        onClick={ (e) => { this.handleRowClick(rowId) } }
      >
        { headers.map((header, propIndex) => (
          <TableCell key={ propIndex } >
            { formatTableCell(row[header.dataAlias], header.format) }
          </TableCell>
        )) }
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
