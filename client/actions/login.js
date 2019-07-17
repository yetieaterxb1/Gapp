const SUBMIT_LOGIN = 'SUBMIT_LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const ON_CHANGE = 'ON_CHANGE'
const IS_AUTHED = 'IS_AUTHED'


console.log('LOGIN ACTION RUNNING')

const loginActionCreator = {
  onChange: (e) => {
    return (dispatch, getState) => {
      dispatch({ type: ON_CHANGE, event: e})
    }
  },
  submitLogin : (e) => {
    return (dispatch, getState) => {
      if(username.id && password.id){
        dispatch({type: SUBMIT_LOGIN})
        fetch('http://localhost:8000/login', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            username: username.id,
            password: password.id
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(data => data.json())
        .then((res) => {
          const { isAuthenticated, message } = res
          if(isAuthenticated){
            setTimeout(function(){
              dispatch({
                type: LOGIN_SUCCESS,
                message: message
              })
            },3500)
          }else{
            dispatch({
              type: LOGIN_FAIL,
              message: message
            })
          }
        }).then(res => dispatch({type: IS_AUTHED}))
      }        
    }
  }
}
export default loginActionCreator