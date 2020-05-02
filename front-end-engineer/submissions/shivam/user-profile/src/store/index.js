import Vue from "vue";
import Vuex from "vuex";
import UserService from "../services/user"

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
    async loadUsers({ commit }) {
      try {
        //get users from api
        let result = await new UserService().get();

        //convert list of users to user object mapped using id
        let usersObj = Object.assign({}, ...(result.map(element => ({ [element.id]: element }))));

        commit("setUsers", usersObj);
      } catch (error) {
        console.log(error)
      }
    },

    deleteUser({ commit }, id) {
      console.log("deleteUser", id);
      commit("deleteUser", id)
    }
  },
  getters: {
    getUser: state => id => state.users[id],
  }
});
