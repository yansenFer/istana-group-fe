import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginAdminView from '@/views/LoginAdminView.vue'
import Cookies from 'universal-cookie'
import UserView from '@/views/admin/user/UserView.vue'
import FormUserView from '@/views/admin/user/FormUserView.vue'
import ProductView from '@/views/admin/products/ProductView.vue'
import FormProductView from '@/views/admin/products/FormProductView.vue'
import ProductListView from '@/views/user/ProductListView.vue'
import DetailProductView from '@/views/user/DetailProductView.vue'

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
    {
      path: '/user/create-user',
      name: 'create user',
      component: FormUserView,
    },
    {
      path: '/user/edit-user/:id',
      name: 'edit user',
      component: FormUserView,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/product/create-products',
      name: 'create product',
      component: FormProductView,
    },
    {
      path: '/product/edit-product/:id',
      name: 'edit product',
      component: FormProductView,
    },
    {
      path: '/shop/product',
      name: 'shop product',
      component: ProductListView,
    },
    {
      path: '/shop/product/detail/:id',
      name: 'shop product detail',
      component: DetailProductView,
    },
  ],
})

// Middleware Auth
router.beforeEach((to, from, next) => {
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('auth')

  if (!to.name?.toString().includes('shop')) {
    if (to.name !== 'login' && !token) {
      return router.replace({ path: '/login-admin' })
    }

    if (to.name === 'Login' && token) {
      return router.replace({ name: 'home' })
    }
  }

  next()
})

export default router
