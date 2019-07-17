import React, { Component } from 'react'
import Appbar from '../Common/Appbar'

class Home extends Component {
  render() {
    // console.log(this.props)
    // console.log(this.state)
    return (
      <div>
        <Appbar/>
        <h1> Home </h1>
      </div>
    )
  }
}

export default Home