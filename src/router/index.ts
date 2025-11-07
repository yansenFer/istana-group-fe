import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginAdminView from '@/views/LoginAdminView.vue'
import Cookies from 'universal-cookie'
import UserView from '@/views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login-admin',
      name: 'login',
      component: LoginAdminView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
    },
  ],
})

// Middleware Auth
router.beforeEach((to, from, next) => {
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('auth')
  console.log('trigger')

  if (to.name !== 'login' && !token) {
    console.log('trigger 1')
    return router.replace({ path: '/login-admin' })
  }

  if (to.name === 'Login' && token) {
    console.log('trigger 2')
    return router.replace({ name: 'Home' })
  }

  next()
})

export default router
