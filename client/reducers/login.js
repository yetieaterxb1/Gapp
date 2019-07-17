
console.log('LOGIN REDUCER RUNNING')

const INIT_STATE = {
  credentials:{
    username: 'admin',
    password: 'password',
  },
  isAuthenticated: false,
  message: false
}


const loginReducer = (state=INIT_STATE, action) => {
  switch (action.type) {
    case 'ON_CHANGE':{
      const id = action.event.target.id
      const value = action.event.target.value
      return Object.assign({}, state, { credentials:{ [id]:value }})
    }
    case 'SUBMIT_LOGIN':{
      console.log('SUBMIT_LOGIN')
      return Object.assign({}, state, { isLoading: true })
    }
    case 'LOGIN_SUCCESS':{
      console.log('Reducer: action: ', action.type)
      const isAuthenticated = action.isAuthenticated
      const message = action.message
      return Object.assign({}, state, { isAuthenticated: true, isLoading: false, message: message })
    }
    case 'LOGIN_FAIL':{
      console.log('Reducer: action: ', action.type)
      console.log('Reducer: state: ', state)
      const message = action.message
      return Object.assign({}, state, { isAuthenticated: false, isLoading:false, message: message}) 
    }
    case 'IS_AUTHED':{
      console.log('Is Authed: ', state.isAuthenticated)
    }
    default:
      return state
  }
}

export default loginReducer