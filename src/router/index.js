import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import tour from '../pages/tour.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const requireAuth = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) next();
  else next("/login");
};

const routes = [
  { path: '', name: 'Home', component: Home},

  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/tour", name: "tour", component: tour },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
