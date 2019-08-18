const config = require('../../../config/config.js')

const ON_CHANGE = 'ON_CHANGE'
const GET_PROFILE = 'GET_PROFILE'
const SET_CURRENTPROJECTTAB = 'SET_CURRENTPROJECTTAB'
const OPEN_PROJECT = 'OPEN_PROJECT'
const TOGGLE_PROJECTLIST = 'TOGGLE_PROJECTLIST'
const SHOW_PROJECTLIST = 'SHOW_PROJECTLIST'
const HIDE_PROJECTLIST = 'HIDE_PROJECTLIST'
const CREATE_NEWPROJECT = 'CREATE_NEWPROJECT'
const TOGGLE_NEWPROJECTMODAL = 'TOGGLE_NEWPROJECTMODAL'
const CLOSE_NEWPROJECTMODAL = 'CLOSE_NEWPROJECTMODAL'
const GET_ALLSTRAINS = 'GET_ALLSTRAINS'
const GET_STRAINNAMEBYID = 'GET_STRAINNAMEBYID'
const ADD_IDTOPROJECT = 'ADD_IDTOPROJECT'
const REMOVE_IDFROMPROJECT = 'REMOVE_IDFROMPROJECT'
const UPDATE_PROJECTLIST = 'UPDATE_PROJECTLIST'

const userActionCreator = {
  onChange: (e) => {
    return (dispatch, getState) => {
      dispatch({ type: ON_CHANGE, event: e })
    }
  },
  getProfile: () => {
    return (dispatch, getState) => {
      const { cookies } = getState().login
      const JWToken = cookies.get('jwt')
      fetch(config.api.path.root + '/user/profile', {
        method: 'GET',
        headers: {
          'authorization': JWToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then((data) => {
          dispatch({ type: GET_PROFILE, profile: data.data })
        })
    }
  },
  setCurrentProjectTab: (index) => {
    return (dispatch, getState) => {
      const prevIdx  = getState().user.currentProjectTab
      dispatch({ type: SET_CURRENTPROJECTTAB, currentIndex: index, previousIndex: prevIdx })
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
  },
  openProject: (id) => {
    return (dispatch, getState) => {
      dispatch({ type: OPEN_PROJECT, projectId: id })
    }
  },
  createNewProject: (name) => {
    return (dispatch, getState) => {
      const { cookies } = getState().login
      const JWToken = cookies.get('jwt')
      name = projectname.value || name
      dispatch({ type: CREATE_NEWPROJECT })
      fetch(config.api.path.root + '/user/project', {
        method: 'POST',
        body: JSON.stringify({
          method: 'create',
          name: name
        }),
        headers: {
          'authorization': JWToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(data => data.json())
        .then((data) => {
          dispatch({ type: UPDATE_PROJECTLIST, projectList: data.data })
          dispatch({ type: CLOSE_NEWPROJECTMODAL })
        })
    }
  },
  deleteProject: (id) => {
    return (dispatch, getState) => {
      const { cookies } = getState().login
      const JWToken = cookies.get('jwt')
      
      fetch(config.api.path.root + '/user/project', {
        method: 'POST',
        body: JSON.stringify({
          method: 'delete',
          id: id
        }),
        headers: {
          'authorization': JWToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((data) => {
          console.log('RES data:', data.projectList)
          dispatch({ type: UPDATE_PROJECTLIST, projectList: data.data })
          dispatch({ type: CLOSE_NEWPROJECTMODAL })
        })
    }
  },
  toggleNewProjectModal: () => {
    return (dispatch, getState) => {
      dispatch({ type: TOGGLE_NEWPROJECTMODAL})
    }
  },
  closeNewProjectModal: () => {
    return (dispatch, getState) => {
      dispatch({ type: CLOSE_NEWPROJECTMODAL})
    }
  },
  getAllStrains: () => {
    return (dispatch, getState) => {
      const { cookies } = getState().login
      const JWToken = cookies.get('jwt')
      fetch(config.api.path.root + '/api/strains', {
        method: 'GET',
        headers: {
          'authorization': JWToken
        }
      })
        .then(res => res.json())
        .then(function(data){
          const message = data.message
          const raw = data.data
          const colNames = []
          const rows = []
          raw.forEach((strain, idx) => {
            const row = []
            Object.keys(strain).forEach((key) => {
              if(idx === 0){
                colNames.push(key)
              }
              row.push(strain[key])
            })
            rows.push(row)
          })
          dispatch({ 
            type: GET_ALLSTRAINS,  
            mesage: message, 
            strainData: { raw, colNames, rows }
          })
        })
    }
  },
  addIdToProject: (id) => {
    return (dispatch, getState) => {
      dispatch({ type: ADD_IDTOPROJECT, id })
    }
  },
  removeIdFromProject: (id) => {
    return (dispatch, getState) => {
      dispatch({ type: REMOVE_IDFROMPROJECT, id })
    }
  },
  submitProject: (id) => {
    return (dispatch, getState) => {
      const { cookies } = getState().login
      const { profile, currentProject } = getState().user
      const projects = profile.projects  
      const JWToken = cookies.get('jwt')
      const currentIdx = projects.map((item) => {
        return item._id === currentProject
      }).findIndex(function(check){ return !!check })
      // DIST
      console.log('sent project', projects[currentIdx])
      fetch(config.api.path.root + '/api/predict', {
        method: 'POST',
        body: JSON.stringify({
          model: 'dist',
          project: projects[currentIdx]
        }),
        headers: {
          'authorization': JWToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(function(data){
          dispatch({ type: 'SUBMIT_PROJECT', message: data.message, data: data.data })
        })

      // KMR
      // fetch(config.api.path.root + '/api/predict', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     model: 'kmr'
      //   }),
      //   headers: {
      //     'authorization': JWToken,
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   }
      // }).then(res => res.json())
      //   .then(function(data){
      //     const message = data.message
      //     dispatch({ type: 'SUBMIT_PROJECT', message: message, data: data.data })
      //   })
    }
  }
}
export default userActionCreator