import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw, RouterOptions} from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: () => import('../views/homeBackup/home.vue'),
    redirect: '/platformAuth',
    children: [
      {
        path: '/platformAuth',
        component: () => import('../views/homeBackup/authorize/authorize.vue')
      },
      {
        path: '/platformConfig',
        component: () => import('../views/homeBackup/config/config.vue')
      },
      {
        path: '/platformLogcat',
        component: () => import('../views/homeBackup/logcat/logcat.vue')
      },
      {
        path: '/platformInfo',
        component: () => import('../views/homeBackup/about/about.vue')
      },
      {
        path: '/authAgreement',
        component: () => import('../views/homeBackup/authorize/authAgrement.vue')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/privacyAgreement',
    component: () => import('../views/login/privacy-agreement.vue')
  },
  {
    path: '/selectPhoneBrand',
    component: () => import('../views/select-phone-brand/select-phone-brand.vue')
  },
  {
    path: '/installStep',
    component: () => import('../views/install-steps/install-steps.vue')
  },
  {
    path: '/installFinish',
    component: () => import('../views/install-steps/install-finish/install-finish.vue')
  },
  {
    path: '/welcomePage',
    component: () => import('../views/welcome-page/welcome-page.vue')
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
} as RouterOptions)
