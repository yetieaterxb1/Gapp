import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'

import SwapVert from '@material-ui/icons/SwapVert'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'

import SmartTableRow from '../SmartTableRow/SmartTableRow'
import TableSpinner from '../TableSpinner/TableSpinner'
import styles from './SmartTable.css'
import sortFunc from './sortFunc'


class SmartTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAsc: true,
      sortHeader: null,
      offset: 0,
      limit: props.limit,
      data: props.data,
      page: props.data.slice(0, props.limit)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sortHeader: null,
      offset: 0,
      data: nextProps.data,
      page: nextProps.data.slice(this.state.offset, nextProps.limit)
    })
  }

  sortByColumn = (e) => {
    const sortHeader = e.target.id
    const {
      data,
      limit
    } = this.state

    const isAsc = this.state.sortHeader === sortHeader ? !this.state.isAsc : true
    const sortedData = data.sort((a, b) => sortFunc(a, b, sortHeader))

    if (!isAsc) {
      sortedData.reverse()
    }

    this.setState({
      page: sortedData.slice(0, limit),
      data: sortedData,
      sortHeader,
      offset: 0,
      isAsc
    })
  }

  paginate = (offset, limit) => {
    const { data } = this.state
    this.setState({
      page: data.slice(offset, offset + limit),
      offset,
    })
  }

  paginateBack = () => {
    const { offset, limit } = this.state
    this.paginate(offset - limit, limit)
  }

  paginateForward = () => {
    const { offset, limit } = this.state
    this.paginate(offset + limit, limit)
  }

  render() {

    const {
      total,
      headers,
      isLoading,
      rowIds,
      cellClick,
      cellChange
    } = this.props

    const {
      offset,
      limit,
      page
    } = this.state

    return (
      <Table
        className={ styles.table }
        selectable='false'
      >
        <TableHead
          displayselectall='false'
          adjustforcheckbox='false'
        >
          <TableRow>
            { headers && headers.map((header, index) => (
              <TableCell key={ index }>
                <div className={ styles.headerColumn }>
                  { header.alias }
                  { header.sortable &&
                    <SwapVert
                      id={ header.dataAlias }
                      className={ styles.sortIcon }
                      onMouseUp={ this.sortByColumn }
                    />
                  }
                </div>
              </TableCell>
            )) }
          </TableRow>
        </TableHead>
        <TableBody>
          { isLoading && <TableSpinner /> }
          { !isLoading &&
            page.map((row, index) => (
              <SmartTableRow
                key={ index }
                row={ row }
                headers={ headers }
                rowId={ rowIds[index] }
                cellClick={ cellClick }
                cellChange={ cellChange }
              />
            ))
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <div className={ styles.footerControls }>
                { `${Math.min((offset + 1), total)} - ${Math.min((offset + limit), total)} of ${total}` }
                <IconButton
                  disabled={ offset === 0 }
                  onClick={ this.paginateBack }
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  disabled={ offset + limit >= total }
                  onClick={ this.paginateForward }
                >
                  <ChevronRight />
                </IconButton>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}

SmartTable.defaultProps = {
  limit: 40,
  data: [],
  headers: [],
  isLoading: false
}

SmartTable.propTypes = {
  headers: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.bool.isRequired
  ]),
  data: PropTypes.array,
  offset: PropTypes.number, // current offset
  total: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool.isRequired
  ]), // total number of rows
  limit: PropTypes.number, // num of rows in each page,
  isLoading: PropTypes.bool,
}

export default SmartTable



