<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title mb-4">Book Adventure</h2>
              
              <div v-if="loading" class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div v-else-if="adventure">
                <div class="mb-4">
                  <h4>{{ adventure.title }}</h4>
                  <p class="text-muted">{{ adventure.subtitle }}</p>
                </div>

                <form @submit.prevent="submitBooking">
                  <div class="mb-3">
                    <label class="form-label">Select Date</label>
                    <input 
                      type="date" 
                      class="form-control" 
                      v-model="bookingDate"
                      :min="minDate"
                      required
                    >
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Number of Participants</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="participants"
                      :min="1"
                      :max="adventure.maxGroupSize || 10"
                      required
                    >
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Special Requests</label>
                    <textarea 
                      class="form-control" 
                      v-model="specialRequests"
                      rows="3"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    :disabled="!isLoggedIn"
                  >
                    Confirm Booking
                  </button>

                  <div v-if="!isLoggedIn" class="alert alert-warning mt-3">
                    Please <router-link to="/login">login</router-link> to book this adventure.
                  </div>
                </form>
              </div>

              <div v-else class="alert alert-danger">
                Adventure not found. Please try again.
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card" v-if="adventure">
            <div class="card-body">
              <h5 class="card-title">Booking Summary</h5>
              <div class="d-flex justify-content-between mb-2">
                <span>Adventure:</span>
                <span>{{ adventure.title }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Price per person:</span>
                <span>${{ adventure.price }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Participants:</span>
                <span>{{ participants }}</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${{ totalPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { adventureStore } from '@/stores/adventureStore'

export default {
  name: 'Book',
  components: {
    Navbar
  },
  data() {
    return {
      adventure: null,
      bookingDate: '',
      participants: 1,
      specialRequests: '',
      loading: true
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('currentUser')
    },
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    totalPrice() {
      if (!this.adventure) return 0
      return (this.adventure.price || 0) * this.participants
    }
  },
  async mounted() {
    try {
      // Get the adventure ID from the query parameters
      const adventureId = this.$route.query.id
      if (!adventureId) {
        throw new Error('No adventure ID provided')
      }

      // Fetch the adventure details
      this.adventure = await adventureStore.getAdventure(adventureId)
    } catch (error) {
      console.error('Error loading adventure:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async submitBooking() {
      if (!this.isLoggedIn) {
        this.$router.push('/login')
        return
      }

      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        const bookingData = {
          userId: currentUser.id,
          adventureId: this.adventure.id,
          adventureDate: this.bookingDate,
          participants: this.participants,
          specialRequests: this.specialRequests,
          totalPrice: this.totalPrice,
          status: 'pending',
          bookingDate: new Date().toISOString()
        }

        const response = await fetch('http://localhost:5000/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        })

        if (!response.ok) {
          throw new Error('Failed to create booking')
        }

        // Redirect to booked adventures page
        this.$router.push('/profile/booked')
      } catch (error) {
        console.error('Error creating booking:', error)
        alert('Failed to create booking. Please try again.')
      }
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: none;
}
</style>