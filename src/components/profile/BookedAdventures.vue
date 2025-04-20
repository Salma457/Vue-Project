<template>
  <div class="booked-adventures">
    <h3 class="mb-4">My Booked Adventures</h3>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="bookedAdventures.length === 0" class="text-center">
      <p class="text-muted">You haven't booked any adventures yet.</p>
      <router-link to="/adventures" class="btn btn-outline-primary">
        Explore Adventures
      </router-link>
    </div>

    <div v-else class="row g-4">
      <div v-for="booking in bookedAdventures" :key="booking.id" class="col-md-6 col-lg-4">
        <div class="card h-100">
          <img 
            :src="booking.adventure.image || 'https://via.placeholder.com/300x200'" 
            class="card-img-top" 
            :alt="booking.adventure.title"
            style="height: 200px; object-fit: cover;"
          >
          <div class="card-body">
            <h5 class="card-title">{{ booking.adventure.title }}</h5>
            <p class="card-text text-muted">{{ booking.adventure.subtitle }}</p>
            
            <div class="booking-details mt-3">
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Booking Date:</span>
                <span>{{ formatDate(booking.bookingDate) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Adventure Date:</span>
                <span>{{ formatDate(booking.adventureDate) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Status:</span>
                <span :class="getStatusClass(booking.status)">
                  {{ booking.status }}
                </span>
              </div>
            </div>
          </div>
          <div class="card-footer bg-white border-top-0">
            <div class="d-flex justify-content-between">
              <router-link 
                :to="`/adventures/${booking.adventure.id}`" 
                class="btn btn-outline-primary btn-sm"
              >
                View Details
              </router-link>
              <button 
                v-if="canCancel(booking)"
                @click="cancelBooking(booking.id)"
                class="btn btn-outline-danger btn-sm"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookedAdventures',
  data() {
    return {
      bookedAdventures: [],
      loading: true
    }
  },
  async mounted() {
    try {
      await this.loadBookedAdventures()
    } catch (error) {
      console.error('Error loading booked adventures:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async loadBookedAdventures() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (!currentUser) return

      try {
        const response = await fetch(`http://localhost:5000/bookings?userId=${currentUser.id}`)
        const bookings = await response.json()
        
        // Fetch adventure details for each booking
        const bookingsWithDetails = await Promise.all(
          bookings.map(async booking => {
            const adventureResponse = await fetch(`http://localhost:5000/adventures/${booking.adventureId}`)
            const adventure = await adventureResponse.json()
            return { ...booking, adventure }
          })
        )
        
        this.bookedAdventures = bookingsWithDetails
      } catch (error) {
        console.error('Error:', error)
        throw error
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    getStatusClass(status) {
      const classes = {
        'confirmed': 'text-success',
        'pending': 'text-warning',
        'cancelled': 'text-danger',
        'completed': 'text-info'
      }
      return classes[status.toLowerCase()] || 'text-muted'
    },
    canCancel(booking) {
      return ['confirmed', 'pending'].includes(booking.status.toLowerCase())
    },
    async cancelBooking(bookingId) {
      if (!confirm('Are you sure you want to cancel this booking?')) return

      try {
        const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'cancelled'
          })
        })

        if (!response.ok) throw new Error('Failed to cancel booking')
        
        await this.loadBookedAdventures()
      } catch (error) {
        console.error('Error cancelling booking:', error)
        alert('Failed to cancel booking. Please try again.')
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

.booking-details {
  font-size: 0.9rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.btn-sm {
  padding: 0.25rem 1rem;
}
</style> 