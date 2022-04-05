module.exports = {
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