import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TableCell from '@material-ui/core/TableCell'

import Rating from 'material-ui-rating'

export default (cell, format, propIndex, props) => {
  const { row, rowId, cellClick, cellChange } = props
  switch (format && format.type) {
    case 'link':
      return (
        <TableCell key={ propIndex } onClick={ cellClick }>
          <a href={ format.url } >
            { cell }
          </a>
        </TableCell>
      )
    case 'button':
      return (
        <TableCell key={ propIndex } onClick={ cellClick }>
          <Button
            primary
            label={ `${format.text}` }
          />
        </TableCell>
      )
    case 'date':
      return (
        <TableCell key={ propIndex } onClick={ cellClick }>
          { new Date().toISOString() }
        </TableCell>
      )
        
    case 'rating':
      return (
        <TableCell key={ propIndex } >
          <Rating label={ rowId } value={ row.Rating } disableHover={true} onChange={ (value)=>{ cellChange(rowId, value)} }/>
        </TableCell>
      )
    case 'percent':
      return (
        <TableCell key={ propIndex } >
          <Box style={{ width: '100%'}}>
            <Box style={{ width: vale + '%', backgroundColor: 'green' }}/>
          </Box>
        </TableCell>
      )
    default:
      return (
        <TableCell key={ propIndex } onClick={ (e) => { cellClick(e,rowId) }}>
          { cell }
        </TableCell>
      ) 
  }
};
