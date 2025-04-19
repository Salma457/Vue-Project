<template>
  <div class="add-adventure-page">
    <Navbar />
    <div class="form-container">
      <h1>Host an Adventure</h1>
      
      <form @submit.prevent="submitAdventure" class="adventure-form">
        <!-- Basic Information Section -->
        <div class="form-section">
          <h2 class="section-title">Basic Information</h2>
          <div class="form-grid">
            <div class="form-group">
              <label>Adventure Title</label>
              <input v-model="adventure.title" type="text" required>
            </div>
            
            <div class="form-group">
              <label>Subtitle</label>
              <input v-model="adventure.subtitle" type="text" required>
            </div>
            
            <div class="form-group">
              <label>Location</label>
              <select v-model="adventure.locationId" required>
                <option value="">Select a location</option>
                <option v-for="location in locations" :key="location.id" :value="location.id">
                  {{ location.name }}, {{ location.country }}
                </option>
              </select>
            </div>
            
            <div class="form-group full-width">
              <label>Summary</label>
              <textarea v-model="adventure.summary" required></textarea>
            </div>
          </div>
        </div>

        <!-- Details Section -->
        <div class="form-section">
          <h2 class="section-title">Details</h2>
          <div class="form-grid">
            <div class="form-group">
              <label>Duration</label>
              <input v-model="adventure.duration" type="text" required>
            </div>
            
            <div class="form-group">
              <label>Difficulty</label>
              <select v-model="adventure.difficulty" required>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Challenging">Challenging</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            
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

        <!-- Photos Section -->
        <div class="form-section">
          <h2 class="section-title">Photos</h2>
          <div class="form-group full-width">
            <input type="file" multiple @change="handleFileUpload" class="file-input">
            <div class="image-previews">
              <div v-for="(preview, index) in imagePreviews" :key="index" class="preview-item">
                <img :src="preview" alt="Preview">
                <button @click="removeImage(index)" class="remove-btn">&times;</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="form-section">
          <h2 class="section-title">Additional Information</h2>
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Highlights (comma separated)</label>
              <input v-model="highlightsInput" type="text" placeholder="Highlight 1, Highlight 2">
            </div>
            
            <div class="form-group full-width">
              <label>Tags (comma separated)</label>
              <input v-model="tagsInput" type="text" placeholder="tag1, tag2">
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn">Submit Adventure</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'AddAdventure',
  components: {
    Navbar
  },
  data() {
    return {
      locations: [],
      adventure: {
        title: '',
        subtitle: '',
        locationId: '',
        summary: '',
        duration: '',
        difficulty: 'Moderate',
        groupSize: '',
        price: '',
        highlights: [],
        tags: [],
        gallery: [],
        itinerary: [],
        included: [],
        notIncluded: [],
        rating: 0,
        reviewCount: 0
      },
      highlightsInput: '',
      tagsInput: '',
      imagePreviews: [],
      selectedFiles: []
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/locations');
      this.locations = response.data;
    } catch (error) {
      console.error('Error loading locations:', error);
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
    removeImage(index) {
      this.imagePreviews.splice(index, 1);
      this.selectedFiles.splice(index, 1);
    },
    async submitAdventure() {
      try {
        // Process highlights and tags
        this.adventure.highlights = this.highlightsInput.split(',').map(h => h.trim());
        this.adventure.tags = this.tagsInput.split(',').map(t => t.trim());
        
        // Add first image as main image
        if (this.imagePreviews.length > 0) {
          this.adventure.image = this.imagePreviews[0];
          this.adventure.gallery = this.imagePreviews;
        }
        
        // Generate itinerary based on duration
        this.generateItinerary();
        
        // Set default values
        this.adventure.id = Date.now();
        this.adventure.host = "New Host"; // You can add host selection later
        
        // Submit to backend
        const response = await axios.post('http://localhost:5000/adventures', this.adventure);
        
        this.$router.push('/adventures');
      } catch (error) {
        console.error('Error submitting adventure:', error);
        alert('Failed to submit adventure. Please try again.');
      }
    },
    generateItinerary() {
      const days = parseInt(this.adventure.duration) || 1;
      this.adventure.itinerary = [];
      
      for (let i = 1; i <= days; i++) {
        this.adventure.itinerary.push({
          day: i,
          title: `Day ${i} Adventure`,
          description: `Description for day ${i} activities`
        });
      }
    }
  }
}
</script>

<style scoped>
.add-adventure-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
  font-weight: 600;
  text-align: center;
}

.adventure-form {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.form-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.section-title {
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 500;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #009688;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.file-input {
  padding: 10px;
}

.image-previews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.preview-item {
  position: relative;
  height: 150px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  background: rgba(0,0,0,0.6);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.submit-btn {
  background-color: #009688;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #00796b;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-container {
    padding: 15px;
  }
  
  .adventure-form {
    padding: 20px;
  }
}
</style>