<template>
    <div class="Error-view">
      <Navbar />
      <Error404 />
    </div>
    <footer/>

  </template>
  
  <script>
import Navbar from '@/components/Navbar.vue'
import Error404 from '@/components/error404.vue';
import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'ErrorView',
    components: {
      Navbar,
      Error404,
      Footer
    }
  }
  </script>
  
  <style scoped>
  .Error-view {
    min-height: 100vh;
  }
  </style>