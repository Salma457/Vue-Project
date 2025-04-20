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
              active-class="active"
            >
              Personal Info
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/profile/my-adventures" 
              class="nav-link" 
              active-class="active"
            >
              My Adventures
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/profile/booked" 
              class="nav-link" 
              active-class="active"
            >
              Booked Adventures
            </router-link>
          </li>
        </ul>

        <!-- Router View for Tab Content -->
        <router-view></router-view>
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
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.nav-tabs .nav-link {
  color: #495057;
  border: none;
  padding: 12px 20px;
  font-weight: 500;
}

.nav-tabs .nav-link.active {
  color: #2f80ed;
  border-bottom: 2px solid #2f80ed;
  background: none;
}

.nav-tabs .nav-link:hover:not(.active) {
  border: none;
  background-color: #f8f9fa;
}
</style> 