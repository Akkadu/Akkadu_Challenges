import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {}
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload
    },
    deleteUser(state, payload) {
      delete state.users[payload]
      state.users = { ...state.users }
    }
  },
  actions: {
    //action to load users from api
    async loadUsers({ commit }) {
      try {
        //get users from api
        let result = await Vue.service.getUsers();

        //convert list of users to user object mapped using id
        let usersObj = Object.assign({}, ...(result.map(element => ({ [element.id]: element }))));

        commit("setUsers", usersObj);
      } catch (error) {
        console.log("store loadUsers error", error)
      }
    },

    //action to delete particular user
    deleteUser({ commit }, id) {
      commit("deleteUser", id)
    }
  },
  getters: {

    //get particular user by id
    getUser: state => id => state.users[id],
  }
});
