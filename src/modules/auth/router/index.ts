import { RouteConfig } from 'vue-router'

const authRouters: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
    name: 'login',
    meta: {
      isNotLogin: true
    }
  },
  {
    path: '/verify/phone',
    component: () => import('../views/LoginPage.vue'),
    name: 'verify-phone',
    meta: {
      isNotLogin: true
    }
  },
  {
    path: '/verify/email',
    component: () => import('../views/LoginPage.vue'),
    name: 'verify-email',
    meta: {
      isNotLogin: true
    }
  },
  {
    path: '/verify/app',
    component: () => import('../views/LoginPage.vue'),
    name: 'verify-app',
    meta: {
      isNotLogin: true
    }
  }
  // {
  //   path: '/verify/phone-number',
  //   component: () => import('../views/VerifyPhone.vue'),
  //   name: 'verify-phone-number',
  //   meta: {
  //     isNotLogin: true
  //   }
  // },
  // {
  //   path: '/signup',
  //   component: () => import('../views/SignUpPage.vue'),
  //   name: 'sign-up',
  //   meta: {
  //     isNotLogin: true
  //   }
  // },
  // {
  //   path: '/signup/referrerCode/:code',
  //   component: () => import('../views/SignUpPage.vue'),
  //   name: 'sign-up-ref',
  //   meta: {
  //     isNotLogin: true
  //   }
  // },
  // {
  //   path: '/forgot',
  //   component: () => import('../views/ForgotPassword.vue'),
  //   name: 'forgot-password',
  //   meta: {
  //     isNotLogin: true
  //   }
  // },
  // {
  //   path: '/reset-password',
  //   component: () => import('../views/ResetPassword.vue'),
  //   name: 'reset-password',
  //   meta: {
  //     isNotLogin: true
  //   }
  // }
]

export default authRouters
