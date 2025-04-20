<template>
  <div class="my-adventures">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3>My Added Adventures</h3>
      <router-link to="/add-adventure" class="btn btn-primary">
        Add New Adventure
      </router-link>
    </div>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="adventures.length === 0" class="text-center">
      <p class="text-muted">You haven't added any adventures yet.</p>
      <router-link to="/add-adventure" class="btn btn-outline-primary">
        Create Your First Adventure
      </router-link>
    </div>

    <div v-else class="row g-4">
      <div v-for="adventure in adventures" :key="adventure.id" class="col-md-6 col-lg-4">
        <div class="card h-100">
          <img 
            :src="adventure.image || 'https://via.placeholder.com/300x200'" 
            class="card-img-top" 
            :alt="adventure.title"
            style="height: 200px; object-fit: cover;"
          >
          <div class="card-body">
            <h5 class="card-title">{{ adventure.title }}</h5>
            <p class="card-text text-muted">{{ adventure.subtitle }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-primary">{{ adventure.difficulty }}</span>
              <span class="text-muted">{{ adventure.duration }}</span>
            </div>
          </div>
          <div class="card-footer bg-white border-top-0">
            <div class="d-flex justify-content-between">
              <button 
                class="btn btn-outline-primary btn-sm"
                @click="editAdventure(adventure.id)"
              >
                Edit
              </button>
              <button 
                class="btn btn-outline-danger btn-sm"
                @click="deleteAdventure(adventure.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { adventureStore } from '@/stores/adventureStore'

export default {
  name: 'MyAdventures',
  data() {
    return {
      adventures: [],
      loading: true
    }
  },
  async mounted() {
    try {
      await this.loadMyAdventures()
    } catch (error) {
      console.error('Error loading adventures:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async loadMyAdventures() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (!currentUser) return

      // Get all adventures and filter by current user
      await adventureStore.fetchAdventures()
      this.adventures = adventureStore.adventures.filter(
        adv => adv.hostId === currentUser.id
      )
    },
    editAdventure(id) {
      this.$router.push(`/edit-adventure/${id}`)
    },
    async deleteAdventure(id) {
      if (!confirm('Are you sure you want to delete this adventure?')) return

      try {
        // Add delete functionality here
        await adventureStore.deleteAdventure(id)
        await this.loadMyAdventures()
      } catch (error) {
        console.error('Error deleting adventure:', error)
        alert('Failed to delete adventure. Please try again.')
      }
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card:hover {
  transform: translateY(-5px);
}

.btn-sm {
  padding: 0.25rem 1rem;
}
</style> 