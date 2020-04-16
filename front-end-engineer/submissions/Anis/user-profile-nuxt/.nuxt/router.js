import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _70c4e350 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _ab37af9a = () => interopDefault(import('../pages/_username.vue' /* webpackChunkName: "pages/_username" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _70c4e350,
    name: "index"
  }, {
    path: "/:username",
    component: _ab37af9a,
    name: "username"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
