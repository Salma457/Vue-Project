<template>
    <div class="adventures-page">
      <div class="filters">
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
  
    <div class="adventures-grid">
    <div v-for="adventure in filteredAdventures" :key="adventure.id">
      <AdventureCard  
        :adventure="adventure"
        :location="getLocation(adventure.locationId)"
      />
    </div>
  </div>
    </div>
</template>
  
  <script>
  import axios from 'axios'
  import AdventureCard from './AdventureCard.vue'
  
  export default {
    name: 'AdventureList',
    components: {
      AdventureCard
    },
    data() {
      return {
        locations: [],
        adventures: [],
        selectedCountry: this.$route.query.country || '', // التعديل هنا
        selectedType: '',
        selectedDifficulty: ''
      }
    }, props: {
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
        this.selectedCountry = this.country;
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
      goToCountryAdventures(countryName) {
    this.$router.push({
      name: 'Adventures',
      query: { 
        country: countryName 
      }
    });
  },
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
      });
          }
    },
    watch: {
    '$route.query'(newQuery) {
      this.selectedCountry = newQuery.country || '';
      this.selectedType = newQuery.type || '';
      this.selectedDifficulty = newQuery.difficulty || '';
    }
  }
  }
  </script>
  
  <style scoped>
  .adventures-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .filters {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f8f8;
    border-radius: 8px;
  }
  
  .filter-group {
    flex: 1;
    max-width: 250px;
  }
  
  .filter-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #555;
  }
  
  .filter-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: white;
  }
  
  .adventures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
  }
  </style>