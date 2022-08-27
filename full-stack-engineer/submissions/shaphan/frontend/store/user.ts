interface User {
    id: number;
    fullName: string;
    token: string;
}

interface State {
    user: User | null;
}

export const state = (): State => ({
  user: null,
});

export const mutations = {
  setUser(state: State, user: User) {
    localStorage.setItem('app_user_id', user.id.toString())
    localStorage.setItem('app_user_token', user.token)
    localStorage.setItem('app_user_name', user.fullName)
    state.user = user;
  },
  clearUser(state: State) {
    state.user = null;
  },
 logOnUser(state: State) {
  if(process.server) {
    return;
  }
  const id = Number(
    localStorage.getItem('app_user_id'))
  const token = localStorage.getItem('app_user_token')
  const fullName = localStorage.getItem('app_user_name')
const user = { id: id || 0, token: token || "", fullName: fullName || "" }
      state.user = user;
  }
}
