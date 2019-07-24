const INIT_STATE = {
  credentials:{
    username: 'admin',
    password: 'password',
  },
  jwt: null,
  isAuthenticated: false,
  message: false,
  isLoading: false
}

const loginReducer = (state=INIT_STATE, action) => {
  switch (action.type) {
    case 'ON_CHANGE':{
      const id = action.event.target.id
      const value = action.event.target.value
      return Object.assign({}, state, { credentials:{ [id]:value }})
    }
    case 'STOP_LOADING':{
      return Object.assign({}, state, { isLoading: false })
    }
    case 'SUBMIT_LOGIN':{
      console.log('SUBMIT_LOGIN')
      return Object.assign({}, state, { isLoading: true })
    }
    case 'LOGIN_SUCCESS':{
      console.log('LOGIN_SUCCESS')
      const { jwt, username, message } = action
      return Object.assign({}, state, { jwt: jwt, username: username, isAuthenticated: true, isLoading: false, message: message })
    }
    case 'LOGIN_FAIL':{
      console.log('LOGIN_FAIL')
      const message = action.message
      return Object.assign({}, state, { isAuthenticated: false, isLoading: false, message: message }) 
    }
    case 'SUBMIT_LOGOUT':{
      console.log('SUBMIT_LOGOUT')
      return Object.assign({}, state, { jwt: null, isAuthenticated: false, isLoading: true })
    }
    case 'LOGOUT_SUCCESS':{
      const message = action.message
      console.log('LOGOUT_SUCCESS')
      return Object.assign({}, state, { jwt: null, isAuthenticated: false, isLoading: false, message: message })
    }
    case 'LOGOUT_FAIL':{
      console.log('LOGOUT_FAIL')
      const message = action.message
      return Object.assign({}, state, { isAuthenticated: true, isLoading: false, message: message }) 
    }
    case 'IS_AUTHED':{
      return Object.assign({}, state, { isAuthenticated: action.isAuthenticated })
    }
    default:
      return state
  }
}

export default loginReducer