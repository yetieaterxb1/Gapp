const ON_CHANGE = 'ON_CHANGE'
const GET_PROFILE = 'GET_PROFILE'
const TOGGLE_PROJECTLIST = 'TOGGLE_PROJECTLIST'
const SHOW_PROJECTLIST = 'SHOW_PROJECTLIST'
const HIDE_PROJECTLIST = 'HIDE_PROJECTLIST'

const userActionCreator = {
  onChange: (e) => {
    return (dispatch, getState) => {
      dispatch({ type: ON_CHANGE, event: e})
    }
  },
  getProfile: (cookies) => {
    return (dispatch, getState) => {
      const profile = 'TODO:: profile'
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
        }).then(function(data){
          dispatch({ type: GET_PROFILE, profile: profile})
        })
      }else{

      }
    }
  },
  toggleProjectList: () => {
    return (dispatch, getState) => {
      dispatch({ type: TOGGLE_PROJECTLIST })
    }
  },
  showProjectList: () => {
    return (dispatch, getState) => {
      dispatch({ type: SHOW_PROJECTLIST })
    }
  },
  hideProjectList: () => {
    return (dispatch, getState) => {
      dispatch({ type: HIDE_PROJECTLIST })
    }
  }
}
export default userActionCreator