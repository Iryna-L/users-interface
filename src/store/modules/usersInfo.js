import http from '../../utils/http'

const state = () => {
  return {
    list: [],
    fetching: false
  }
}

const mutations = {
  GET_USERS_REQUEST (state) {
    state.fetching = true
  },

  GET_USERS_SUCCESS (state, payload) {
    state.list = payload
    state.fetching = false
  },

  GET_USERS_FAILURE (state) {
    state.list = []
    state.fetching = false
  },

  DELETE_USER (state, userId) {
    state.list = state.list.filter(user => {
      return user.id !== userId
    })
  },
  EDIT_USER (state, {userId, userBody}) {
    state.list = state.list.map(user => {
      return user.id === userId ? {...user, name: userBody.name, username: userBody.username, email: userBody.email} : user
    })
  },
  ADD_NEW_USER (state, user) {
    state.list.push(user)
  }
}

const actions = {
  async getUsers ({ commit }) {
    commit('GET_USERS_REQUEST')

    try {
      const { data } = await http.get('/users')

      commit('GET_USERS_SUCCESS', data)
    } catch (e) {
      commit('GET_USERS_FAILURE')
    }
  },

  async createUser ({ commit }, payload) {
    try {
      const { data } = await http.post('/users', payload)

      commit('ADD_NEW_USER', data)
      return true
    } catch (e) {
      return false
    }
  },
  async deleteUser ({ commit }, id) {
    try {
      await http.delete(`/users/${id}`)

      commit('DELETE_USER', id)
      return true
    } catch (e) {
      return false
    }
  },

  async editUser ({ commit }, {id, payload}) {
    try {
      const { data } = await http.put(`/users/${id}`, payload)

      commit('EDIT_USER', {userBody: data, userId: id})

      return true
    } catch (e) {
      return false
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
