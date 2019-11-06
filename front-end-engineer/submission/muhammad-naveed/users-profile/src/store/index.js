import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        isBusy: false,
    },
    mutations: {

        /** A mutator to set users if the users array is empty */
        setUsers(state, users) {
            state.users = users;
        },

        /** A mutator to set the busy state in store */
        setBusyState(state, isBusy) {
            state.isBusy = isBusy;
        },

        /** A mutator to delete a item from users array. */
        deleteUser(state, id) {
            /** This will filter the users array and exclude the user whose ID was passed via parameter. */
            state.users = state.users.filter(item => {
                return item.id !== id;
            });
        }
    },
    actions: {

        /** A action function to delete the user from store. */
        async setUsers(context) {
            /** To validate if the users array is empty then populate it else ignore it. */
            if (!context.state.users.length) {
                /** Set the busy state to true to show the loader */
                context.commit("setBusyState", true);
                try {
                    const {data} = await axios.get(
                        "https://akkadu-careers.s3.cn-north-1.amazonaws.com.cn/challenges/fe/data/json/users.json"
                    );
                    /** After getting the data from endpoint we populate the users array with this data in vuex store. */
                    context.commit("setUsers", data);
                } catch ({response}) {
                    console.log(response.statusText, response.status);
                } finally {
                    /** Set the busy state to false to hide the loader in both success or error */
                    context.commit("setBusyState", false);
                }
            }
        },

        /** A action function to delete the user from store. */
        deleteUser(context, id) {
            context.commit("deleteUser", id);
        },

        /** A action function to set the selected user in store. */
        setBusyState(context, isBusy) {
            context.commit('setBusyState', isBusy)
        },
    },
    getters: {
        /** A getter function to get all the users from store. */
        getUsers: (state) => state.users,

        /** A getter function to return isBusy based on ajax call. */
        getBusyState: (state) => state.isBusy,

        /** A getter function to get a single user by ID from store. */
        getUserById: (state) => (id) => {
            return state.users.filter(item => item.id === id).shift()
        },
    }
});
