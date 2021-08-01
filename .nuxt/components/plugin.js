import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  LeftSidebar: () => import('../..\\components\\left-sidebar.vue' /* webpackChunkName: "components/left-sidebar" */).then(c => wrapFunctional(c.default || c)),
  RightSidebarCalendar: () => import('../..\\components\\right-sidebar-calendar.vue' /* webpackChunkName: "components/right-sidebar-calendar" */).then(c => wrapFunctional(c.default || c)),
  RightSidebar: () => import('../..\\components\\right-sidebar.vue' /* webpackChunkName: "components/right-sidebar" */).then(c => wrapFunctional(c.default || c)),
  DashboardOutletOverviewMobile: () => import('../..\\components\\dashboard\\outlet-overview-mobile.vue' /* webpackChunkName: "components/dashboard-outlet-overview-mobile" */).then(c => wrapFunctional(c.default || c)),
  DashboardOutletOverview: () => import('../..\\components\\dashboard\\outlet-overview.vue' /* webpackChunkName: "components/dashboard-outlet-overview" */).then(c => wrapFunctional(c.default || c)),
  ItemSummary: () => import('../..\\components\\item\\item-summary.vue' /* webpackChunkName: "components/item-summary" */).then(c => wrapFunctional(c.default || c)),
  MobileItemSummaryMobile: () => import('../..\\components\\mobile\\item-summary-mobile.vue' /* webpackChunkName: "components/mobile-item-summary-mobile" */).then(c => wrapFunctional(c.default || c)),
  MobileOutletSummaryMobile: () => import('../..\\components\\mobile\\outlet-summary-mobile.vue' /* webpackChunkName: "components/mobile-outlet-summary-mobile" */).then(c => wrapFunctional(c.default || c)),
  MobileSidebarMenu: () => import('../..\\components\\mobile\\sidebar-menu.vue' /* webpackChunkName: "components/mobile-sidebar-menu" */).then(c => wrapFunctional(c.default || c)),
  OutletSummary: () => import('../..\\components\\outlet\\outlet-summary.vue' /* webpackChunkName: "components/outlet-summary" */).then(c => wrapFunctional(c.default || c)),
  SettingChangePasswordMobile: () => import('../..\\components\\setting\\change-password-mobile.vue' /* webpackChunkName: "components/setting-change-password-mobile" */).then(c => wrapFunctional(c.default || c)),
  SettingChangePassword: () => import('../..\\components\\setting\\change-password.vue' /* webpackChunkName: "components/setting-change-password" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
