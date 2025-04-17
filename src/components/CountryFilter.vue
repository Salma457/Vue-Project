<template>
    <div class="filter-container">
      <label for="country-filter">Filter by Country:</label>
      <select 
        id="country-filter" 
        v-model="selectedCountry" 
        @change="onCountryChange"
        class="filter-select"
      >
        <option value="">All Countries</option>
        <option 
          v-for="country in countries" 
          :key="country.id" 
          :value="country.name"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CountryFilter',
    props: {
      countries: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selectedCountry: ''
      }
    },
    methods: {
      onCountryChange() {
        this.$emit('country-changed', this.selectedCountry)
      }
    }
  }
  </script>
  
  <style scoped>
  .filter-container {
    margin: 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .filter-select {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: white;
    font-size: 1rem;
  }
  </style>