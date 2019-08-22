const INIT_STATE = {
  profile: {
    projects: []
  },
  currentProjectTab: 0,
  currentProject: false,
  currentStrain: false,
  showProjectList: false,
  showNewProjectModal: false,
  showStrainDataModal: false,
  strainData: {
    isLoading: true,
    cleanData: {},
    smartTableHeaders: []
  }
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
    case 'SET_CURRENTSTRAIN':{
      const { id } = action
      return Object.assign({}, state, { currentStrain: id })
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
    case 'TOGGLE_STRAINDATAMODAL': {
      const { showStrainDataModal } = state
      return Object.assign({}, state, { showStrainDataModal: !showStrainDataModal })
    }
    case 'CLOSE_STRAINDATAMODAL': {
      return Object.assign({}, state, { showStrainDataModal: false })
    }
    case 'OPEN_PROJECT': {
      const { projectId } = action
      return Object.assign({}, state, { currentProject: projectId })
    }
    case 'CREATE_NEWPROJECT': {
      return Object.assign({}, state, { projectListIsLoading: true })
    }
    case 'UPDATE_PROJECTLIST': {
      const { projectList } = action
      console.log('UPDATE_PROJECTLIST', projectList)
      return Object.assign({}, state, { profile: { projects: projectList }, projectListIsLoading: false })
    }
    case 'GET_ALLSTRAINS': {
      const { strainData } = action
      return Object.assign({}, state, { strainData })
    }
    case 'ADD_IDTOPROJECT': {
      const { profile, id } = action
      const { projects } = profile
      const pidx = projects.findIndex(item => item._id === id)
      projects[pidx].likedIds.push(id)
      return Object.assign({}, state, { profile: { projects: updatedProjects }, ...state })
    }
    case 'SET_RATING': {
      const { id, val, profile, currentProject } = action
      const { projects } = profile
      const pidx = projects.findIndex(item => item._id === currentProject)
      
      const ratings = projects[pidx].ratings
      const ridx = ratings.findIndex(rating => rating._id === id)
      projects[pidx].ratings[ridx].Rating = val

      const likedIds = projects[pidx].likedIds
      projects[pidx].likedIds = val>3 ? likedIds.concat(id) : likedIds.filter(bi => id === bi)
      
      return Object.assign({}, state, { profile: { projects: projects }})
    }
    case 'REMOVE_IDFROMPROJECT': {
      const { id } = action
      const { profile, pid } = state
      const pidx = profile.projects.findIndex(item => item._id === pid)
      const projects = profile.projects
      projects[pidx].likedIds = projects[pidx].likedIds.filter(val => val !== id)
      return Object.assign({}, state, { profile: { projects }})
    }
    case 'SUBMIT_PROJECT': {
      return Object.assign({}, state, { currentProjectTab: 1 })
    }
    case 'RECEIVE_PROJECTRESULTS': {
      const { data } = action
      const { profile, currentProject } = state
      const pidx = profile.projects.findIndex(item => item._id === currentProject)
      const projects = profile.projects
      projects[pidx].results = data
      return Object.assign({}, state, { profile: { projects }})
    }
    default:
      return state
  }
}

export default userReducer