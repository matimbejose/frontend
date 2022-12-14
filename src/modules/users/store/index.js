import axios from "axios"
import { baseApiUrl } from "../../../global"

axios.defaults.baseURL = baseApiUrl



export default {
  state: {
    token: sessionStorage.getItem('access_token') || null,
    business_id: sessionStorage.getItem('business') || null,
    authorities: sessionStorage.getItem('authorities') ? JSON.parse(atob(sessionStorage.getItem('authorities'))) : null,
    editingUserId: null,
    addingUser: true,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    retrieveBusinessId(state, business_id) {
      state.business_id = business_id
    },
    destroyToken(state) {
      state.token = null
    },
    destroyAuthorities(state) {
      state.authorities = state
    },
    setUserEditingId(state, editingUserId) {
      state.editingUserId = editingUserId
    },
    setAuthorities(state, authorities) {
      state.authorities = authorities
    },
    setUserActionPerform(state, addingUser) {
      state.addingUser = addingUser
    }
  },
  actions: {
    setUserEditingId(context, editingUserId) {
      context.commit('setUserEditingId', editingUserId)
    },
    setUserActionPerform(context, addingUser) {
      context.commit('setUserActionPerform', addingUser)
    },
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          username: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.success.token

            sessionStorage.setItem('access_token', token)
            sessionStorage.setItem('business', response.data.success.business_id)
            sessionStorage.setItem('authorities', btoa(JSON.stringify(response.data.success.authorities)))
            context.commit('retrieveToken', token)
            context.commit('retrieveBusinessId', response.data.success.business_id)
            context.commit('setAuthorities', response.data.success.authorities)
            resolve(response)

          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              sessionStorage.clear();
              context.commit('destroyToken')
              //  context.commit('destroyAuthorities')
              resolve(response)
            })
            .catch(error => {
              sessionStorage.clear();
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
  },

}