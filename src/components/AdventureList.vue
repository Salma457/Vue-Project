<template>
    <div class="adventures-page">
      <CountryFilter 
        :countries="allCountries" 
        @country-changed="filterByCountry"
      />
      
      <div class="adventures-list">
        <AdventureCard 
          v-for="adventure in filteredAdventures" 
          :key="adventure.id" 
          :adventure="adventure"
        />
      </div>
    </div>
  </template>
  
  <script>
  import AdventureCard from './AdventureCard.vue'
  import CountryFilter from './CountryFilter.vue'
  import axios from 'axios'
  
  export default {
    name: 'AdventureList',
    components: {
      AdventureCard,
      CountryFilter
    },
    data() {
      return {
        allCountries: [],
        allAdventures: [],
        selectedCountry: ''
      }
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:5000/countries')
        this.allCountries = response.data
        
        // تحويل الهيكل ليكون جميع المغامرات في مصفوفة واحدة
        this.allAdventures = response.data.flatMap(country => 
          country.adventures.map(adv => ({
            ...adv,
            country: country.name
          }))
        )
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    computed: {
      filteredAdventures() {
        if (!this.selectedCountry) return this.allAdventures
        
        return this.allAdventures.filter(
          adventure => adventure.country === this.selectedCountry
        )
      }
    },
    methods: {
      filterByCountry(country) {
        this.selectedCountry = country
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
  
  .adventures-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  </style>