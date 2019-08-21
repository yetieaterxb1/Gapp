const config = require('../../../config/config.js')

const SET_COOKIEPROVIDER = 'SET_COOKIEPROVIDER'
const SUBMIT_LOGIN = 'SUBMIT_LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'LOGOUT_FAIL'
const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP'
const ON_CHANGE = 'ON_CHANGE'
const IS_AUTHED = 'IS_AUTHED'
const STOP_LOADING = 'STOP_LOADING'

const loginActionCreator = {
  setCookieProvider: (provider) => {
    return (dispatch, getState) => {
      dispatch({ type:SET_COOKIEPROVIDER, provider: provider })
    }
  },
  onChange: (e) => {
    return (dispatch, getState) => {
      dispatch({ type: ON_CHANGE, event: e })
    }
  },
  stopLoading: () => {
    return (dispatch) => {
      dispatch({ type: STOP_LOADING })
    }
  },
  submitLogin : () => {
    return (dispatch, getState) => {
      const { cookies } = getState().login
      if(username.value && password.value){
        dispatch({ type: SUBMIT_LOGIN })
        fetch(config.api.path.root + '/login', {
          method: 'POST',
          body: JSON.stringify({
            username: username.value,
            password: password.value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          if (res.status === 401){
            return { message: 'Invalid username / password.' }
          }else{
            return res.json()
          }
        })
        .then((data) => {
          const { jwt, isAuthenticated, message } = data
          const isAuthed = isAuthenticated && jwt.success
          if(isAuthed){
            cookies.set('jwt', jwt.token, { path: '/' })
            setTimeout(function(){
              dispatch({
                type: LOGIN_SUCCESS,
                isAuthenticated: isAuthed,
                username: data.username,
                message: message
              })
            }, 1000)
          }else{
            dispatch({
              type: LOGIN_FAIL,
              message: message
            })
          }
        })
      }        
    }
  },
  submitLogout: function(){
    return function(dispatch, getState){
      const { cookies } = getState().login
      cookies.remove('jwt')
      dispatch({ type: SUBMIT_LOGOUT })
      fetch(config.api.path.root + '/logout')
      .then((res) => {
        if (res.status === 401){
          return dispatch({type: LOGOUT_FAIL, message: 'Unable to logout'})
        }else{
          return dispatch({type: LOGOUT_SUCCESS, message: 'Logout successful.'}) 
        }
      })
    }
  },
  submitSignup: function(cookies){
    return function(dispatch, getState){
      if(username.value && password.value && email.value){
        dispatch({ type: SUBMIT_SIGNUP })
        fetch(config.api.path.root + '/signup', {
          method: 'POST',
          body: JSON.stringify({
            email: email.value,
            username: username.value,
            password: password.value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then((data) => {
          const { jwt, isAuthenticated, message } = data
          if(isAuthenticated){
            cookies.set('jwt', jwt.token, { path: '/' }) 
            setTimeout(function(){
              dispatch({
                type: LOGIN_SUCCESS,
                jwt: jwt, 
                username: data.username,
                message: message
              })
            }, 1000)
          }else{
            dispatch({
              type: LOGIN_FAIL,
              message: message
            })
          }
        })
      }
    }
  },
  checkAuth: (cookies) => {
    return (dispatch, getState) => {
      const JWToken = cookies.get('jwt', { path: '/' })
      if(JWToken){
        fetch(config.api.path.root + '/user', {
          method: 'GET',
          headers: {
            'authorization': JWToken,
          }
        })
        .then((res) => {
          if(res.ok){
            dispatch({ type: IS_AUTHED, isAuthenticated: true })
          }else{
            dispatch({ type: IS_AUTHED, isAuthenticated: false })
          }
        })
      }else{
        dispatch({ type: IS_AUTHED, isAuthenticated: false })
      }
    }
  }
}
export default loginActionCreator