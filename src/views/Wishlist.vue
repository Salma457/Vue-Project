<template>
    <div>
        <Navbar />
    <div class="wishlist-page">
        
           
        
        

      <div class="wishlist-header">
        <h1>Wishlist</h1>
        <p v-if="favoriteAdventures.length > 0">You have {{ favoriteAdventures.length }} saved adventures</p>
    </div>
      
      <div v-if="favoriteAdventures.length === 0" class="empty-wishlist">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff5a5f">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <h3>Your wishlist is empty</h3>
        <p>Save your favorite adventures to plan your next trip</p>
        <router-link to="/adventures" class="browse-button">Explore Adventures</router-link>
      </div>
      
      <div v-else class="wishlist-grid">
        <div v-for="adventure in favoriteAdventures" :key="adventure.id" class="adventure-card">
          <div class="card-image">
            <img :src="adventure.image" :alt="adventure.title" class="adventure-image">
            <button @click="removeFromFavorites(adventure.id)" class="remove-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 13H5v-2h14v2z"/>
              </svg>
              Remove
            </button>
          </div>
          <div class="card-content">
            <h3>{{ adventure.title }}</h3>
            <p class="subtitle">{{ adventure.subtitle }}</p>
            <div class="card-footer">
              <div class="price">${{ adventure.price }}</div>
              <router-link :to="'/adventures/' + adventure.id" class="view-button">Adventure Details </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'


export default {
    components: { Navbar },
    data() {
      return {
        allAdventures: [],
        favorites: JSON.parse(localStorage.getItem('favorites')) || []
      }
    },
    computed: {
      favoriteAdventures() {
        
        return this.allAdventures.filter(adventure => 
          this.favorites.includes(adventure.id)
        )
      }
    },
    async created() {
      const response = await fetch('http://localhost:5000/adventures')
      this.allAdventures = await response.json()
    },
    methods: {
      removeFromFavorites(adventureId) {
        this.favorites = this.favorites.filter(id => id !== adventureId)
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
    }
}
</script>

<style scoped>
.wishlist-page {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Tajawal', sans-serif;
}

.wishlist-header {
  text-align: center;
  margin-bottom: 40px;
}

.wishlist-header h1 {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 10px;
}

.wishlist-header p {
  color: #666;
  font-size: 1.1rem;
}

.empty-wishlist {
  text-align: center;
  padding: 60px 20px;
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  opacity: 0.7;
}

.empty-wishlist h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.empty-wishlist p {
  color: #666;
  margin-bottom: 25px;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.adventure-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.adventure-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
}

.card-image {
  position: relative;
  height: 200px;
}

.adventure-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-button {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255,255,255,0.9);
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Tajawal', sans-serif;
}

.remove-button:hover {
  background: #fff;
  color: #f72585;
}

.remove-button svg {
  width: 16px;
  height: 16px;
}

.card-content {
  padding: 20px;
  direction: rtl;
  text-align: right;
}

.card-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  color: #333;
  line-height: 1.4;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 15px 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.price {
  font-weight: bold;
  color: #4361ee;
  font-size: 1.1rem;
}

.view-button {
  background: #4361ee;
  color: white;
  padding: 8px 15px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.3s ease;
  font-family: 'Tajawal', sans-serif;
}

.view-button:hover {
  background: #3a56d4;
}

.browse-button {
  display: inline-block;
  background: #4361ee;
  color: white;
  padding: 12px 25px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: 'Tajawal', sans-serif;
}

.browse-button:hover {
  background: #3a56d4;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .wishlist-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .wishlist-header h1 {
    font-size: 1.8rem;
  }
  
  .card-content {
    padding: 15px;
  }
}
</style>