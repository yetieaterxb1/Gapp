const ON_CHANGE = 'ON_CHANGE'
const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
const GET_PROFILE = 'GET_PROFILE'

const userActionCreator = {
  onChange: (e) => {
    return (dispatch, getState) => {
      dispatch({ type: ON_CHANGE, event: e})
    }
  },
  getProfile: () => {
    return (dispatch, getState) => {
      dispatch({ type: GET_PROFILE })
    }
  },
  receiveLogin: (res) => {
    return (dispatch, getState) => {
      dispatch({ type: RECEIVE_LOGIN, res: res })
    }
  }
}
export default userActionCreator