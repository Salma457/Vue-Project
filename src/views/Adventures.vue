<template>
    <div class="adventures-view">
      <Navbar />
      <AdventureList />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue'
  import AdventureList from '@/components/AdventureList.vue'
  
  export default {
    name: 'AdventuresView',
    components: {
      Navbar,
      AdventureList
    }
  }
  </script>
  
  <style scoped>
  .adventures-view {
    min-height: 100vh;
  }
  </style>