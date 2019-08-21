import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TableRow from '@material-ui/core/TableRow'

import formatTableCell from './formatTableCell'


const isRowSelected = (rowId, projects, currentProject) => {
  let isSelected = false
  if(rowId && projects && currentProject){
    const currentIdx = projects.findIndex(proj => proj._id === currentProject)
    isSelected = !!projects[currentIdx].likedIds.find(item => item === rowId)
  }
  return isSelected
}

const SmartTableRow = props => {
  const { row, headers } = this.props
  const highlightRow = row.Rating > 3 ? 'rgba(110, 226, 135, 0.37)' : 'transparent'
  return(
    <TableRow style={ { border: '3px solid ' + highlightRow } }>
      { 
        headers.map((header, propIndex) => (
          formatTableCell(row[header.dataAlias], header.format, propIndex, this.props ) 
        )) 
      }
    </TableRow>
  )
}

SmartTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  headers: PropTypes.array.isRequired
}

export default SmartTableRow