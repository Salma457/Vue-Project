<template>
    <div class="adventure-card">
      <img :src="adventure.image" :alt="adventure.title" class="adventure-image">
      <div class="card-content">
        <h3>{{ adventure.title }}</h3>
        <p class="location">{{ adventure.location }}</p>
        <p class="type">{{ adventure.type }}</p>
        <p class="price">from ${{ adventure.price }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdventureCard',
    props: {
      adventure: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .adventure-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .adventure-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .adventure-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-content {
    padding: 15px;
  }
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 8px;
    color: #333;
  }
  
  .location {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
  
  .type {
    color: #333;
    font-weight: bold;
    margin: 8px 0;
    font-size: 0.9rem;
  }
  
  .price {
    color: #ff5a5f;
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 10px;
  }
  </style>