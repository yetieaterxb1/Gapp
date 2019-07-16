import React, { Component } from 'react'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: 'admin',
      password: 'password'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  handleSubmit(e){
    console.log('Submitted...')
    fetch('http://localhost:8000/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: e.target.username,
        password: e.target.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => data.json())
    .then(res => console.log(res.message))
  }
  onChange(e){
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  render() {
    return (
      <div>
        <h1> Login </h1>
        <input id='username' value={this.state.username} onChange={this.onChange}></input>
        <input id='password' value={this.state.password} onChange={this.onChange}></input>
        <button onClick={this.handleSubmit}></button>
      </div>
    )
  }
}

export default Login