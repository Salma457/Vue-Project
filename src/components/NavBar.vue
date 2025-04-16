<template>
    <nav class="navbar navbar-expand-lg fixed-top" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <router-link to="/" class="navbar-brand">embark</router-link>
  
        <div class="navbar-search">
          <input type="text" placeholder="Search" class="search-input">
          <button class="search-button">
            <i class="bi bi-search"></i>
          </button>
        </div>
  
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item host-button">
              <router-link class="nav-link" to="/host">HOST AN ADVENTURE</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    setup() {
      const isScrolled = ref(false);
  
      const handleScroll = () => {
        isScrolled.value = window.scrollY > 50;
      };
  
      onMounted(() => {
        window.addEventListener('scroll', handleScroll);
      });
  
      onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
      });
  
      return { isScrolled };
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
    transition: all 0.3s ease;
  }
  
  .navbar.scrolled {
    padding: 0.5rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .navbar-brand {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
    text-decoration: none;
  }
  
  .navbar-search {
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: 500px;
    width: 100%;
  }
  
  .search-input {
    flex: 1;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    outline: none;
  }
  
  .search-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
  
  .nav-link {
    color: #333;
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    font-weight: 500;
  }
  
  .host-button .nav-link {
    background-color: #ff5a5f;
    color: white;
    border-radius: 4px;
    padding: 0.5rem 1.5rem;
    transition: background-color 0.3s;
  }
  
  .host-button .nav-link:hover {
    background-color: #ff3b40;
  }
  
  .navbar-toggler {
    border: none;
  }
  
  .navbar-toggler:focus {
    box-shadow: none;
  }
  
  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
  
  @media (max-width: 991.98px) {
    .navbar-search {
      order: 3;
      margin: 1rem 0;
      max-width: 100%;
    }
    
    .navbar-collapse {
      background-color: white;
      padding: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .host-button {
      margin-top: 1rem;
    }
    
    .host-button .nav-link {
      display: inline-block;
      width: auto;
    }
  }
  </style>