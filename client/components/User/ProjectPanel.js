import React, { Component } from 'react'
import { connect } from 'react-redux'

import SmartTable from '../Common/SmartTable'

import userActionCreator from '../../store/actions/user.js'

class ProjectPanel extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.getAllStrains()
  }
  render() {
    const { strainData } = this.props
    const headers = strainData.colNames.map(function(cname){
      return {
        alias: cname,
        sortable: true,
        dataAlias: cname
      }
    })
    return(
      <SmartTable
        isLoading={ false }
        data={ strainData.raw }
        headers={ headers }
        limit={ 40 }
        total={ strainData.raw.length }
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: ownProps.cookies,
    strainData: state.user.strainData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllStrains: () => {
      dispatch(userActionCreator.getAllStrains(ownProps.cookies))
    },
    getStrainNameById: (id) => {
      dispatch(userActionCreator.getStrainNameById(id, ownProps.cookies))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPanel)
