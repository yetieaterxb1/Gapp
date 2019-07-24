const INIT_STATE = {
  profile: {
    test: 'test'
  },
  showProjectList: false,
  showNewProjectModal: false
}

const userReducer = (state=INIT_STATE, action) => {
  switch (action.type) {
    case 'ON_CHANGE':{
      const id = action.event.target.id
      const value = action.event.target.value
      return Object.assign({}, state, { credentials:{ [id]:value }})
    }
    case 'GET_PROFILE':{
      const profile = action.profile
      return Object.assign({}, state, { profile: profile })
    }
    case 'TOGGLE_PROJECTLIST':{
      return Object.assign({}, state, { showProjectList: !state.showProjectList })
    }
    case 'SHOW_PROJECTLIST':{
      return Object.assign({}, state, { showProjectList: true })
    }
    case 'HIDE_PROJECTLIST':{
      return Object.assign({}, state, { showProjectList: false })
    }
    case 'TOGGLE_NEWPROJECTMODAL': {
      return Object.assign({}, state, { showNewProjectModal: !state.showNewProjectModal })
    }
    case 'CLOSE_NEWPROJECTMODAL': {
      return Object.assign({}, state, { showNewProjectModal: false })
    }
    default:
      return state
  }
}

export default userReducer