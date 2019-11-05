import API from '@/plugins/API'

export const getAllUsers = ({ commit, dispatch }, data) => {
    commit('SET_LOADING_STATUS', true)
    return new Promise((resolve, reject) => {
        API().get('/challenges/fe/data/json/users.json').then((res) => {
            if (res.data.length > 0) { //user array check
                commit('SET_USERS', res.data) //set user using mutation
                commit('SET_LOADING_STATUS', false)//hide loader
                resolve()
            } else {
                reject()
            }
        })
    })
}

//get a user by username from state.users
export const getSpacificUser = ({ state , commit, dispatch }, data) => {
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
}

//Delete a user from state.users
export const deleteSpecificUser = ({ state , commit, dispatch }, id) => {
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
}