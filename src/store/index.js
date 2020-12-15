import Vuex from 'vuex'
import usersInfo from './modules/usersInfo'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usersInfo
  }
})
