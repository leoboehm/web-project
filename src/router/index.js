import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useCategoryStore } from '@/store/CategoryStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue'),
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizView.vue'),
    },
  ],
  scrollBehavior(to) {
    // if there's a hash, scroll to the element with that id
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // scroll to the top of the page
    return { top: 0 }
  },
})

router.beforeEach((to, from) => {
  const categoryStore = useCategoryStore()
  if (to.name != 'quiz') {
    categoryStore.actionClearSelectedCategory()
  }

  return
})

export default router
