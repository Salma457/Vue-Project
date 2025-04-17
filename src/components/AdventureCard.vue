<template>
    <div class="adventure-card">
      <div class="card-image">
        <img :src="adventure.image" :alt="adventure.title">
        <div class="price-tag">${{ adventure.price }}</div>
      </div>
      
      <div class="card-content">
        <div class="location-info">
          <img :src="location.image" :alt="location.name" class="location-image">
          <div class="location-text">
            <h3>{{ adventure.title }}</h3>
            <p>{{ location.name }}, {{ location.country }}</p>
          </div>
        </div>
        
        <div class="adventure-details">
          <span class="duration">{{ adventure.duration }}</span>
          <span class="difficulty" :class="difficultyClass">{{ adventure.difficulty }}</span>
        </div>
        
        <div class="adventure-tags">
          <span v-for="tag in adventure.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        
        <div class="rating">
          <span class="stars">★★★★★</span>
          <span class="review-count">{{ adventure.reviewCount }} reviews</span>
        </div>
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
      },
      location: {
        type: Object,
        required: true
      }
    },
    computed: {
      difficultyClass() {
        return {
          'easy': this.adventure.difficulty === 'Easy',
          'moderate': this.adventure.difficulty === 'Moderate',
          'challenging': this.adventure.difficulty === 'Challenging',
          'expert': this.adventure.difficulty === 'Expert'
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .adventure-card {
    border: 1px solid #eaeaea;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .adventure-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  
  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .price-tag {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: rgba(0,0,0,0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
  }
  
  .card-content {
    padding: 15px;
  }
  
  .location-info {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .location-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .location-text h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
  }
  
  .location-text p {
    margin: 5px 0 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  .adventure-details {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    font-size: 0.9rem;
  }
  
  .duration {
    color: #555;
  }
  
  .difficulty {
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.8rem;
  }
  
  .easy { background-color: #e6f7e6; color: #2e7d32; }
  .moderate { background-color: #fff8e1; color: #ff8f00; }
  .challenging { background-color: #ffebee; color: #c62828; }
  .expert { background-color: #f3e5f5; color: #6a1b9a; }
  
  .adventure-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 15px 0;
  }
  
  .tag {
    background-color: #f0f7ff;
    color: #0066cc;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  
  .rating {
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
  
  .stars {
    color: #ffb400;
    margin-right: 8px;
  }
  
  .review-count {
    font-size: 0.9rem;
    color: #666;
  }
  </style>