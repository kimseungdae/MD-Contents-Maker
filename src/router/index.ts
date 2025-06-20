import { createRouter, createWebHistory } from 'vue-router'
import ProblemList from '@/views/ProblemList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/problems'
    },
    {
      path: '/problems',
      name: 'problems',
      component: ProblemList
    },
    {
      path: '/problems/new',
      name: 'problem-new',
      component: () => import('@/views/ProblemEditor.vue')
    },
    {
      path: '/problems/:id/edit',
      name: 'problem-edit',
      component: () => import('@/views/ProblemEditor.vue')
    },
    {
      path: '/problems/:id/preview',
      name: 'problem-preview',
      component: () => import('@/views/ProblemPlayer.vue')
    }
  ]
})

export default router