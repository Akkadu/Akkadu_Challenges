import { ActionContext } from "vuex"

interface User {
  id: number
  fullName: string
  token: string
}

interface State {
  user: User | null
  isLoggedIn: boolean
}

export const state = (): State => ({
  user: null,
  isLoggedIn: false,
})

type Context = ActionContext<State, State>


export const mutations = {
  SET_USER(state: State, user: User) {
    localStorage.setItem('app_user_id', user.id.toString())
    localStorage.setItem('app_user_token', user.token)
    localStorage.setItem('app_user_name', user.fullName)
    if (user.token) {
      state.isLoggedIn = true
    }
    state.user = user
  },
  LOG_ON_USER(state: State) {
    if (process.server) {
      return
    }
    const id = Number(localStorage.getItem('app_user_id'))
    const token = localStorage.getItem('app_user_token')
    const fullName = localStorage.getItem('app_user_name')
    const user = { id: id || 0, token: token || '', fullName: fullName || '' }

    if (user.token) {
      state.isLoggedIn = true
      state.user = user
    } else {
      state.isLoggedIn = false
      state.user = null
    }

  },

  LOG_OUT_USER(state: State) {
    if (process.server) {
      return
    }
    localStorage.removeItem('app_user_id')
    localStorage.removeItem('app_user_token')
    localStorage.removeItem('app_user_name')
    state.user = null
    state.isLoggedIn = false
  },
}

export const actions = {
  setUser(context: Context, user: User) {
    context.commit({
      type: "SET_USER",
      ...user,
    })
  },
  logOn(context: Context) {
    context.commit("LOG_ON_USER")
  },
  logOut(context: Context) {
    context.commit("LOG_OUT_USER")
  }
}


export const getters = {
  isLoggedIn (state:State) {
    return state.isLoggedIn
  },
  user(state: State) {
    return state.user
  }
}
