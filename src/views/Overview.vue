<template>
  <div class="overview-page">
    <h1 class="title">Adventure Overview</h1>
    <p class="description">
      Join us on an unforgettable journey through stunning landscapes and immersive cultural experiences. Perfect for thrill-seekers and nature lovers alike.
    </p>

    <ul class="details-list">
      <li><strong>Duration:</strong> 3 Days / 2 Nights</li>
      <li><strong>Price:</strong> $450 per person</li>
      <li><strong>Activities:</strong> Hiking, Camping, Local Cuisine, Campfire</li>
      <li><strong>Difficulty Level:</strong> Moderate</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Overview'
}
</script>

<style scoped>
.overview-page {
  padding: 30px;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
}

.description {
  font-size: 18px;
  color: #555;
  margin-bottom: 25px;
}

.details-list {
  list-style-type: none;
  padding: 0;
}

.details-list li {
  margin-bottom: 12px;
  font-size: 16px;
}
</style>
