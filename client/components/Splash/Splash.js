import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button'

class Splash extends Component {
  render() {
    return (
      <div>
        <h1> Splash/landing page HOOOOOOOOOT </h1>
        <Link to="/login">
          <Button variant="contained" to="/login">
            Link
          </Button>
        </Link>
      </div>
    )
  }
}

export default Splash