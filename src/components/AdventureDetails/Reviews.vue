<template>
    <div class="container my-4">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <!-- Reviews Header -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="mb-0">
              <i class="bi bi-chat-square-text-fill text-primary"></i> Reviews
            </h3>
            <span class="badge bg-primary rounded-pill">
              {{ reviews.length }} {{ reviews.length === 1 ? 'Review' : 'Reviews' }}
            </span>
          </div>
  
          <!-- Add New Review Form -->
          <div class="mb-4 p-3 bg-light rounded">
            <h5>Add Your Review</h5>
            <form @submit.prevent="submitReview">
              <div class="mb-3">
                <label class="form-label">Rating</label>
                <div class="star-rating">
                  <i v-for="star in 5" :key="star" 
                     class="bi fs-4 me-1" 
                     :class="[star <= newReview.rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary']"
                     @click="newReview.rating = star"
                     style="cursor: pointer"></i>
                </div>
              </div>
              <div class="mb-3">
                <textarea v-model="newReview.comment" 
                          class="form-control" 
                          rows="3" 
                          placeholder="Share your experience..."
                          required></textarea>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                <span v-if="isSubmitting">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Submitting...
                </span>
                <span v-else>Submit Review</span>
              </button>
            </form>
          </div>
  
          <!-- No Reviews Message -->
          <div v-if="reviews.length === 0" class="text-center py-4">
            <i class="bi bi-emoji-frown fs-1 text-muted"></i>
            <h4 class="text-muted mt-2">No Reviews Yet!</h4>
            <p class="text-muted">Be the first to share your experience</p>
          </div>
  
          <!-- Reviews List -->
          <div v-else>
            <div v-for="review in reviews" :key="review.id" class="mb-4 pb-3 border-bottom">
              <div class="d-flex">
                <div class="flex-shrink-0 me-3">
                  <img :src="review.authorImage || 'https://via.placeholder.com/60'" 
                       class="rounded-circle" 
                       width="60" 
                       height="60"
                       :alt="`${review.author}'s avatar`">
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="mb-0">{{ review.author }}</h5>
                    <small class="text-muted">{{ formatDate(review.date) }}</small>
                  </div>
                  <div class="mb-2">
                    <i v-for="star in 5" :key="star" 
                       class="bi" 
                       :class="[star <= review.rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary']"></i>
                  </div>
                  <p class="mb-0">{{ review.comment }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        reviews: [],
        newReview: {
          rating: 0,
          comment: '',
          adventureId: null
        },
        isSubmitting: false
      }
    },
    props: ["fullInfo"],
    methods: {
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
      },
      async loadReviews() {
        try {
          const response = await fetch(`http://localhost:5000/reviews?adventureId=${this.fullInfo.id}`)
          this.reviews = await response.json()
        } catch (error) {
          console.error("Error loading reviews:", error)
        }
      },
      async submitReview() {
        this.isSubmitting = true
        try {
          const currentUser = JSON.parse(localStorage.getItem('currentUser'))
          
          const reviewData = {
            adventureId: this.fullInfo.id,
            author: currentUser?.name || 'Anonymous',
            rating: this.newReview.rating,
            comment: this.newReview.comment,
            date: new Date().toISOString().split('T')[0],
            authorImage: currentUser?.image || `https://ui-avatars.com/api/?name=${currentUser?.name || 'A'}&background=random`
          }
  
          const response = await fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
          })
  
          if (response.ok) {
            this.newReview = { rating: 0, comment: '', adventureId: null }
            await this.loadReviews() // Refresh the reviews list
          }
        } catch (error) {
          console.error("Error submitting review:", error)
        } finally {
          this.isSubmitting = false
        }
      }
    },
    async created() {
      await this.loadReviews()
      this.newReview.adventureId = this.fullInfo.id
    }
  }
</script>
  
<style scoped>
  .star-rating {
    display: inline-flex;
    align-items: center;
  }
  .bi-star-fill, .bi-star {
    font-size: 1.5rem;
    margin-right: 0.2rem;
  }
  .border-bottom {
    border-color: rgba(0,0,0,0.1) !important;
  }
</style>