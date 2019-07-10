import Vue from 'vue'
import Vuex from 'vuex'

import links from './modules/links'
import account from './modules/account'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    links,
    account,
    user
  }
})