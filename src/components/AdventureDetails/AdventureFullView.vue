<template>
  <div class="row py-4 border border-3 bg-body-secondary">

    <div class="col-8">
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
          <p></p>
        </div>
      </section>

      <!-- Photos & Map -->
      <!-- Gallery -->
      <section class="mb-3 p-3 border-bottom" v-if="fullInfo.gallery">
        <h5 class="mb-4 pb-2">PHOTOS</h5>
        <div class="row ">
          <div class="col-2" v-for="(photo, index) in fullInfo.gallery" :key="index">
            <img :src="photo" class="img-fluid rounded" :alt="'Gallery image ' + (index + 1)" style="height: 100px; object-fit: cover;">
          </div>
        </div>
      </section>


    </div>
  

  </div>
</template>

<script>
export default {
  props:["fullInfo"]
}
</script>

<style scoped>
/* Custom tweaks that Bootstrap doesn't handle */
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