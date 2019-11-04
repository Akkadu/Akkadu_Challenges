import Vuex from 'vuex'

//State Obj
export const state = () => ({
    users: [],
    user: {},
    isLoading: false
})

//Vuex getters
export const getters = {
    userList(state) {
        return state.users
    },
    currentUser(state) {
        return state.user
    },
    isLoading(state) {
        return state.isLoading
    }
}

//Vuex mutations
export const mutations = {
    SET_USERS(state, list) {
        state.users = list
    },
    SET_LOADING_STATUS(state, status) {
        state.isLoading = status
    },
    SET_SPECIFIC_USER(state, user) {
        state.user = user
    }
}

//Vuex Actions
export const actions = {
    //get All user's from API call
    getAllUsers({ commit, dispatch }, data) {
        commit('SET_LOADING_STATUS', true)
        return new Promise((resolve, reject) => {
            this.$axios.$get('/challenges/fe/data/json/users.json').then((res) => {
                if (res.length > 0) { //user array check
                    commit('SET_USERS', res) //set user using mutation
                    commit('SET_LOADING_STATUS', false)//hide loader
                    resolve()
                } else {
                    reject()
                }
            })
        })
    },
    //get a user by username from state.users
    getSpacificUser({ state, commit, dispatch }, data) {
        return new Promise((resolve, reject) => {
            if (state.users.length) {//state user array check
                //find a specific user by username
                let targetUser = state.users.find((user) => user.username === data)
                if (targetUser) {
                    //set user to state
                    commit('SET_SPECIFIC_USER', targetUser)
                    //resove promise
                    resolve()
                } else {
                    reject({
                        status: false
                    })
                }
            } else {
                reject({
                    status: false
                })
            }
        })
    },
    //Delete a user from state.users
    deleteSpecificUser({ state, commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            //filter out array by a given id
            let users = state.users.filter(user => {
                return user.id !== id;
            });
            //update the users list
            commit('SET_USERS', users)
            //resove promise
            resolve()
        })
    },
}

