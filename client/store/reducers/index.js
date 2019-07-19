import { combineReducers } from 'redux'
import login  from './login'
import user  from './user'

const reducer = combineReducers({
  login,
  user
})


export default reducer