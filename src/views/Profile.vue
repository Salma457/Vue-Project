<template>
  <div>
    <Navbar />
    <div class="profile-container">
      <div class="container mt-4">
        <h2 class="mb-4">My Profile</h2>
        
        <!-- Tab Navigation -->
        <ul class="nav nav-tabs mb-4">
          <li class="nav-item">
            <router-link 
              to="/profile/info" 
              class="nav-link" 
              :class="{ active: $route.path === '/profile/info' }"
            >
              <i class="bi bi-person me-2"></i>Personal Info
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/profile/my-adventures" 
              class="nav-link" 
              :class="{ active: $route.path === '/profile/my-adventures' }"
            >
              <i class="bi bi-compass me-2"></i>My Adventures
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/profile/booked" 
              class="nav-link" 
              :class="{ active: $route.path === '/profile/booked' }"
            >
              <i class="bi bi-calendar-check me-2"></i>Booked Adventures
            </router-link>
          </li>
        </ul>

        <!-- Router View for Tab Content -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Profile',
  components: {
    Navbar
  },
  created() {
    // If no user is logged in, redirect to login
    if (!localStorage.getItem('currentUser')) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 80px);
}

.nav-tabs {
  border-bottom: 2px solid #dee2e6;
}

.nav-tabs .nav-link {
  color: #495057;
  border: none;
  padding: 12px 20px;
  font-weight: 500;
  position: relative;
}

.nav-tabs .nav-link.active {
  color: #ff5a5f;
  background: none;
  border: none;
}

.nav-tabs .nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ff5a5f;
}

.nav-tabs .nav-link:hover:not(.active) {
  border: none;
  color: #ff5a5f;
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 