<template>
    <div class="login-page">
      <Navbar />
      <Login /> <
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue'
import Login from '@/components/Login.vue';  
  export default {
    name: 'LoginPage',
    components: { Navbar, Login }
  }
  </script>
  
  <style>
  .login-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>