const SUBMIT_LOGIN = 'SUBMIT_LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'LOGOUT_FAIL'
const ON_CHANGE = 'ON_CHANGE'
const IS_AUTHED = 'IS_AUTHED'
const STOP_LOADING = 'STOP_LOADING'

const loginActionCreator = {
  onChange: (e) => {
    return (dispatch, getState) => {
      dispatch({ type: ON_CHANGE, event: e})
    }
  },
  stopLoading: () => {
    return (dispatch) => {
      dispatch({ type: STOP_LOADING })
    }
  },
  submitLogin : (credentials, cookies) => {
    return (dispatch, getState) => {
      console.log('Login action UN/PW: ', username.value, password.value)
      console.log('Login action UN/PW: ', cookies.cookies.set)
      if(username.value && password.value){
        dispatch({type: SUBMIT_LOGIN})
        fetch('http://localhost:8000/login', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            username: username.value,
            password: password.value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(data => data.json())
        .then((res) => {
          const { jwt, isAuthenticated, message } = res
          if(isAuthenticated){
            cookies.set('jwt', jwt.token, { path: '/' }) // Set cookie so that requests to non-hashed routes can be authenticated
            setTimeout(function(){
              dispatch({
                type: LOGIN_SUCCESS,
                jwt: jwt, // JWTStrategy can extract tokens from both cookies and headers
                message: message
              })
            },3500)
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
  submitLogout: function(cookies){
    return function(dispatch, getState){
      cookies.set('jwt', null)
      dispatch({type: SUBMIT_LOGOUT})
      fetch('http://localhost:8000/logout')
      .then(function(data){ console.log(data) })
      // .then(data => data.json())
      // .then((res) => {
      //   const { isAuthenticated, message } = res
      //   if(isAuthenticated){
      //     return dispatch({
      //       type: LOGOUT_FAIL,
      //       message: message
      //     })
      //   }else{
      //     return dispatch({
      //       type: LOGOUT_SUCCESS,
      //       message: message
      //     })
      //   }
        
      // })
      // .then(res => dispatch({type: IS_AUTHED}))
    }
  },
  checkAuth: (cookies) => {
    return (dispatch, getState) => {
      const jwt = cookies.get('jwt') || getState().login.jwt.token
      if(jwt){
        fetch('http://localhost:8000/user', {
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify({
            id: jwt
          }),
          headers: {
            'authorization': jwt
          }
        }).then(data => data.json()).then((res) => {
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