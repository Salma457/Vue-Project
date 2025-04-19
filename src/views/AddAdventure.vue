<template>
  <div class="add-adventure">
    <h1>Host an Adventure</h1>
    
    <div class="form-container">
      <form @submit.prevent="submitAdventure">
        <div class="form-section">
          <h2>Basic Information</h2>
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
              <option v-for="location in locations" :key="location.id" :value="location.id">
                {{ location.name }}, {{ location.country }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Summary</label>
            <textarea v-model="adventure.summary" required></textarea>
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
                <option value="Intermediate">Intermediate</option>
                <option value="Challenging">Challenging</option>
                <option value="Expert">Expert</option>
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

        <div class="form-section">
          <h2>Additional Information</h2>
          <div class="form-group">
            <label>Highlights (comma separated)</label>
            <input v-model="highlightsInput" type="text" placeholder="Highlight 1, Highlight 2">
          </div>
          <div class="form-group">
            <label>Tags (comma separated)</label>
            <input v-model="tagsInput" type="text" placeholder="tag1, tag2">
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
    // Load locations from db.json
    try {
      const response = await axios.get('http://localhost:5000/locations')
      this.locations = response.data
    } catch (error) {
      console.error('Error loading locations:', error)
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
        // Process highlights and tags
        this.adventure.highlights = this.highlightsInput.split(',').map(h => h.trim())
        this.adventure.tags = this.tagsInput.split(',').map(t => t.trim())
        
        // Add first image as main image
        if (this.imagePreviews.length > 0) {
          this.adventure.image = this.imagePreviews[0]
          this.adventure.gallery = this.imagePreviews
        }
        
        // Generate itinerary based on duration
        this.generateItinerary()
        
        // Set default values
        this.adventure.id = Date.now()
        this.adventure.host = "New Host" // You can add host selection later
        
        // Submit to backend
        const response = await axios.post('http://localhost:5000/adventures', this.adventure)
        
        alert('Adventure submitted successfully!')
        this.$router.push('/adventures')
      } catch (error) {
        console.error('Error submitting adventure:', error)
        alert('Failed to submit adventure. Please try again.')
      }
    },
    generateItinerary() {
      const days = parseInt(this.adventure.duration) || 1
      this.adventure.itinerary = []
      
      for (let i = 1; i <= days; i++) {
        this.adventure.itinerary.push({
          day: i,
          title: `Day ${i} Adventure`,
          description: `Description for day ${i} activities`
        })
      }
    }
  }
}
</script>

<style scoped>
/* Your existing styles remain the same */
</style>