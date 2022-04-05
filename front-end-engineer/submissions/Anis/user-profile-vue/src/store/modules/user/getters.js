module.exports = {
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