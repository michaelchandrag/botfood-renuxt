import { wrapFunctional } from './utils'

export { default as LeftSidebar } from '../..\\components\\left-sidebar.vue'
export { default as RightSidebarCalendar } from '../..\\components\\right-sidebar-calendar.vue'
export { default as RightSidebar } from '../..\\components\\right-sidebar.vue'
export { default as DashboardOutletOverviewMobile } from '../..\\components\\dashboard\\outlet-overview-mobile.vue'
export { default as DashboardOutletOverview } from '../..\\components\\dashboard\\outlet-overview.vue'
export { default as ItemSummary } from '../..\\components\\item\\item-summary.vue'
export { default as MobileItemSummaryMobile } from '../..\\components\\mobile\\item-summary-mobile.vue'
export { default as MobileOutletSummaryMobile } from '../..\\components\\mobile\\outlet-summary-mobile.vue'
export { default as MobileSidebarMenu } from '../..\\components\\mobile\\sidebar-menu.vue'
export { default as OutletSummary } from '../..\\components\\outlet\\outlet-summary.vue'
export { default as SettingChangePasswordMobile } from '../..\\components\\setting\\change-password-mobile.vue'
export { default as SettingChangePassword } from '../..\\components\\setting\\change-password.vue'

export const LazyLeftSidebar = import('../..\\components\\left-sidebar.vue' /* webpackChunkName: "components/left-sidebar" */).then(c => wrapFunctional(c.default || c))
export const LazyRightSidebarCalendar = import('../..\\components\\right-sidebar-calendar.vue' /* webpackChunkName: "components/right-sidebar-calendar" */).then(c => wrapFunctional(c.default || c))
export const LazyRightSidebar = import('../..\\components\\right-sidebar.vue' /* webpackChunkName: "components/right-sidebar" */).then(c => wrapFunctional(c.default || c))
export const LazyDashboardOutletOverviewMobile = import('../..\\components\\dashboard\\outlet-overview-mobile.vue' /* webpackChunkName: "components/dashboard-outlet-overview-mobile" */).then(c => wrapFunctional(c.default || c))
export const LazyDashboardOutletOverview = import('../..\\components\\dashboard\\outlet-overview.vue' /* webpackChunkName: "components/dashboard-outlet-overview" */).then(c => wrapFunctional(c.default || c))
export const LazyItemSummary = import('../..\\components\\item\\item-summary.vue' /* webpackChunkName: "components/item-summary" */).then(c => wrapFunctional(c.default || c))
export const LazyMobileItemSummaryMobile = import('../..\\components\\mobile\\item-summary-mobile.vue' /* webpackChunkName: "components/mobile-item-summary-mobile" */).then(c => wrapFunctional(c.default || c))
export const LazyMobileOutletSummaryMobile = import('../..\\components\\mobile\\outlet-summary-mobile.vue' /* webpackChunkName: "components/mobile-outlet-summary-mobile" */).then(c => wrapFunctional(c.default || c))
export const LazyMobileSidebarMenu = import('../..\\components\\mobile\\sidebar-menu.vue' /* webpackChunkName: "components/mobile-sidebar-menu" */).then(c => wrapFunctional(c.default || c))
export const LazyOutletSummary = import('../..\\components\\outlet\\outlet-summary.vue' /* webpackChunkName: "components/outlet-summary" */).then(c => wrapFunctional(c.default || c))
export const LazySettingChangePasswordMobile = import('../..\\components\\setting\\change-password-mobile.vue' /* webpackChunkName: "components/setting-change-password-mobile" */).then(c => wrapFunctional(c.default || c))
export const LazySettingChangePassword = import('../..\\components\\setting\\change-password.vue' /* webpackChunkName: "components/setting-change-password" */).then(c => wrapFunctional(c.default || c))
