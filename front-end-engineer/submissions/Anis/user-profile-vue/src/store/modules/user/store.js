import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
    users: [],
    user: {},
    isLoading: false
}

export default {
    state,
    actions,
    mutations,
    getters
}