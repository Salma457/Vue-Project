import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Adventures from '@/views/Adventures.vue'
import HostOverview from '@/views/Overview.vue'
import HostLocation from '@/views/Location.vue'
import HostPhotos from '@/views/Photos.vue'
import HostDetails from '@/views/Details.vue'
import HostItinerary from '@/views/Itinerary.vue'
import HostSubmit from '@/views/Submit.vue'
import Host from '@/views/host.vue'
import AdventureDetails from '@/views/AdventureDetails.vue'
import Book from '@/views/Book.vue'
import Login from '@/components/Login.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import UsersList from '@/components/UsersList.vue'
import error404page from '@/views/error404page.vue'
import AddAdventure from '../views/AddAdventure.vue'
import Profile from '@/views/Profile.vue'
import PersonalInfo from '@/components/profile/PersonalInfo.vue'
import MyAdventures from '@/components/profile/MyAdventures.vue'
import BookedAdventures from '@/components/profile/BookedAdventures.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('@/views/Wishlist.vue')
  },
  {
    path: '/adventures',
    name: 'Adventures',
    component: Adventures,
    props: route => ({ country: route.query.country || '' })
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/profile/info'
      },
      {
        path: 'info',
        name: 'PersonalInfo',
        component: PersonalInfo
      },
      {
        path: 'my-adventures',
        name: 'MyAdventures',
        component: MyAdventures
      },
      {
        path: 'booked',
        name: 'BookedAdventures',
        component: BookedAdventures
      }
    ]
  },
  {
    path: '/overview',
    name: 'HostOverview',
    component: HostOverview
  },
  {
    path: '/Host',
    name: 'host',
    component: Host
  },
  {
    path: '/location',
    name: 'HostLocation',
    component: HostLocation
  },
  {
    path: '/photos',
    name: 'HostPhotos',
    component: HostPhotos
  },
  {
    path: '/add-adventure',
    name: 'AddAdventure',
    component: AddAdventure
  },
  {
    path: '/details',
    name: 'HostDetails',
    component: HostDetails
  },
  {
    path: '/itinerary',
    name: 'HostItinerary',
    component: HostItinerary
  },
  {
    path: '/submit',
    name: 'HostSubmit',
    component: HostSubmit
  },
  {
    path: '/Login',
    name: 'login',
    component: LoginPage
  }, 
  {
    path: '/Register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/users',
    name: 'users',
    component: UsersList
  },
  {
    path: '/host/add',
    name: 'AddAdventure',
    component: () => import('@/views/AddAdventure.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component:  error404page
  }
  
  ,

  {
    path: '/dropdown-debug',
    component: () => import('@/views/DropdownDebug.vue')
  },

  {
    path: '/adventures/:id',
    name: 'AdventureDetails',
    component: () => import('../views/AdventureDetails.vue'),
    props: true
  },
  {
    path: '/Book',
    component: Book
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Add navigation guard for protected routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      next('/login')
      return
    }
  }
  next()
})

export default router