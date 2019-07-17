import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button'

class Splash extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <h1> Splash/landing page </h1>
        <Link to="/login">
          <Button variant="contained" to="/login">
            Login
          </Button>
        </Link>
      </div>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     credentials: state.login.credentials,
//     open: state.login.open,
//     isAuthenticated: state.login.isAuthenticated,
//     message: state.login.isAuthenticated,
//     isLoading: state.login.isLoading
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     submitLogin: (credentials) => {
//         dispatch(loginActionCreator.submitLogin(credentials))
//     },
//     onChange: (event) => {
//       dispatch(loginActionCreator.onChange(event))
//     }
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Splash)

export default Splash