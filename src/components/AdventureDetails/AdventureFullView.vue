<template>
  <div class="container">
    <div class="row py-4 border border-3 bg-body-secondary">

      <div class="col-lg-7 col-md-7 text-start">
        <!-- Summary  -->
        <section class="mb-2 p-3 border-bottom ">
          <h5 class="mb-4 pb-2 ">SUMMARY</h5>
          <p class="lh-base">{{ fullInfo.summary }}</p>
        </section>

        <!-- availability -->
        <section class="mb-3 p-3 border-bottom" v-if="fullInfo.availability">
          <h5 class="mb-4 pb-2">AVAILABILITY</h5>
          <p class=" lh-base">{{ fullInfo.availability }}</p>
        </section>
        
        <!-- ITINERARY -->
        <section class="mb-3 p-3 border-bottom">
          <h5 class="mb-4  pb-2">ITINERARY</h5>
          <div v-for="(day, index) in fullInfo.itinerary" :key="index">
            <p class="fs-6 fw-bold lh-base">{{ day.day }}</p>
            <p class="fs-6 lh-base">{{ day.description }}</p>
          </div>
        </section>

        <!-- Gallery -->
        <section class="mb-3 p-3 border-bottom" v-if="fullInfo.gallery">
          <h5 class="mb-4 pb-2">PHOTOS</h5>
          <div class="row">
            <div class="col-2" v-for="(photo, index) in fullInfo.gallery" :key="index">
              <img :src="photo" class="img-fluid rounded" :alt="'Gallery image ' + (index + 1)" style="height: 100px; object-fit: cover;">
            </div>
          </div>
        </section>

        <!-- Location -->
        <section class="mb-3 p-3 border-bottom">
          <h5 class="mb-4 pb-2">LOCATION</h5>
          <div class="ratio ratio-16x9">
            <iframe 
              src="https://www.openstreetmap.org/export/embed.html?bbox=18.3656,-34.0718,18.4824,-33.8781&layer=mapnik&marker=-33.9249,18.4241" 
              class="border-0 w-100 h-100 rounded"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <small class="text-muted mt-2 d-block">
            Meeting point: {{ fullInfo.meetingPoint || 'not added' }}
          </small>
        </section>

        <!-- Reviews -->
        <section class="mb-3 p-3 border-bottom" v-if="fullInfo.reviews && fullInfo.reviews.length">
          <h5 class="mb-4 pb-2">REVIEWS</h5>
          <div v-for="(review, index) in fullInfo.reviews" :key="index" class="mb-3">
            <div class="d-flex align-items-center mb-1">
              <strong class="me-2">{{ review.reviewer }}</strong>
              <span class="text-warning">
                <i class="fas fa-star" v-for="n in review.rating" :key="n"></i>
              </span>
            </div>
            <p class="lh-base mb-1">{{ review.comment }}</p>
            <small class="text-muted">{{ review.date }}</small>
          </div>
        </section>
      </div>

      <div class="col-lg-4 col-md-8">
        <div class="booking-card">
          <div class="price-info mb-3">
            <h3 class="mb-2">${{ fullInfo.price }} <small class="text-muted">per person</small></h3>
            <p class="text-muted mb-0">Group size: {{ fullInfo.groupSize }}</p>
            <p class="text-muted">Duration: {{ fullInfo.duration }}</p>
          </div>

          <router-link 
            :to="{ path: '/Book', query: { id: fullInfo.id }}"
            class="btn w-100 text-white fw-bold book-btn"
          >
            Book Now!
          </router-link>

          <div class="mt-3" v-if="!isLoggedIn">
            <p class="text-muted text-center">
              Please <router-link to="/login">login</router-link> to book this adventure
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fullInfo"],
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('currentUser')
    }
  }
}
</script>

<style scoped>
.booking-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.book-btn {
  background-color: #ff5a5f;
  transition: background-color 0.3s;
}

.book-btn:hover {
  background-color: #ff4146;
}

.object-fit-cover {
  object-fit: cover;
}

.nav-tabs .nav-link {
  font-weight: 500;
}

.rounded-circle {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
</style>
