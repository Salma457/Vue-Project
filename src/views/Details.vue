<template>
  <div class="details-page">
    <section class="hero">
      <img :src="adventure.image" alt="Adventure" class="hero-image" />
      <div class="overlay">
        <h1 class="title">{{ adventure.name }}</h1>
        <p class="location">{{ adventure.location }}</p>
      </div>
    </section>

    <section class="description">
      <h2>About This Experience</h2>
      <p>{{ adventure.description }}</p>
    </section>

    <section class="info-grid">
      <div class="info-box">
        <h3>Duration</h3>
        <p>{{ adventure.duration }}</p>
      </div>
      <div class="info-box">
        <h3>Group Size</h3>
        <p>{{ adventure.groupSize }}</p>
      </div>
      <div class="info-box">
        <h3>Difficulty</h3>
        <p>{{ adventure.difficulty }}</p>
      </div>
    </section>

    <section class="cta">
      <button @click="bookNow">Book Now</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HostDetails',
  data() {
    return {
      adventure: {
        name: 'Desert Safari',
        location: 'Sinai, Egypt',
        image: 'https://example.com/desert.jpg',
        description: 'Explore the golden sand dunes of Sinai with our guided desert safari adventure...',
        duration: '2 Days',
        groupSize: '6 People',
        difficulty: 'Moderate',
      }
    }
  },
  methods: {
    bookNow() {
      alert('Booking feature coming soon!');
    }
  }
}
</script>

<style scoped>
.details-page {
  font-family: 'Arial', sans-serif;
}

.hero {
  position: relative;
  height: 400px;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: white;
  background: rgba(0,0,0,0.4);
  padding: 20px;
  border-radius: 10px;
}

.description {
  padding: 20px;
}

.info-grid {
  display: flex;
  justify-content: space-around;
  margin: 20px;
  padding: 10px;
  gap: 20px;
}

.info-box {
  background: #f8f8f8;
  padding: 20px;
  flex: 1;
  border-radius: 10px;
  text-align: center;
}

.cta {
  text-align: center;
  margin: 30px 0;
}

.cta button {
  background: #009688;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
