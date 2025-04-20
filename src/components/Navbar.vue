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

      <template v-if="!isLoggedIn">
        <router-link to="/register" class="nav-link">Register</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>
      </template>

      <template v-else>
        <div class="dropdown">
          <button class="dropdown-toggle" @click="toggleDropdown">
            <span class="user-info">{{ loggedInUsername }}</span>
            <i class="bi bi-chevron-down"></i>
          </button>
          <div class="dropdown-menu" v-show="showDropdown">
            <router-link to="/profile/info" class="dropdown-item">
              <i class="bi bi-person"></i> Profile
            </router-link>
            <router-link to="/profile/my-adventures" class="dropdown-item">
              <i class="bi bi-compass"></i> My Adventures
            </router-link>
            <router-link to="/profile/booked" class="dropdown-item">
              <i class="bi bi-calendar-check"></i> Booked Adventures
            </router-link>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item" @click.prevent="logout">
              <i class="bi bi-box-arrow-right"></i> Logout
            </a>
          </div>
        </div>
        <button class="host-button" @click="$router.push('/host')">HOST AN ADVENTURE</button>
      </template>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('currentUser');
    },
    loggedInUsername() {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      return user ? (user.fullName || user.name || 'User') : '';
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      localStorage.removeItem('currentUser');
      this.showDropdown = false;
      this.$router.push('/login');
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        this.showDropdown = false;
      }
    });
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

/* Dropdown styles */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.dropdown-toggle:hover {
  background-color: #f8f9fa;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 200px;
  z-index: 1000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-divider {
  height: 1px;
  background-color: #eee;
  margin: 8px 0;
}

.bi {
  font-size: 1.1rem;
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

  .dropdown-menu {
    position: fixed;
    top: auto;
    right: 50%;
    transform: translateX(50%);
    width: 90%;
    max-width: 300px;
  }
}
</style>