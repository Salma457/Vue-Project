<template>
  <div class="photos-page">
    <h1>Upload Your Adventure Photos</h1>
    <input type="file" multiple @change="handleFiles" />
    <div class="preview">
      <img v-for="(img, index) in imagePreviews" :key="index" :src="img" alt="preview" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Photos',
  data() {
    return {
      imagePreviews: []
    };
  },
  methods: {
    handleFiles(event) {
      const files = event.target.files;
      this.imagePreviews = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
}
</script>

<style scoped>
.photos-page {
  padding: 2rem;
}
.preview img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 10px;
}
</style>
