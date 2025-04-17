import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Adventures from '@/views/Adventures.vue'
import Host from '@/views/host.vue'
import HostDetails from '@/views/Details.vue'


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
  },
   {
    path: '/Host',
    name: 'host',
    component: Host
  },
   {
    path: '/details',
    name: 'HostDetails',
    component: HostDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
