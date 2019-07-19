import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'


export default function ProjectPanel() {
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
        <p> Continer </p>
      </Container>
    </React.Fragment>
  )
}