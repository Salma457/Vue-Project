<template>
  <div class="embark-family">
    <h2 class="family-title">The embark.org family</h2>
    <p class="family-subtitle">Get to know the travelers who are contributing to embark.org every day</p>
    
    <div class="travelers-container">
      <div 
        v-for="traveler in travelers" 
        :key="traveler.name" 
        class="traveler"
      >
        <img 
          :src="traveler.image" 
          :alt="traveler.name" 
          class="traveler-image"
        >
        <div class="traveler-name">{{ traveler.name }}</div>
        <div class="traveler-roles">{{ traveler.roles }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmbarkFamily',
  data() {
    return {
      travelers: [
        {
          name: 'Dinesh Tamang Blon',
          roles: `Hiker, Adventure Host,
Mountaineer, Mountain
Biker, Camper`,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        },
        {
          name: 'Alex Potemkin',
          roles: `Hiker, Backpacker,
Photographer, Filmmaker,
Solo Traveler`,
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        },
        {
          name: 'Ali Qaredaqi',
          roles: `Hiker, Adventure Host,
Mountaineer`,
          image: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.embark-family {
  font-family: 'Segoe UI', Arial, sans-serif;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

.family-title {
  color: #2a5c8d;
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 600;
}

.family-subtitle {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 1.5;
}

.travelers-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;
}

.traveler {
  width: 250px;
  text-align: center;
  padding: 25px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.traveler-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid #f0f0f0;
}

.traveler-name {
  font-weight: bold;
  color: #2a5c8d;
  font-size: 18px;
  margin-bottom: 15px;
}

.traveler-roles {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .traveler {
    width: 100%;
    max-width: 280px;
  }
}
</style>