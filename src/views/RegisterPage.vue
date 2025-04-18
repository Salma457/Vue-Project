<template>
    <div class="RegisterPage">
      <Navbar />
      <Register /> 
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue'
import Register from '@/components/Register.vue';
  export default {
    name: 'RegisterPage',
    components: { Navbar, Register }
  }
  </script>
  
  <style>
  .RegisterPage {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>