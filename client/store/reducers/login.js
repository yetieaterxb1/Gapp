const INIT_STATE = {
  cookies: false,
  isAuthenticated: false,
  message: false,
  isLoading: false
}

const loginReducer = (state=INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_COOKIEPROVIDER':{
      const { cookies } = action
      return Object.assign({}, state, { cookies })
    }
    case 'ON_CHANGE':{
      const { id, value } = action.event.target
      return Object.assign({}, state, { credentials: { [id]:value }})
    }
    case 'STOP_LOADING':{
      return Object.assign({}, state, { isLoading: false })
    }
    case 'SUBMIT_LOGIN':{
      return Object.assign({}, state, { isLoading: true })
    }
    case 'LOGIN_SUCCESS':{
      const { isAuthenticated, username, message } = action
      return Object.assign({}, state, { username, isAuthenticated, message, isLoading: false })
    }
    case 'LOGIN_FAIL':{
      const { message } = action
      return Object.assign({}, state, { isAuthenticated: false, isLoading: false, message: message }) 
    }
    case 'SUBMIT_LOGOUT':{
      return Object.assign({}, state, { isAuthenticated: false, isLoading: true })
    }
    case 'LOGOUT_SUCCESS':{
      const { message } = action
      return Object.assign({}, state, { isAuthenticated: false, isLoading: false, message: message })
    }
    case 'LOGOUT_FAIL':{
      const { message } = action
      return Object.assign({}, state, { isAuthenticated: true, isLoading: false, message: message }) 
    }
    case 'IS_AUTHED':{
      const { isAuthenticated } = action
      return Object.assign({}, state, { isAuthenticated })
    }
    default:
      return state
  }
}

export default loginReducer