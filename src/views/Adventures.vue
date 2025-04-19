<template>
  <div class="adventures-view">
    <Navbar />
    <div class="adventures-container">
      <!-- Filter Section -->
      <div class="filters-section">
        <div class="filter-group">
          <label>All Countries</label>
          <select v-model="selectedCountry" @change="applyFilters">
            <option value="">All Countries</option>
            <option v-for="country in uniqueCountries" :key="country" :value="country">
              {{ country }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>All Types</label>
          <select v-model="selectedType" @change="applyFilters">
            <option value="">All Types</option>
            <option v-for="type in uniqueTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>All Difficulty Levels</label>
          <select v-model="selectedDifficulty" @change="applyFilters">
            <option value="">All Difficulty Levels</option>
            <option v-for="level in uniqueDifficulties" :key="level" :value="level">
              {{ level }}
            </option>
          </select>
        </div>
      </div>

      <!-- Adventures Grid -->
      <div class="adventures-grid">
        <div v-for="adventure in filteredAdventures" :key="adventure.id" class="adventure-item">
          <router-link :to="`/adventure/${adventure.id}`" class="adventure-link">
            <div class="adventure-image">
              <img :src="adventure.image" :alt="adventure.title">
            </div>
            <div class="adventure-details">
              <h3 class="adventure-title">{{ adventure.title }}</h3>
              <p class="adventure-location">
                {{ getLocation(adventure.locationId)?.name }}, {{ getLocation(adventure.locationId)?.country }}
              </p>
              <div class="adventure-meta">
                <span class="duration">{{ adventure.duration }}</span>
                <span class="difficulty">{{ adventure.difficulty }}</span>
              </div>
              <div class="adventure-tags">
                <span v-for="tag in adventure.tags" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

export default {
  name: 'AdventuresView',
  components: {
    Navbar
  },
  data() {
    return {
      locations: [],
      adventures: [],
      selectedCountry: this.$route.query.country || '',
      selectedType: '',
      selectedDifficulty: ''
    }
  },
  props: {
    country: {
      type: String,
      default: ''
    }
  },
  async created() {
    try {
      const [locationsRes, adventuresRes] = await Promise.all([
        axios.get('http://localhost:5000/locations'),
        axios.get('http://localhost:5000/adventures')
      ])
      this.locations = locationsRes.data
      this.adventures = adventuresRes.data
      
      if (this.country) {
        this.selectedCountry = this.country
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  },
  computed: {
    uniqueCountries() {
      return [...new Set(this.locations.map(loc => loc.country))]
    },
    uniqueTypes() {
      const types = new Set()
      this.adventures.forEach(adv => {
        if (adv.tags) {
          adv.tags.forEach(tag => types.add(tag))
        }
      })
      return [...types]
    },
    uniqueDifficulties() {
      return [...new Set(this.adventures.map(adv => adv.difficulty))]
    },
    filteredAdventures() {
      return this.adventures.filter(adv => {
        const location = this.getLocation(adv.locationId)
        return (
          (!this.selectedCountry || location?.country === this.selectedCountry) &&
          (!this.selectedType || (adv.tags && adv.tags.includes(this.selectedType))) &&
          (!this.selectedDifficulty || adv.difficulty === this.selectedDifficulty)
        )
      })
    }
  },
  methods: {
    getLocation(locationId) {
      return this.locations.find(loc => loc.id === locationId)
    },
    applyFilters() {
      this.$router.push({
        query: {
          country: this.selectedCountry || undefined,
          type: this.selectedType || undefined,
          difficulty: this.selectedDifficulty || undefined
        }
      })
    }
  },
  watch: {
    '$route.query'(newQuery) {
      this.selectedCountry = newQuery.country || ''
      this.selectedType = newQuery.type || ''
      this.selectedDifficulty = newQuery.difficulty || ''
    }
  }
}
</script>

<style scoped>
.adventures-view {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.adventures-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.filter-group {
  flex: 1;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

.filter-group select {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
}

.adventures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.adventure-item {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.adventure-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.adventure-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.adventure-image {
  height: 200px;
  overflow: hidden;
}

.adventure-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.adventure-item:hover .adventure-image img {
  transform: scale(1.05);
}

.adventure-details {
  padding: 20px;
}

.adventure-title {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #333;
  font-weight: 600;
}

.adventure-location {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
}

.adventure-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
}

.adventure-meta span {
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #555;
}

.adventure-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  background-color: #e9f5ff;
  color: #007bff;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .filters-section {
    flex-direction: column;
    gap: 15px;
  }
  
  .adventures-grid {
    grid-template-columns: 1fr;
  }
}
</style>