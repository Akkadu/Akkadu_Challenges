import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: []
    },
    mutations: {
        //Set users if the users array is empty
        setUsers(state, users) {
            if (!state.users.length) {
                state.users = users;
            }
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
    },
    getters: {
        getUserById: (state) => (id) => {
            return state.users.filter(item => item.id === id).shift()
        }
    }
});
