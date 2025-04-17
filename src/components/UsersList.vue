
  <template>
    <div class="users-page">
      <Navbar />
      
      <div class="users-container">
        <h2> All  Members</h2>
        
        <div class="users-list">
          <div v-for="user in users" :key="user.id" class="user-card">
            <div class="user-avatar">
              <img 
                v-if="user.avatar" 
                :src="user.avatar" 
                alt="User Avatar"
                class="avatar-image"
              >
              <div v-else class="default-avatar">
                {{ getInitials(user.name) }}
              </div>
            </div>
            <div class="user-info">
              <h3>{{ user.name }}</h3>
              <p>{{ user.email }}</p>
              <small>Registered: {{ formatDate(user.registeredAt) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue'
  
  export default {
    name: 'UsersList',
    components: { Navbar },
    data() {
      return {
        users: JSON.parse(localStorage.getItem('users')) || []
      }
    },
    methods: {
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-US', options)
      },
      getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase()
      }
    }
  }
  </script>
  
  <style scoped>
  .users-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .users-container {
    flex: 1;
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  
  .users-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .user-card {
    display: flex;
    align-items: center;
    gap: 20px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .user-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #ff5a5f;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .default-avatar {
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
  }
  
  .user-info h3 {
    color: #2d3748;
    margin-bottom: 5px;
  }
  
  .user-info p {
    color: #4a5568;
    margin-bottom: 5px;
  }
  
  .user-info small {
    color: #718096;
    font-size: 0.85rem;
  }
  
  @media (max-width: 768px) {
    .users-list {
      grid-template-columns: 1fr;
    }
  }
  </style>