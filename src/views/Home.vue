<template>
  <div class="home">
    <Navbar />
    
    <div class="hero">
      <h1>Discover Your Next Adventure</h1>
      <router-link to="/adventures" class="cta-button">
        BOOK YOUR ADVENTURE
      </router-link>
    </div>

    <!-- Countries Section -->
    <section class="countries-section">
      <div class="container">
        <h2 class="section-title">Explore by Country</h2>
        <p class="section-subtitle">Choose your dream destination</p>
        
        <div class="countries-grid">
          <div 
            v-for="country in countriesWithAdventures" 
            :key="country.name"
            class="country-card"
            @click="goToCountryAdventures(country.name)"
          >
            <div class="country-image">
              <img :src="getCountryImage(country.name)" :alt="country.name">
              <div class="overlay"></div>
            </div>
            <div class="country-info">
              <h3>{{ country.name }}</h3>
              <p>{{ country.adventuresCount }} adventures available</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WhyChooseUs />
    <section4 />
    <Section3 />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import WhyChooseUs from '@/components/WhyChooseUs.vue'
import section4 from '@/components/section4.vue'
import Section3 from '@/components/section3.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: { 
    Navbar,
    WhyChooseUs,
    section4,
    Section3,
    Footer
  },
  data() {
    return {
      locations: [],
      adventures: [],
      countryImages: {
        'Croatia': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088',
        'South Africa': 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
        'United States': 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5'
      }
    }
  },
  computed: {
    countriesWithAdventures() {
      const countries = {};
      
      // حساب عدد المغامرات لكل بلد
      this.adventures.forEach(adventure => {
        const location = this.locations.find(loc => loc.id === adventure.locationId);
        if (location) {
          if (!countries[location.country]) {
            countries[location.country] = {
              name: location.country,
              adventuresCount: 0
            };
          }
          countries[location.country].adventuresCount++;
        }
      });
      
      return Object.values(countries);
    }
  },
  methods: {
    goToCountryAdventures(countryName) {
      this.$router.push({
        name: 'Adventures',
        query: { country: countryName }
      });
    },
    getCountryImage(countryName) {
      return this.countryImages[countryName] || 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5';
    }
  },
  async created() {
    try {
      const [locationsRes, adventuresRes] = await Promise.all([
        axios.get('http://localhost:5000/locations'),
        axios.get('http://localhost:5000/adventures')
      ]);
      this.locations = locationsRes.data;
      this.adventures = adventuresRes.data;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  color: white;
  text-align: center;
  padding: 0 20px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.cta-button {
  padding: 15px 30px;
  background-color: #ff5a5f;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.3s, background-color 0.3s;
}

.cta-button:hover {
  background-color: #e04a50;
  transform: translateY(-3px);
}

/* Countries Section Styles */
.countries-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.section-subtitle {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 50px;
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.country-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.country-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.country-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.country-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.country-card:hover .country-image img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}

.country-info {
  padding: 20px;
}

.country-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.5rem;
  color: #333;
}

.country-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .countries-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>