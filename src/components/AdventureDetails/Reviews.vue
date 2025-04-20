<template>
  <div class="container my-4 text-start">
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <!-- Reviews Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="mb-0">Reviews</h3>
          <span class="badge bg-primary rounded-pill">
            {{ reviews.length }} {{ reviews.length === 1 ? 'Review' : 'Reviews' }}
          </span>
        </div>

        <!-- Add New Review Form -->
        <div class="mb-4 p-3 bg-light rounded">
          <h5>Add Your Review</h5>
          <form @submit.prevent="submitReview">
            <div class="mb-3">
              <label class="form-label">Rating</label><br>
              <div class="star-rating">
                <span v-for="star in 5"
                      :key="star"
                      @click="newReview.rating = star"
                      style="font-size: 1.5rem; cursor: pointer"
                      :style="{ color: star <= newReview.rating ? 'gold' : '#ccc' }">
                  {{ (star <= newReview.rating) ? '★' : '☆' }}
                </span>
                <span class="ms-2">{{ newReview.rating }}/5</span>
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
                <div class="mb-2 star-rating d-flex align-items-center">
                  <span v-for="star in 5"
                        :key="star"
                        style="font-size: 1.25rem"
                        :style="{ color: star <= review.rating ? 'gold' : '#ccc' }">
                    {{ star <= review.rating ? '★' : '☆' }}
                  </span>
                  <span class="ms-2">{{ review.rating }}/5</span>
                </div>
                <p class="mb-1">{{ review.comment }}</p>

                <!-- Show delete button if current user is author -->
                <button v-if="isCurrentUser(review.author)"
                        class="btn btn-sm btn-outline-danger mt-1"
                        @click="deleteReview(review.id)">
                  Delete
                </button>
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
      isSubmitting: false,
      currentUser: null
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
        const reviewData = {
          adventureId: this.fullInfo.id,
          author: this.currentUser?.name || 'Anonymous',
          rating: this.newReview.rating,
          comment: this.newReview.comment,
          date: new Date().toISOString().split('T')[0],
          authorImage: this.currentUser?.image || `https://ui-avatars.com/api/?name=${this.currentUser?.name || 'A'}&background=random`
        }

        await fetch('http://localhost:5000/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reviewData)
        })

        this.newReview = { rating: 0, comment: '', adventureId: null }
        await this.loadReviews()
      } catch (error) {
        console.error("Error submitting review:", error)
      } finally {
        this.isSubmitting = false
      }
    },
    isCurrentUser(authorName) {
      return this.currentUser?.name === authorName
    },
    async deleteReview(id) {
      try {
        await fetch(`http://localhost:5000/reviews/${id}`, {
          method: 'DELETE'
        })
        await this.loadReviews()
      } catch (error) {
        console.error("Error deleting review:", error)
      }
    }
  },
  async created() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    await this.loadReviews()
  }
}
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
}
.border-bottom {
  border-color: rgba(0, 0, 0, 0.1) !important;
}
</style>
