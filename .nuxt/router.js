import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d7234d40 = () => interopDefault(import('..\\pages\\item\\index.vue' /* webpackChunkName: "pages/item/index" */))
const _3725f096 = () => interopDefault(import('..\\pages\\laporan\\index.vue' /* webpackChunkName: "pages/laporan/index" */))
const _61062faa = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _56166994 = () => interopDefault(import('..\\pages\\m\\index.vue' /* webpackChunkName: "pages/m/index" */))
const _ff42d434 = () => interopDefault(import('..\\pages\\outlet\\index.vue' /* webpackChunkName: "pages/outlet/index" */))
const _175ada91 = () => interopDefault(import('..\\pages\\setting\\index.vue' /* webpackChunkName: "pages/setting/index" */))
const _23f2b1a1 = () => interopDefault(import('..\\pages\\m\\item\\index.vue' /* webpackChunkName: "pages/m/item/index" */))
const _714024b5 = () => interopDefault(import('..\\pages\\m\\laporan\\index.vue' /* webpackChunkName: "pages/m/laporan/index" */))
const _1fbe0cab = () => interopDefault(import('..\\pages\\m\\login.vue' /* webpackChunkName: "pages/m/login" */))
const _402de1e7 = () => interopDefault(import('..\\pages\\m\\outlet\\index.vue' /* webpackChunkName: "pages/m/outlet/index" */))
const _11ba3d92 = () => interopDefault(import('..\\pages\\m\\setting.vue' /* webpackChunkName: "pages/m/setting" */))
const _5dc9320f = () => interopDefault(import('..\\pages\\m\\outlet\\_id.vue' /* webpackChunkName: "pages/m/outlet/_id" */))
const _63764c64 = () => interopDefault(import('..\\pages\\outlet\\_id.vue' /* webpackChunkName: "pages/outlet/_id" */))
const _d142e6da = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/item",
    component: _d7234d40,
    name: "item"
  }, {
    path: "/laporan",
    component: _3725f096,
    name: "laporan"
  }, {
    path: "/login",
    component: _61062faa,
    name: "login"
  }, {
    path: "/m",
    component: _56166994,
    name: "m"
  }, {
    path: "/outlet",
    component: _ff42d434,
    name: "outlet"
  }, {
    path: "/setting",
    component: _175ada91,
    name: "setting"
  }, {
    path: "/m/item",
    component: _23f2b1a1,
    name: "m-item"
  }, {
    path: "/m/laporan",
    component: _714024b5,
    name: "m-laporan"
  }, {
    path: "/m/login",
    component: _1fbe0cab,
    name: "m-login"
  }, {
    path: "/m/outlet",
    component: _402de1e7,
    name: "m-outlet"
  }, {
    path: "/m/setting",
    component: _11ba3d92,
    name: "m-setting"
  }, {
    path: "/m/outlet/:id",
    component: _5dc9320f,
    name: "m-outlet-id"
  }, {
    path: "/outlet/:id",
    component: _63764c64,
    name: "outlet-id"
  }, {
    path: "/",
    component: _d142e6da,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
