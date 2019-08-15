const config = require('../../../config/config.js')

const ON_CHANGE = 'ON_CHANGE'
const GET_PROFILE = 'GET_PROFILE'
const SET_CURRENTPROJECTTAB = 'SET_CURRENTPROJECTTAB'
const TOGGLE_PROJECTLIST = 'TOGGLE_PROJECTLIST'
const SHOW_PROJECTLIST = 'SHOW_PROJECTLIST'
const HIDE_PROJECTLIST = 'HIDE_PROJECTLIST'
const CREATE_NEWPROJECT = 'CREATE_NEWPROJECT'
const TOGGLE_NEWPROJECTMODAL = 'TOGGLE_NEWPROJECTMODAL'
const CLOSE_NEWPROJECTMODAL = 'CLOSE_NEWPROJECTMODAL'
const GET_ALLSTRAINS = 'GET_ALLSTRAINS'
const GET_STRAINNAMEBYID = 'GET_STRAINNAMEBYID'
const ADD_IDTOPROJECT = 'ADD_IDTOPROJECT'
const UPDATE_PROJECTLIST = 'UPDATE_PROJECTLIST'

const userActionCreator = {
  onChange: (e) => {
    return (dispatch, getState) => {
      dispatch({ type: ON_CHANGE, event: e })
    }
  },
  getProfile: (cookies) => {
    return (dispatch, getState) => {
      const jwt = cookies ? cookies.get('jwt') : getState().login.jwt
      if(jwt){
        fetch(config.api.path.root + '/user/profile', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'authorization': jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(data => data.json())
          .then((data) => {
            dispatch({ type: GET_PROFILE, profile: data.data })
          })
      }else{
        // dispatch({ type: API_ERROR, message: 'Authentication not provided.'})
      }
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
      dispatch({ type:'OPEN_PROJECT', projectId: id })
    }
  },
  createNewProject: (cookies) => {
    return (dispatch, getState) => {
      const jwt = cookies ? cookies.get('jwt') : getState().login.jwt
      dispatch({ type: CREATE_NEWPROJECT })
      fetch(config.api.path.root + '/user/project', {
        method: 'POST',
        body: JSON.stringify({
          jwt: jwt,
          method: 'create',
          name: projectname.value
        }),
        headers: {
          'authorization': jwt,
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
  deleteProject: (id, cookies) => {
    return (dispatch, getState) => {
      const jwt = cookies ? cookies.get('jwt') : getState().login.jwt
      dispatch({ type: CREATE_NEWPROJECT })
      fetch(config.api.path.root + '/user/project', {
        method: 'POST',
        body: JSON.stringify({
          jwt: jwt,
          method: 'delete',
          id: id
        }),
        headers: {
          'authorization': jwt,
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
  getAllStrains: (cookies) => {
    return (dispatch, getState) => {
      const jwt = cookies ? cookies.get('jwt') : getState().login.jwt
      fetch(config.api.path.root + '/api/strains', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'authorization': jwt
        }
      }).then(res => res.json())
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
  // getStrainNameById: (ids, cookie) => {
  //   return (dispatch, getState) => {
  //     const jwt = cookies.get('jwt')
  //     fetch(config.api.path.root + '/api/strains', {
  //       method: 'GET',
  //       credentials: 'same-origin',
  //       headers: {
  //         'authorization': jwt
  //       }
  //     }).then(res => res.json())
  //       .then(function(data){
  //         const raw = data.strains
  //         const colNames = []
  //         const rows = []
  //         raw.forEach((strain, idx) => {
  //           const row = []
  //           Object.keys(strain).forEach((key) => {
  //             if(idx === 0){
  //               colNames.push(key)
  //             }
  //             row.push(strain[key])
  //           })
  //           rows.push(row)
  //         })
  //         dispatch({ type: GET_ALLSTRAINS,  mesage: data.message, strainData: { raw:raw, colNames:colNames, rows:rows }})
  //       })
  //   }
  // },
  addIdToProject: (id, cookies) => {
    return (dispatch, getState) => {
      const projectId = id || getState().user.currentProject
      dispatch({ type: 'ADD_IDTOPROJECT', id: projectId })
    }
  },
  submitProject: (id, cookies) => {
    return (dispatch, getState) => {
      const jwt = cookies ? cookies.get('jwt') : getState().login.jwt
      const currentProject = getState().user.currentProject
      const projects = getState().user.profile.projects      
      const currentIdx = projects.map((item) => {
        return item._id === currentProject
      }).findIndex(function(check){ return !!check })

      // DIST
      // fetch(config.api.path.root + '/api/predict', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     jwt: jwt,
      //     model: 'dist',
      //     project: projects[currentIdx]
      //   }),
      //   headers: {
      //     'authorization': jwt,
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   }
      // }).then(res => res.json())
      //   .then(function(data){
      //     const message = data.message
      //     dispatch({ type: 'SUBMIT_PROJECT', message: message, data: data.data })
      //   })

      // KMR
      fetch(config.api.path.root + '/api/predict', {
        method: 'POST',
        body: JSON.stringify({
          jwt: jwt,
          model: 'kmr'
        }),
        headers: {
          'authorization': jwt,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(function(data){
          const message = data.message
          dispatch({ type: 'SUBMIT_PROJECT', message: message, data: data.data })
        })
    }
  }
}
export default userActionCreator