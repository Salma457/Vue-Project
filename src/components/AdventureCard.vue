<template>
  <div class="adventure-card">
    <div class="card-image">
      <img :src="adventure.image" :alt="adventure.title">
      <div class="price-tag">${{ adventure.price }}</div>
    </div>
    
    <div class="card-content">
      <div class="location-info">
        <img :src="location.image || getDefaultLocationImage()" :alt="location.name" class="location-image">
        <div class="location-text">
          <h3>{{ adventure.title }}</h3>
          <p>{{ location.name }}, {{ location.country }}</p>
        </div>
      </div>
      
      <div class="adventure-details">
        <span class="duration">
          <i class="icon-clock"></i> {{ adventure.duration }}
        </span>
        <span class="difficulty" :class="difficultyClass">
          {{ adventure.difficulty }}
        </span>
      </div>
      
      <div class="adventure-tags" v-if="adventure.tags && adventure.tags.length">
        <span v-for="tag in adventure.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      
      <div class="rating" v-if="adventure.reviewCount > 0">
        <div class="stars">
          <span v-for="star in 5" :key="star" 
                :class="['star', { 'filled': star <= Math.round(adventure.rating) }]">
            ★
          </span>
        </div>
        <span class="review-count">{{ adventure.reviewCount }} reviews</span>
      </div>
      
      <button class="view-details-btn" @click.stop="$emit('view-details')">
        View Details
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdventureCard',
  props: {
    adventure: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        image: '',
        price: 0,
        duration: '',
        difficulty: 'Moderate',
        tags: [],
        rating: 0,
        reviewCount: 0
      })
    },
    location: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        country: '',
        image: ''
      })
    }
  },
  methods: {
    getDefaultLocationImage() {
      return 'https://via.placeholder.com/50x50?text=' + this.location.name.charAt(0)
    }
  },
  computed: {
    difficultyClass() {
      const difficulty = this.adventure.difficulty.toLowerCase()
      return {
        'easy': difficulty === 'easy',
        'moderate': difficulty === 'moderate',
        'challenging': difficulty === 'challenging',
        'expert': difficulty === 'expert'
      }
    }
  }
}
</script>

<style scoped>
.adventure-card {
  border: 1px solid #eaeaea;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.adventure-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
  transition: transform 0.5s ease;
}

.adventure-card:hover .card-image img {
  transform: scale(1.05);
}

.price-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  backdrop-filter: blur(2px);
}

.card-content {
  padding: 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.location-info {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
  align-items: center;
}

.location-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.location-text h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
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
  align-items: center;
}

.duration {
  color: #555;
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon-clock {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23555555"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>') no-repeat center;
}

.difficulty {
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.8rem;
  text-transform: capitalize;
}

.easy { background-color: #e8f5e9; color: #2e7d32; }
.moderate { background-color: #fff3e0; color: #ef6c00; }
.challenging { background-color: #ffebee; color: #c62828; }
.expert { background-color: #f3e5f5; color: #6a1b9a; }

.adventure-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0 15px;
}

.tag {
  background-color: #f0f7ff;
  color: #0066cc;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.rating {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 10px;
}

.stars {
  display: flex;
  margin-right: 8px;
}

.star {
  color: #e0e0e0;
  font-size: 0.9rem;
}

.star.filled {
  color: #ffb400;
}

.review-count {
  font-size: 0.85rem;
  color: #666;
}

.view-details-btn {
  margin-top: 15px;
  padding: 10px;
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.view-details-btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .card-image {
    height: 180px;
  }
  
  .card-content {
    padding: 15px;
  }
  
  .location-image {
    width: 40px;
    height: 40px;
  }
}
</style>