<template>
    <div class="adventure-card">
      <button @click="toggleFavorite" class="favorite-button" :class="{ 'favorited': isFavorite }">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="heart-icon">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
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
    data() {
    return {
      favorites: JSON.parse(localStorage.getItem('favorites')) || []
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
      },
      isFavorite() {
      return this.favorites.includes(this.adventure.id)
    }
    },
  methods: {
    toggleFavorite() {
      
      if (this.isFavorite) {
        this.favorites = this.favorites.filter(id => id !== this.adventure.id)
      } else {
        this.favorites.push(this.adventure.id)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
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
  
  .favorite-button {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.favorite-button:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.9);
}

.heart-icon {
  width: 20px;
  height: 20px;
  fill: #ccc;
  transition: all 0.3s ease;
}

.favorite-button.favorited .heart-icon {
  fill: #ff5a5f;
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
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
  z-index: 2;
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