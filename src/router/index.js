import { createRouter, createWebHashHistory  } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory (import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:stationIndex',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:stationIndex/bill',
      name: 'bill',
      component: () => import('../views/billView.vue')
    },
  ]
})

export default router
