<!-- 


  <template>
    <header class="navbar">
      <div class="logo-container">
        <h1 class="logo">
          <router-link to="/" class="logo-link">EMBARK.ORG</router-link>
        </h1>
        <p class="tagline">FEATURED TURKS</p>
      </div>
      
      <nav class="nav-links">
        <router-link to="/adventures" class="nav-link">Explore</router-link>
        <router-link to="/register" class="nav-link">Register</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>
        <button class="host-button" @click="$router.push('/host')">HOST AN ADVENTURE</button>
      </nav>


      
    </header>
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
    position: relative;
    z-index: 100;
  }
  
  .logo-container {
    display: flex;
    flex-direction: column;
  }
  
  .logo {
    font-size: 1.5rem;
    margin: 0;
  }
  
  .logo-link {
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }
  
  .tagline {
    font-size: 0.8rem;
    color: #666;
    margin: 3px 0 0;
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  
  .nav-link {
    text-decoration: none;
    color: #333;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .router-link-exact-active {
    color: #ff5a5f;
    font-weight: bold;
  }
  
  .host-button {
    padding: 8px 16px;
    background-color: #ff5a5f;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .host-button:hover {
    background-color: #e04a50;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      padding: 15px;
    }
    
    .nav-links {
      margin-top: 15px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  </style> -->


  <template>
    <header class="navbar">
      <div class="logo-container">
        <h1 class="logo">
          <router-link to="/" class="logo-link">EMBARK.ORG</router-link>
        </h1>
        <p class="tagline">FEATURED TURKS</p>
      </div>
  
      <nav class="nav-links">
        <router-link to="/adventures" class="nav-link">Explore</router-link>
        <router-link to="/wishlist" class="nav-link">
          <!-- <span class="wishlist-icon">❤️</span> -->
      Wishlist 
    </router-link>
  
        <template v-if="!isLoggedIn">
          <router-link to="/register" class="nav-link">Register</router-link>
          <router-link to="/login" class="nav-link">Login</router-link>
        </template>
  
        <template v-else>
          <span class="user-info">Welcome, {{ loggedInUsername }}</span>
          <button class="logout-button" @click="logout">Logout</button>
        </template>
  
        <button class="host-button" @click="$router.push('/host')">HOST AN ADVENTURE</button>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    computed: {
      isLoggedIn() {
        return !!localStorage.getItem('currentUser');
      },
      loggedInUsername() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        return user ? user.name : '';
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('currentUser');
        // يمكنك إضافة أي منطق إضافي لتسجيل الخروج هنا، مثل إعادة التوجيه
        this.$router.push('/login'); // أو '/', حسب المطلوب
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: relative;
    z-index: 100;
  }
  
  .logo-container {
    display: flex;
    flex-direction: column;
  }
  
  .logo {
    font-size: 1.5rem;
    margin: 0;
  }
  
  .logo-link {
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }
  
  .tagline {
    font-size: 0.8rem;
    color: #666;
    margin: 3px 0 0;
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  
  .nav-link {
    text-decoration: none;
    color: #333;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .router-link-exact-active {
    color: #ff5a5f;
    font-weight: bold;
  }
  
  .host-button {
    padding: 8px 16px;
    background-color: #ff5a5f;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .host-button:hover {
    background-color: #e04a50;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      padding: 15px;
    }
    
    .nav-links {
      margin-top: 15px;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  /* ... نفس الأنماط السابقة ... */
  
  .user-info {
    font-size: 0.95rem;
    font-weight: bold;
    color: #333;
    margin-right: 15px;
  }
  
  .logout-button {
    padding: 8px 16px;
    background-color: #d9534f; /* لون أحمر للخروج */
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .logout-button:hover {
    background-color: #c9302c;
    transform: translateY(-2px);
  }
  </style>