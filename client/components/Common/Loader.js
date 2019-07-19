import React, { Component } from 'react'

class cube extends Component{
  render(){
    return(
      <div className="container">
        <div className="cube">
          <div className="half1">
            <div className="side s1"></div>
            <div className="side s2"></div>
            <div className="side s5"></div>
          </div>
          <div className="half2">
            <div className="side s3"></div>
            <div className="side s4"></div>
            <div className="side s6"></div>
          </div>
        </div>
      </div>
    )
  }
}

class Whirlpool extends Component{
  render(){
    return(
      <div className="whirlpool">
        <div className="ring ring1"></div>
        <div className="ring ring2"></div>
        <div className="ring ring3"></div>
        <div className="ring ring4"></div>
        <div className="ring ring5"></div>
        <div className="ring ring6"></div>
        <div className="ring ring7"></div>
        <div className="ring ring8"></div>
        <div className="ring ring9"></div>
      </div>
    )
  }
}




export default class Loader extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div id='loader' style={{display: this.props.display ? 'initial' : 'none' }}>
        <Whirlpool/>
      </div>
    )
  }
}

