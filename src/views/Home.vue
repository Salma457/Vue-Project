


  <template>
    <div class="home">
      <Navbar />
      
      <div class="hero">
        <h1>Discover Your Next Adventure</h1>
        <router-link to="/adventures" class="cta-button">
          BOOK YOUR ADVENTURE
        </router-link>
      </div>
  <WhyChooseUs/>
  <section4 />
      <Section3/>
      
      <Footer/>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue'
import WhyChooseUs from '@/components/WhyChooseUs.vue'; 
import section4 from '@/components/section4.vue'; 
import Login from '@/components/Login.vue';
import Section3 from '@/components/section3.vue';
import Footer from '@/components/Footer.vue';
  export default {
    name: 'Home',
    components: { 
      Navbar,
      WhyChooseUs,
      section4,

      Section3,
      Footer
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
  </style>