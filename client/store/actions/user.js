const ON_CHANGE = 'ON_CHANGE'
const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
const GET_PROFILE = 'GET_PROFILE'
const SHOW_PROJECTLIST = 'SHOW_PROJECTLIST'

const userActionCreator = {
  onChange: (e) => {
    return (dispatch, getState) => {
      dispatch({ type: ON_CHANGE, event: e})
    }
  },
  getProfile: () => {
    return (dispatch, getState) => {
      const profile = 'TODO:: profile'
      dispatch({ type: GET_PROFILE, profile: profile })
    }
  },
  showProjectList: () => {
    return (dispatch, getState) => {
      dispatch({ type: SHOW_PROJECTLIST })
    }
  }
  // receiveLogin: (res) => {
  //   return (dispatch, getState) => {
  //     dispatch({ type: RECEIVE_LOGIN, res: res })
  //   }
  // }
}
export default userActionCreator