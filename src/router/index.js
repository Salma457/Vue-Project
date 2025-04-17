import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Adventures from '@/views/Adventures.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/adventures',
    name: 'Adventures',
    component: Adventures
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router