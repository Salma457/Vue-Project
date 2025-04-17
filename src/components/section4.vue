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
        <div class="image-wrapper">
          <img 
            :src="traveler.image" 
            :alt="traveler.name" 
            class="traveler-image"
          >
        </div>
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
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.traveler:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  border-color: #2a5c8d;
}

.image-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f0f0f0;
  transition: all 0.3s ease;
}

.traveler:hover .image-wrapper {
  transform: scale(1.05);
  border-color: #2a5c8d;
}

.traveler-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.traveler:hover .traveler-image {
  transform: scale(1.1);
}

.traveler-name {
  font-weight: bold;
  color: #2a5c8d;
  font-size: 18px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.traveler:hover .traveler-name {
  color: #1a3a5a;
  transform: scale(1.05);
}

.traveler-roles {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-line;
  transition: all 0.3s ease;
}

.traveler:hover .traveler-roles {
  color: #444;
  transform: translateY(5px);
}

/* تأثير خلفية عند الهوفر */
.traveler::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #2a5c8d;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.traveler:hover::before {
  transform: scaleX(1);
}

@media (max-width: 768px) {
  .traveler {
    width: 100%;
    max-width: 280px;
  }
  
  .traveler:hover {
    transform: none;
  }
}
</style>