import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { connect } from 'react-redux'

import loginActionCreator from '../../store/actions/login.js'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};



function ButtonAppBar(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Username
          </Typography>
          <Button color="inherit" onClick={props.submitLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


// const mapStateToProps = (state, ownProps) => {
//   return {
//     classes: ownProps.classes,
//     credentials: state.login.credentials,
//     open: state.login.open,
//     isAuthenticated: state.login.isAuthenticated,
//     message: state.login.isAuthenticated,
//     isLoading: state.login.isLoading
//   }
// }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitLogout: (credentials) => {      
      dispatch(loginActionCreator.submitLogout())
      // loginActionCreator.submitLogout()
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)( withStyles(styles)(ButtonAppBar) )

// export default withStyles(styles)(ButtonAppBar)
