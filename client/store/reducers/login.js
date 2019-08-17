const INIT_STATE = {
  cookies: false,
  isAuthenticated: false,
  message: false,
  isLoading: false
}

const loginReducer = (state=INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_COOKIEPROVIDER':{
      const { provider, condition, force } = action
      console.log('provider', provider)
      const cookies = !!force ?  provider : ( !!condition && !state.cookies ? provider : state.cookies )
      console.log('cookies', cookies)
      return Object.assign({}, state, { cookies: provider })
    }
    case 'ON_CHANGE':{
      const id = action.event.target.id
      const value = action.event.target.value
      return Object.assign({}, state, { credentials: { [id]:value }})
    }
    case 'STOP_LOADING':{
      return Object.assign({}, state, { isLoading: false })
    }
    case 'SUBMIT_LOGIN':{
      console.log('SUBMIT_LOGIN')
      return Object.assign({}, state, { isLoading: true })
    }
    case 'LOGIN_SUCCESS':{
      const { isAuthenticated, username, message } = action
      console.log('LOGIN_SUCCESS')
      return Object.assign({}, state, { username: username, isAuthenticated: isAuthenticated, isLoading: false, message: message })
    }
    case 'LOGIN_FAIL':{
      console.log('LOGIN_FAIL')
      const { message } = action
      return Object.assign({}, state, { isAuthenticated: false, isLoading: false, message: message }) 
    }
    case 'SUBMIT_LOGOUT':{
      console.log('SUBMIT_LOGOUT')
      // const { removeCookie } = state.cookies
      // removeCookie('jwt')
      return Object.assign({}, state, { isAuthenticated: false, isLoading: true })
    }
    case 'LOGOUT_SUCCESS':{
      console.log('LOGOUT_SUCCESS')
      const { message } = action
      return Object.assign({}, state, { isAuthenticated: false, isLoading: false, message: message })
    }
    case 'LOGOUT_FAIL':{
      console.log('LOGOUT_FAIL')
      const { message } = action
      // state.cookies.removeCookie('jwt', { path: '/' })
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