<template>
  <div class="itinerary-page">
    <h1 class="title">Trip Itinerary</h1>

    <div v-for="(day, index) in itinerary" :key="index" class="day-box">
      <div class="day-header">
        <h2>Day {{ index + 1 }}</h2>
        <span>{{ day.title }}</span>
      </div>
      <p class="description">{{ day.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HostItinerary',
  data() {
    return {
      itinerary: [
        {
          title: 'Arrival and Welcome',
          description: 'Arrive at base camp, meet your guide, and get a full briefing about the adventure ahead.'
        },
        {
          title: 'Mountain Hike',
          description: 'We’ll start the hike early morning, with breathtaking views and lunch on the cliff.'
        },
        {
          title: 'Campfire and Departure',
          description: 'Enjoy a local dinner by the fire, share stories, and prepare for the return journey.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.itinerary-page {
  padding: 30px;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
}

.day-box {
  background-color: #f4f4f4;
  border-left: 6px solid #009688;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.day-header h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.day-header span {
  font-size: 16px;
  color: #555;
}

.description {
  margin-top: 10px;
  color: #444;
}
</style>
