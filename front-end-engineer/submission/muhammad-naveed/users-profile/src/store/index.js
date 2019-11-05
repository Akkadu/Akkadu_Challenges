import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        selectedUser: null,
    },
    mutations: {
        //Set users if the users array is empty
        setUsers(state, users) {
            if (!state.users.length) {
                state.users = users;
            }
        },
        //sets the selected user
        setSelectedUser(state, user) {
            state.selectedUser = user;
        },
        //Delete item from users array
        deleteUser(state, id) {
            //this will filter the users array and exclude the user whose id was passed via parameter
            state.users = state.users.filter(item => {
                return item.id !== id;
            });
        }
    },
    actions: {
        deleteUser(context, user) {
            context.commit("deleteUser", user);
        },
        setSelectedUser(context, user) {
            context.commit('setSelectedUser', user)
        },
    },
    getters: {
        getUsers: (state) => state.users,
        getUserById: (state) => (id) => {
            return state.users.filter(item => item.id === id).shift()
        },
        getSelectedUser: (state) => state.selectedUser,
    }
});
