<template>
  <div class="location-page">
    <h1 class="title">Adventure Location</h1>
    <iframe
      class="map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.9288!2d-122.084249!3d37.422065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba0000000001%3A0x6aaf0b!2sMountain%20Adventure!5e0!3m2!1sen!2sus!4v1616148202123"
      allowfullscreen=""
      loading="lazy"
    ></iframe>

    <p class="info">
      Located in the heart of nature, this adventure starts near Lake Tahoe and offers unmatched views of the mountains and forests.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Location'
}
</script>

<style scoped>
.location-page {
  padding: 30px;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
}

.map {
  width: 100%;
  height: 400px;
  border: none;
  margin-bottom: 20px;
  border-radius: 8px;
}

.info {
  font-size: 16px;
  color: #555;
}
</style>
