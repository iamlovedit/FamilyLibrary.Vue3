import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('../views/FamilyLibraryView.vue')
    },
    {
      path: '/packages',
      component: () => import('../views/packages/PackagesHome.vue'),
      children: [
        {
          path: '',
          name: 'packages',
          component: () => import('../views/packages/PackagesTable.vue')
        },
        {
          path: ':id',
          name: 'packagesDetail',
          component: () => import('../views/packages/PackageDetail.vue')
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('../views/packages/PackageSearch.vue')
        }
      ]
    }
  ]
})

export default router
