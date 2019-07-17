import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const INIT_STATE = {
  credentials:{
    username: 'admin',
    password: 'password',
  },
  isAuthenticated: false,
  message: false,
  isLoading: false
}

const store = createStore(
  reducers,
  {
    login: INIT_STATE
  },
  compose(applyMiddleware(thunk))
)

export default store