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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('../views/FamilyLibraryView.vue'),
      children: [
        {
          path: '',
          name: 'libraryHome',
          component: () => import('../views/families/FamiliesHome.vue')
        },
        {
          path: ':id',
          name: 'familyDetail',
          component: () => import('../views/families/FamilyDetail.vue')
        },
        {
          path: 'search',
          name: 'familySearch',
          component: () => import('../views/families/FamiliesSearch.vue')
        }
      ]
    },
    {
      path: '/packages',
      name: 'packageHome',
      component: () => import('../views/packages/PackagesHome.vue'),
      children: [
        {
          path: '',
          name: 'packages',
          component: () => import('../views/packages/PackagesBrowser.vue')
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
