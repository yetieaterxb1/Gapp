const INIT_STATE = {
  profile: {
    projects: []
  },
  currentProjectTab: 0,
  currentProject: false,
  showProjectList: false,
  showNewProjectModal: false,
  strainData: false
}

const userReducer = (state=INIT_STATE, action) => {
  switch (action.type) {
    case 'ON_CHANGE':{
      const { id, value } = action.event.target
      return Object.assign({}, state, { credentials:{ [id]:value }})
    }
    case 'GET_PROFILE':{
      const { profile } = action
      return Object.assign({}, state, { profile: profile })
    }
    case 'SET_CURRENTPROJECTTAB':{
      const { currentIndex, previousIndex } = action
      return Object.assign({}, state, { currentProjectTab: currentIndex, previousProjectTab: previousIndex })
    }
    case 'TOGGLE_PROJECTLIST':{
      const { showProjectList } = state
      return Object.assign({}, state, { showProjectList: !showProjectList })
    }
    case 'SHOW_PROJECTLIST':{
      return Object.assign({}, state, { showProjectList: true })
    }
    case 'HIDE_PROJECTLIST':{
      return Object.assign({}, state, { showProjectList: false })
    }
    case 'TOGGLE_NEWPROJECTMODAL': {
      const { showNewProjectModal } = state
      return Object.assign({}, state, { showNewProjectModal: !showNewProjectModal })
    }
    case 'CLOSE_NEWPROJECTMODAL': {
      return Object.assign({}, state, { showNewProjectModal: false })
    }
    case 'OPEN_PROJECT': {
      const { projectId } = action
      return Object.assign({}, state, { currentProject: projectId })
    }
    case 'CREATE_NEWPROJECT': {
      console.log(state.profile.projects)
      return Object.assign({}, state, { projectListIsLoading: true })
    }
    case 'UPDATE_PROJECTLIST': {
      
      console.log('UPDATE_PROJECTLIST: ', action.projectList)
      return Object.assign({}, state, { profile: { projects: action.projectList }, projectListIsLoading: false })
    }
    case 'GET_ALLSTRAINS': {
      const { strainData } = action
      return Object.assign({}, state, { strainData })
    }
    case 'ADD_IDTOPROJECT': {
      const { id } = action
      const { profile, currentProject } = state
      const currentIdx = profile.projects.map((item) => {
        return item._id === currentProject
      }).findIndex(check => !!check)
      const updatedProjects = profile.projects
      updatedProjects[currentIdx].likedIds.push(id)
      return Object.assign({}, state, { profile: { projects: updatedProjects }})
    }
    case 'REMOVE_IDFROMPROJECT': {
      const { id } = action
      const { profile, currentProject } = state
      const currentIdx = profile.projects.map((item) => {
        return item._id === currentProject
      }).findIndex(check => !!check)
      const updatedProjects = profile.projects
      updatedProjects[currentIdx].likedIds = updatedProjects[currentIdx].likedIds.filter((val)=>{
        return val !== id
      })
      return Object.assign({}, state, { profile: { projects: updatedProjects }})
    }
    case 'SUBMIT_PROJECT': {
      console.log('SUBMIT_PROJECT', action.data)
      return Object.assign({}, state, {...state})
    }
    default:
      return state
  }
}

export default userReducer