<template>
  <div class="personal-info">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 text-center mb-4">
            <div class="avatar-container mb-3">
              <img 
                :src="userData.avatar || 'https://via.placeholder.com/150'" 
                alt="Profile Avatar" 
                class="rounded-circle avatar"
              >
            </div>
            <button class="btn btn-outline-primary btn-sm">Change Avatar</button>
          </div>
          <div class="col-md-8">
            <form @submit.prevent="updateProfile">
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="userData.fullName"
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  v-model="userData.email"
                  readonly
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Phone</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  v-model="userData.phone"
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Location</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="userData.location"
                >
              </div>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfo',
  data() {
    return {
      userData: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        avatar: ''
      }
    }
  },
  mounted() {
    // Load user data from localStorage or your backend
    const user = JSON.parse(localStorage.getItem('currentUser')) || {}
    this.userData = {
      ...this.userData,
      ...user
    }
  },
  methods: {
    updateProfile() {
      // Update user data in localStorage or your backend
      localStorage.setItem('currentUser', JSON.stringify(this.userData))
      // Show success message
      alert('Profile updated successfully!')
    }
  }
}
</script>

<style scoped>
.avatar-container {
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 3px solid #f8f9fa;
}

.card {
  border: none;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}
</style> 