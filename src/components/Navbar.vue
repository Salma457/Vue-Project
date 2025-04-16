<template>
    <nav class="navbar">
      <div class="logo">EMBARK.ORG</div>
      <div class="tagline">FEATURED TURKS</div>
      <div class="nav-links">
        <a href="#">Explore</a>
        <a href="#">Search</a>
        <a href="#">salma</a>
        <button class="host-button">HOST AN ADVENTURE</button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .logo {
    font-weight: bold;
    font-size: 1.3rem;
    color: #333;
  }
  
  .tagline {
    color: #666;
    font-size: 0.9rem;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  
  .nav-links a {
    text-decoration: none;
    color: #333;
    font-size: 0.9rem;
  }
  
  .host-button {
    padding: 8px 16px;
    background-color: #ff5a5f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  </style>