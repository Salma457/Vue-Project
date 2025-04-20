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
        <section class="mb-3 p-3 border-bottom">
          <Reviews :fullInfo="fullInfo" />
        </section>
      </div>

      <div class="col-lg-5 col-md-5">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h4 class="card-title mb-4">Book This Adventure</h4>
            
            <div class="mb-4">
              <h5 class="text-primary">${{ fullInfo.price }}</h5>
              <p class="text-muted mb-0">per person</p>
            </div>

            <div class="mb-4">
              <label class="form-label">Select Date</label>
              <input type="date" class="form-control" v-model="selectedDate">
            </div>

            <div class="mb-4">
              <label class="form-label">Number of Guests</label>
              <input type="number" class="form-control" v-model="guestCount" min="1" :max="fullInfo.groupSize">
              <small class="text-muted">Maximum group size: {{ fullInfo.groupSize }}</small>
            </div>

            <button class="btn btn-primary w-100" @click="bookAdventure" :disabled="!canBook">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Reviews from './Reviews.vue'

export default {
  name: 'AdventureFullView',
  components: {
    Reviews
  },
  props: {
    fullInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedDate: '',
      guestCount: 1
    }
  },
  computed: {
    canBook() {
      return this.selectedDate && this.guestCount > 0 && this.guestCount <= this.fullInfo.groupSize
    }
  },
  methods: {
    bookAdventure() {
      // Implement booking logic here
      console.log('Booking adventure:', {
        date: this.selectedDate,
        guests: this.guestCount
      })
    }
  }
}
</script>

<style scoped>
.border-bottom {
  border-color: rgba(0,0,0,0.1) !important;
}
</style>
