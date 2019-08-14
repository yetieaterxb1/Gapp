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
    this.isRowSelected = this.isRowSelected.bind(this)
  }
  isRowSelected(row, profile, currentProject) {
    const id = row._id
    const currentIdx = profile.projects.map((project) => {
      return project._id === currentProject
    }).findIndex(item => !!item)
    return !!profile.projects[currentIdx].likedIds.find( (item) => { return item === id } )
  }
  render(){
    const { row, headers, currentProject, profile, addIdToProject } = this.props
    return(
      <TableRow 
        // style={ {backgroundColor: this.isRowSelected(row, profile, currentProject) ? 'green':'none'} }
        onClick={ 
          (e) => {
            console.log('CurrentProject: ', currentProject)
            console.log('CurrentRow: ', row._id)
            console.log(this.isRowSelected(row, profile, currentProject))
            addIdToProject(row._id)
          } 
        }
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
    // open: state.login.open,
    // jwt: state.login.jwt,
    // username: state.login.username,
    // isAuthenticated: state.login.isAuthenticated,
    // message: state.login.isAuthenticated,
    // isLoading: state.login.isLoading,
    // cookies: ownProps.cookies,
    // showProjectList: state.user.showProjectList,
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
