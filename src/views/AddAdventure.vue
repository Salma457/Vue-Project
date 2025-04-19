<template>
  <div class="add-adventure">
    <h1>Host an Adventure</h1>
    
    <div class="form-container">
      <form @submit.prevent="submitAdventure">
        <div class="form-section">
          <h2>Basic Information</h2>
          <div class="form-group">
            <label>Adventure Name</label>
            <input v-model="adventure.name" type="text" required>
          </div>
          <div class="form-group">
            <label>Location</label>
            <input v-model="adventure.location" type="text" required>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="adventure.description" required></textarea>
          </div>
        </div>

        <div class="form-section">
          <h2>Details</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Duration</label>
              <input v-model="adventure.duration" type="text" required>
            </div>
            <div class="form-group">
              <label>Difficulty</label>
              <select v-model="adventure.difficulty" required>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Group Size</label>
              <input v-model="adventure.groupSize" type="text" required>
            </div>
            <div class="form-group">
              <label>Price ($)</label>
              <input v-model="adventure.price" type="number" required>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Photos</h2>
          <input type="file" multiple @change="handleFileUpload">
          <div class="image-previews">
            <div v-for="(preview, index) in imagePreviews" :key="index" class="preview-item">
              <img :src="preview" alt="Preview">
            </div>
          </div>
        </div>

        <button type="submit" class="submit-btn">Submit Adventure</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddAdventure',
  data() {
    return {
      adventure: {
        name: '',
        location: '',
        description: '',
        duration: '',
        difficulty: 'Moderate',
        groupSize: '',
        price: '',
        images: []
      },
      imagePreviews: [],
      selectedFiles: []
    }
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFiles = event.target.files;
      this.imagePreviews = [];
      
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    },
    async submitAdventure() {
      try {
        // In a real app, you would upload images to a server here
        // For this example, we'll just store the base64 strings
        this.adventure.images = this.imagePreviews;
        
        const response = await axios.post('http://localhost:5000/adventures', this.adventure);
        alert('Adventure submitted successfully!');
        this.$router.push('/adventures');
      } catch (error) {
        console.error('Error submitting adventure:', error);
        alert('Failed to submit adventure. Please try again.');
      }
    }
  }
}
</script>

<style scoped>
.add-adventure {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  font-size: 2.5rem;
  color: #01473d;
  margin-bottom: 2rem;
  text-align: center;
}

.form-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.form-section h2 {
  font-size: 1.5rem;
  color: #01745d;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

input, textarea, select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  min-height: 120px;
}

.image-previews {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.preview-item {
  width: 150px;
  height: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.submit-btn {
  background-color: #009688;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 2rem auto 0;
}

.submit-btn:hover {
  background-color: #00796b;
}
</style>